import { DefaultInput, GameWrapper, NetplayPlayer, GameClass, FirebasePeerConnection } from "netplayjs";
import { AIController } from "./ai-controller";
import { PasseTrappeGame } from "../game";
import { html, render } from "lit-html";

export class AIWrapper extends GameWrapper {
    game?: PasseTrappeGame;
    aiController?: AIController;
    
    // Fix: Store players here since Game instance doesn't expose them
    players: Array<NetplayPlayer> = [];

    constructor(gameClass: GameClass) {
        super(gameClass);
    }

    // Required abstract methods (unused in AI mode)
    startHost(players: Array<NetplayPlayer>, conn: FirebasePeerConnection) {}
    startClient(players: Array<NetplayPlayer>, conn: FirebasePeerConnection) {}

    // Custom start method for AI
    startAI() {
        this.canvas.style.display = "block";
        
        // Define Players: P0 (Human), P1 (AI)
        this.players = [
            new NetplayPlayer(0, true, true),  
            new NetplayPlayer(1, true, false)  
        ];

        this.game = new this.gameClass(this.canvas, this.players) as PasseTrappeGame;
        this.aiController = new AIController(this.game);

        this.startGameLoop();
        this.resize();
    }

    startGameLoop() {
        this.stats.style.display = "block";
        
        let lastTimestamp = performance.now();

        const animate = (timestamp) => {
            const dtMs = timestamp - lastTimestamp;
            
            if (dtMs >= this.gameClass.timestep) {
                lastTimestamp = timestamp;

                // 1. Get Human Input
                const humanInput = this.inputReader.getInput();

                // 2. Generate AI Input (dt in seconds)
                const aiInput = this.aiController!.generateInput(dtMs / 1000);

                // 3. Map inputs using the local 'this.players' array
                const inputs = new Map<NetplayPlayer, DefaultInput>();
                inputs.set(this.players[0], humanInput);
                inputs.set(this.players[1], aiInput);

                // 4. Tick Game
                this.game!.tick(inputs);

                // 5. Draw
                this.game!.draw();
                
                // 6. Update Label
                const statsHTML = html`
                    <div style="font-weight: bold; color: #a55eea; font-family: 'Nunito', sans-serif;">MODE: VS AI</div>
                `;
                render(statsHTML, this.stats);
            }

            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }
}