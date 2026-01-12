import { FirebaseMatchmaker, FirebasePeerConnection } from "../matchmaking/firebase-client";
import { TypedEvent } from "@vramesh/netplayjs-common/typedevent";
export declare class GameMenu {
    root: HTMLDivElement;
    matchmaker: FirebaseMatchmaker;
    onClientStart: TypedEvent<FirebasePeerConnection>;
    onHostStart: TypedEvent<FirebasePeerConnection>;
    state: {
        view: "home" | "hosting" | "joining" | "matchmaking" | "error";
        roomId?: string;
        errorMsg?: string;
    };
    constructor();
    setupStyles(): void;
    createPrivate(): Promise<void>;
    joinPrivate(id: string): Promise<void>;
    startPublic(): void;
    reset(): void;
    render(): void;
}
