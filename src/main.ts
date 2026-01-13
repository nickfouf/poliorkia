import { RollbackWrapper } from "netplayjs";
import { AIWrapper } from "./ai/ai-wrapper";
import { PasseTrappeGame } from "./game";
import { AssetManager } from "./asset-manager";
import { GameMenu } from "../netplay/src/ui/gamemenu";

const loaderHTML = `
<div id="app-loader">
    <div class="loader-card">
        <img src="assets/poliorkia.png" class="loader-logo" alt="Logo" />
        <div class="loader-status">Loading Assets</div>
        <div class="loader-details" id="loader-bytes">Initializing...</div>
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

AssetManager.getInstance().preloadAll((loaded, total) => {
    const pct = total > 0 ? (loaded / total) * 100 : 0;
    const mbLoaded = (loaded / (1024 * 1024)).toFixed(2);
    const mbTotal = (total / (1024 * 1024)).toFixed(2);

    barEl.style.width = `${pct}%`;
    bytesEl.innerText = `${mbLoaded} MB / ${mbTotal} MB`;

}).then(() => {
    bytesEl.innerText = "Ready!";
    barEl.style.width = "100%";
    
    setTimeout(() => {
        loaderEl.style.opacity = "0";
        setTimeout(() => {
            loaderEl.remove();
            
            const menu = new GameMenu();

            menu.onAIStart.once(() => {
                // ENABLE FAST ANIMATIONS FOR AI
                PasseTrappeGame.useFastAnimations = true;
                new AIWrapper(PasseTrappeGame).startAI();
            });

            menu.onHostStart.once((conn) => {
                // NORMAL SPEED FOR NETPLAY
                PasseTrappeGame.useFastAnimations = false;
                const wrapper = new RollbackWrapper(PasseTrappeGame);
                wrapper.startHost([/*players managed inside*/] as any, conn);
            });

            menu.onClientStart.once((conn) => {
                // NORMAL SPEED FOR NETPLAY
                PasseTrappeGame.useFastAnimations = false;
                const wrapper = new RollbackWrapper(PasseTrappeGame);
                wrapper.startClient([/*players managed inside*/] as any, conn);
            });
            
        }, 600); 
    }, 200); 

}).catch((err) => {
    bytesEl.innerText = "Error Loading Assets";
    bytesEl.style.color = "#d63031";
    console.error("Asset Loading Failed:", err);
});

