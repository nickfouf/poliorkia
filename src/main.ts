import { RollbackWrapper, NetplayPlayer } from "netplayjs"; 
import { AIWrapper } from "./ai/ai-wrapper";
import { PasseTrappeGame } from "./game";
import { AssetManager } from "./asset-manager";
import { GameMenu } from "../netplay/src/ui/gamemenu";
import strings from "../netplay/src/strings.json";

const loaderHTML = `
<div id="app-loader">
    <div class="loader-card">
        <div class="loader-status">${strings.loader.status_loading}</div>
        <div class="loader-details" id="loader-bytes">${strings.loader.status_init}</div>
        <div class="progress-track">
            <div class="progress-fill" id="loader-bar"></div>
        </div>
    </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', loaderHTML);

const loaderEl = document.getElementById('app-loader')!;
const barEl = document.getElementById('loader-bar')!;
const bytesEl = document.getElementById('loader-bytes')!;

function initializeGameFlow() {
    const menu = new GameMenu();

    menu.onAIStart.once((difficulty) => {
        PasseTrappeGame.useFastAnimations = true;
        const wrapper = new AIWrapper(PasseTrappeGame);
        
        wrapper.onReturnToMenu = () => {
             initializeGameFlow(); 
        };

        wrapper.startAI(difficulty);
    });

    menu.onHostStart.once((data) => {
        console.log("[DEBUG] Main.ts: Host Start Event", data);
        PasseTrappeGame.useFastAnimations = false;
        const wrapper = new RollbackWrapper(PasseTrappeGame);
        wrapper.localPlayerName = menu.userName;
        wrapper.localTeamIndex = menu.userTeamIndex;
        
        wrapper.opponentName = data.opponentName;
        wrapper.opponentTeamIndex = data.opponentTeamIndex;
        wrapper.gameDuration = data.duration;
        
        wrapper.canvas.style.display = "block";

        const players = [new NetplayPlayer(0, true, true), new NetplayPlayer(1, false, false)];

        wrapper.startVisibilityWatcher(data.conn);
        
        wrapper.onReturnToMenu = () => {
             initializeGameFlow(); 
        };

        wrapper.startHost(players, data.conn, data.opponentName, data.visuals);
        wrapper.resize();
    });

    menu.onClientStart.once((data) => {
        console.log("[DEBUG] Main.ts: Client Start Event", data);
        PasseTrappeGame.useFastAnimations = false;
        const wrapper = new RollbackWrapper(PasseTrappeGame);
        wrapper.localPlayerName = menu.userName;
        wrapper.localTeamIndex = menu.userTeamIndex;

        wrapper.opponentName = data.opponentName;
        wrapper.opponentTeamIndex = data.opponentTeamIndex;
        wrapper.gameDuration = data.duration;

        wrapper.canvas.style.display = "block";

        const players = [new NetplayPlayer(0, false, true), new NetplayPlayer(1, true, false)];

        wrapper.startVisibilityWatcher(data.conn);

        wrapper.onReturnToMenu = () => {
             initializeGameFlow();
        };

        wrapper.startClient(players, data.conn, data.opponentName, data.visuals);
        wrapper.resize();
    });
}

AssetManager.getInstance().preloadAll((loaded, total) => {
    const pct = total > 0 ? (loaded / total) * 100 : 0;
    const mbLoaded = (loaded / (1024 * 1024)).toFixed(2);
    const mbTotal = (total / (1024 * 1024)).toFixed(2);

    barEl.style.width = `${pct}%`;
    bytesEl.innerText = `${mbLoaded} MB / ${mbTotal} MB`;

}).then(() => {
    bytesEl.innerText = strings.loader.status_ready;
    barEl.style.width = "100%";
    
    setTimeout(() => {
        loaderEl.style.opacity = "0";
        setTimeout(() => {
            loaderEl.remove();
            
            initializeGameFlow();
            
        }, 600); 
    }, 200); 

}).catch((err) => {
    bytesEl.innerText = strings.loader.status_error;
    bytesEl.style.color = "#d63031";
    console.error("Asset Loading Failed:", err);
});

