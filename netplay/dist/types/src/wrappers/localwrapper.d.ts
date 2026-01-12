import { DefaultInputReader } from "../defaultinput";
import { NetplayPlayer } from "../netcode/types";
import { Game, GameClass } from "../game";
type GameInstance = {
    canvas: HTMLCanvasElement;
    game: Game;
    inputReader: DefaultInputReader;
    players: Array<NetplayPlayer>;
};
export declare class LocalWrapper {
    gameClass: GameClass;
    instances: Array<GameInstance>;
    getPlayers(instanceID: number, numPlayers: number): Array<NetplayPlayer>;
    constructor(gameClass: GameClass);
    start(): void;
}
export {};
