import { DefaultInputReader } from "../defaultinput";
import { NetplayPlayer } from "../netcode/types";
import { GameClass } from "../game";
import * as lit from "lit-html";
import EWMASD from "../ewmasd";
import { FirebasePeerConnection } from "../matchmaking/firebase-client";
export declare abstract class GameWrapper {
    gameClass: GameClass;
    /** The canvas that the game will be rendered onto. */
    canvas: HTMLCanvasElement;
    /** The network stats UI. */
    stats: HTMLDivElement;
    inputReader: DefaultInputReader;
    isChannelOrdered(channel: RTCDataChannel): boolean;
    isChannelReliable(channel: RTCDataChannel): boolean;
    checkChannel(channel: RTCDataChannel): void;
    playerPausedIndicator: HTMLDivElement;
    constructor(gameClass: GameClass);
    /**
     * Calculate a scaling for our canvas so that it fits the whole screen.
     * Center the canvas with an offset.
     */
    calculateLayout(container: {
        width: number;
        height: number;
    }, canvas: {
        width: number;
        height: number;
    }): {
        width: number;
        height: number;
        left: number;
        top: number;
    };
    /**
     * Recalculate canvas scaling / offset.
     */
    resize(): void;
    start(): Promise<void>;
    startVisibilityWatcher(conn: FirebasePeerConnection): void;
    pingMeasure: EWMASD;
    startPing(conn: FirebasePeerConnection): void;
    renderRTCStats(stats: RTCStatsReport): lit.TemplateResult;
    rtcStats?: lit.TemplateResult;
    watchRTCStats(connection: RTCPeerConnection): Promise<void>;
    abstract startHost(players: Array<NetplayPlayer>, conn: FirebasePeerConnection): any;
    abstract startClient(players: Array<NetplayPlayer>, conn: FirebasePeerConnection): any;
}
