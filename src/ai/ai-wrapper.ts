import { DefaultInput, GameWrapper, NetplayPlayer, GameClass, FirebasePeerConnection } from "netplayjs";
import { AIController } from "./ai-controller";
import { PasseTrappeGame } from "../game";
import { html, render } from "lit-html";
import strings from "/netplay/src/strings.json";
// FIXED PATH: src/teams.json
import rawTeamsList from "../teams.json";

// NEW: Create sorted reference for consistency with GameMenu UI
const sortedTeamsList = [...rawTeamsList].sort((a, b) => a.name.localeCompare(b.name));

export class AIWrapper extends GameWrapper {
    game?: PasseTrappeGame;
    aiController?: AIController;
    
    players: Array<NetplayPlayer> = [];

    constructor(gameClass: GameClass) {
        super(gameClass);
    }

    startHost(players: Array<NetplayPlayer>, conn: FirebasePeerConnection) {}
    startClient(players: Array<NetplayPlayer>, conn: FirebasePeerConnection) {}

    startAI(difficultyPercentage: number) {
        this.canvas.style.display = "block";
        
        // Fetch local name
        const localName = localStorage.getItem("poliorkia_username") || strings.game.default_player_name;
        // Fetch local team index
        const teamIdxStr = localStorage.getItem("poliorkia_team_index");
        
        let localTeam = null;
        if (teamIdxStr) {
            const index = parseInt(teamIdxStr, 10);
            // Handle offset: 0 = None, >0 = team[index-1]
            if (index > 0) {
                const realIndex = index - 1;
                // Use sorted list to retrieve correct team
                if (realIndex >= 0 && realIndex < sortedTeamsList.length) {
                    localTeam = sortedTeamsList[realIndex];
                }
            }
        }

        this.players = [
            new NetplayPlayer(0, true, true),  
            new NetplayPlayer(1, true, false)  
        ];

        this.game = new this.gameClass(this.canvas, this.players) as PasseTrappeGame;
        
        // Set Profiles (P0 = Local, P1 = CPU)
        // Updated: Manually set CPU team to MINIMA AI
        this.game.setPlayerProfiles(
            { name: localName, team: localTeam },
            { name: strings.game.cpu_name, team: { name: "MINIMA AI", icon: "bot_icon.png" } }
        );

        const difficultyRatio = difficultyPercentage / 100.0;
        this.aiController = new AIController(this.game, difficultyRatio);

        this.startGameLoop();
        this.resize();
    }

    startGameLoop() {
        this.stats.style.display = "block";
        
        let lastTimestamp = performance.now();
        let accumulator = 0;

        const animate = (timestamp) => {
            let dtMs = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            // Safety clamp: prevent spiral of death if tab was backgrounded for too long
            if (dtMs > 250) dtMs = 250;

            accumulator += dtMs;
            
            // Consume accumulator in fixed timesteps
            while (accumulator >= this.gameClass.timestep) {
                accumulator -= this.gameClass.timestep;

                const humanInput = this.inputReader.getInput();
                // --- FIX: ENRICH INPUT LOCALLY FOR HUMAN ---
                this.game!.enrichInput(humanInput);

                // Pass the FIXED timestep to the AI controller, not the variable render delta
                const fixedDtSec = this.gameClass.timestep / 1000;
                const aiInput = this.aiController!.generateInput(fixedDtSec);

                const inputs = new Map<NetplayPlayer, DefaultInput>();
                inputs.set(this.players[0], humanInput);
                inputs.set(this.players[1], aiInput);

                this.game!.tick(inputs);
            }
            
            // Draw every frame (interpolation could be added here if needed)
            this.game!.draw();
            
            const statsHTML = html`
                <div style="font-weight: bold; color: #a55eea; font-family: 'Nunito', sans-serif;">MODE: VS AI</div>
            `;
            render(statsHTML, this.stats);

            // SAVE ID
            this.animationFrameId = requestAnimationFrame(animate);
        };
        // SAVE ID
        this.animationFrameId = requestAnimationFrame(animate);
    }
}



