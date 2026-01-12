import { DefaultInput } from "../defaultinput";
import { LockstepNetcode } from "../netcode/lockstep";
import { NetplayPlayer } from "../netcode/types";
import { GameWrapper } from "./gamewrapper";
import { Game, GameClass } from "../game";
import { FirebasePeerConnection } from "../matchmaking/firebase-client";
export declare class LockstepWrapper extends GameWrapper {
    game?: Game;
    lockstepNetcode?: LockstepNetcode<Game, DefaultInput>;
    constructor(gameClass: GameClass);
    getStateSyncPeriod(): number;
    startHost(players: Array<NetplayPlayer>, conn: FirebasePeerConnection): void;
    startClient(players: Array<NetplayPlayer>, conn: FirebasePeerConnection): void;
    startGameLoop(): void;
}
