import { NetplayInput } from "./netcode/types";
import { TouchControl } from "./touchcontrols";
import { Vec2 } from "./vec2";
type GamepadButton = {
    /** Was this Gamepad button pressed on this frame? */
    pressed: boolean;
    /** Was this Gamepad button released on this frame? */
    released: boolean;
    /** Is this Gamepad button currently held down? */
    held: boolean;
};
export declare class DefaultInput extends NetplayInput {
    keysPressed: {
        [key: string]: boolean;
    };
    keysHeld: {
        [key: string]: boolean;
    };
    keysReleased: {
        [key: string]: boolean;
    };
    mouseButtons: Set<number>;
    mousePosition?: {
        x: number;
        y: number;
    };
    touches: Array<{
        x: number;
        y: number;
    }>;
    gamepads: Array<{
        axes: Array<number>;
        buttons: Array<GamepadButton>;
    }>;
    touchControls?: {
        [name: string]: any;
    };
    /** Helper function to return arrow keys as a Vec2. */
    arrowKeys(): Vec2;
    /** Helper function to return WASD keys as a Vec2. */
    wasd(): Vec2;
}
export declare class DefaultInputReader {
    canvas: HTMLCanvasElement;
    canvasSize: {
        width: number;
        height: number;
    };
    keysPressed: {
        [key: string]: boolean;
    };
    keysHeld: {
        [key: string]: boolean;
    };
    keysReleased: {
        [key: string]: boolean;
    };
    mouseButtonsHeld: Set<number>;
    mousePosition: {
        x: number;
        y: number;
    } | null;
    mouseDelta: {
        x: number;
        y: number;
    } | null;
    touches: Array<{
        x: number;
        y: number;
    }>;
    touchControls: {
        [name: string]: TouchControl;
    };
    /**
     * We need to track the previous state of GamePads
     * so that we can determine the frame that the button
     * was pressed or released.
     */
    previousGamepadState: Map<number, {
        /** Whether or not the button was held on the previous frame. */
        buttons: Array<boolean>;
    }>;
    getCanvasScale(): {
        x: number;
        y: number;
    };
    projectClientPosition(clientX: number, clientY: number): {
        x: number;
        y: number;
    };
    constructor(root: HTMLElement | undefined, canvas: HTMLCanvasElement, canvasSize: {
        width: number;
        height: number;
    }, pointerLock?: boolean, preventContextMenu?: boolean, touchControls?: {
        [name: string]: TouchControl;
    });
    updateMousePosition(event: MouseEvent): void;
    updateTouches(event: TouchEvent): void;
    getInput(): DefaultInput;
}
export {};
