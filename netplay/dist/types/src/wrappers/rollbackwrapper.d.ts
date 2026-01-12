import { DefaultInput } from "../defaultinput";
import { NetplayPlayer } from "../netcode/types";
import { GameWrapper } from "./gamewrapper";
import { Game, GameClass } from "../game";
import { RollbackNetcode } from "../netcode/rollback";
import { FirebasePeerConnection } from "../matchmaking/firebase-client";
export declare class RollbackWrapper extends GameWrapper {
    game?: Game;
    rollbackNetcode?: RollbackNetcode<Game, DefaultInput>;
    constructor(gameClass: GameClass);
    getInitialInputs(players: Array<NetplayPlayer>): Map<NetplayPlayer, DefaultInput>;
    startHost(players: Array<NetplayPlayer>, conn: FirebasePeerConnection): void;
    startClient(players: Array<NetplayPlayer>, conn: FirebasePeerConnection): void;
    startGameLoop(): void;
}
