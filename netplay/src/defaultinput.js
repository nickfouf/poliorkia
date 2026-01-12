import { NetplayInput } from "./netcode/types";
import * as utils from "./utils";
import { Vec2 } from "./vec2";
export class DefaultInput extends NetplayInput {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "keysPressed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "keysHeld", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "keysReleased", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        // --- NEW: Track held mouse buttons (0 = Left, 1 = Middle, 2 = Right) ---
        Object.defineProperty(this, "mouseButtons", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Set()
        });
        Object.defineProperty(this, "mousePosition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "touches", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "gamepads", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "touchControls", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    /** Helper function to return arrow keys as a Vec2. */
    arrowKeys() {
        return new Vec2((this.keysHeld.ArrowLeft ? -1 : 0) + (this.keysHeld.ArrowRight ? 1 : 0), (this.keysHeld.ArrowDown ? -1 : 0) + (this.keysHeld.ArrowUp ? 1 : 0));
    }
    /** Helper function to return WASD keys as a Vec2. */
    wasd() {
        return new Vec2((this.keysHeld.a ? -1 : 0) + (this.keysHeld.d ? 1 : 0), (this.keysHeld.s ? -1 : 0) + (this.keysHeld.w ? 1 : 0));
    }
}
export class DefaultInputReader {
    getCanvasScale() {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: this.canvasSize.width / rect.width,
            y: this.canvasSize.height / rect.height,
        };
    }
    projectClientPosition(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        const scale = this.getCanvasScale();
        return {
            x: (clientX - rect.left) * scale.x,
            y: (clientY - rect.top) * scale.y,
        };
    }
    constructor(root = document.body, canvas, canvasSize, pointerLock = false, preventContextMenu = false, touchControls = {}) {
        Object.defineProperty(this, "canvas", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "canvasSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "keysPressed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "keysHeld", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "keysReleased", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        // --- NEW: Track local mouse button state ---
        Object.defineProperty(this, "mouseButtonsHeld", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Set()
        });
        Object.defineProperty(this, "mousePosition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "mouseDelta", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "touches", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "touchControls", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * We need to track the previous state of GamePads
         * so that we can determine the frame that the button
         * was pressed or released.
         */
        Object.defineProperty(this, "previousGamepadState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        this.canvas = canvas;
        this.canvasSize = canvasSize;
        this.touchControls = touchControls;
        root.addEventListener("keydown", (event) => {
            if (event.repeat)
                return;
            this.keysHeld[event.key] = true;
            this.keysPressed[event.key] = true;
        }, false);
        root.addEventListener("keyup", (event) => {
            this.keysHeld[event.key] = false;
            this.keysReleased[event.key] = true;
        }, false);
        canvas.addEventListener("mouseenter", (e) => this.updateMousePosition(e), false);
        canvas.addEventListener("mousemove", (e) => this.updateMousePosition(e), false);
        canvas.addEventListener("mouseleave", (e) => {
            this.mousePosition = null;
        }, false);
        canvas.addEventListener("touchstart", (e) => this.updateTouches(e), false);
        canvas.addEventListener("touchmove", (e) => this.updateTouches(e), false);
        canvas.addEventListener("touchend", (e) => this.updateTouches(e), false);
        // --- UPDATED: Track Mouse Buttons ---
        // We listen for mousedown on the canvas (start click)
        canvas.addEventListener("mousedown", (event) => {
            this.mouseButtonsHeld.add(event.button);
            if (pointerLock) {
                canvas.requestPointerLock();
            }
        });
        // We listen for mouseup on the window (end click anywhere)
        // This handles dragging the mouse outside the canvas and releasing it.
        window.addEventListener("mouseup", (event) => {
            this.mouseButtonsHeld.delete(event.button);
        });
        canvas.addEventListener("contextmenu", (e) => {
            if (preventContextMenu)
                e.preventDefault();
        });
    }
    updateMousePosition(event) {
        if (document.pointerLockElement === this.canvas) {
            if (!this.mousePosition) {
                // If we are pointer locked, the first position is projected onto the canvas.
                this.mousePosition = this.projectClientPosition(event.clientX, event.clientY);
            }
            else {
                // Subsequent positions are delta based off of our relative movement.
                const scale = this.getCanvasScale();
                this.mousePosition.x += event.movementX * scale.x;
                this.mousePosition.y += event.movementY * scale.y;
            }
        }
        else {
            // If we aren't pointer locked, just project the position onto the canvas.
            this.mousePosition = this.projectClientPosition(event.clientX, event.clientY);
        }
    }
    updateTouches(event) {
        this.touches.length = event.targetTouches.length;
        for (let i = 0; i < event.targetTouches.length; ++i) {
            this.touches[i] = this.projectClientPosition(event.targetTouches[i].clientX, event.targetTouches[i].clientY);
        }
    }
    getInput() {
        let input = new DefaultInput();
        for (let key in this.keysPressed) {
            if (this.keysPressed[key]) {
                input.keysPressed[key] = true;
                // A pressed key is also a held key.
                // This helps with the edge case where a
                // key is pressed and released between the frames.
                input.keysHeld[key] = true;
            }
        }
        for (let key in this.keysHeld) {
            if (this.keysHeld[key])
                input.keysHeld[key] = true;
        }
        for (let key in this.keysReleased) {
            if (this.keysReleased[key])
                input.keysReleased[key] = true;
        }
        if (this.mousePosition)
            input.mousePosition = utils.clone(this.mousePosition);
        input.touches = utils.clone(this.touches);
        // --- NEW: Copy mouse buttons to input object ---
        input.mouseButtons = new Set(this.mouseButtonsHeld);
        for (let [name, control] of Object.entries(this.touchControls)) {
            input.touchControls = input.touchControls || {};
            input.touchControls[name] = utils.clone(control.getValue());
        }
        // Processing GamePad inputs.
        if (navigator.getGamepads) {
            navigator.getGamepads().forEach((gamepad, gi) => {
                // Ignore null gamepads.
                if (!gamepad)
                    return null;
                // Get the previous state of this GamePad so that we can determine
                // pressed and released states.
                const previousState = this.previousGamepadState.get(gi) || {
                    buttons: gamepad.buttons.map(() => false),
                };
                const buttons = gamepad.buttons.map((button, bi) => {
                    const held = button.pressed;
                    const pressed = !previousState.buttons[bi] && held;
                    const released = previousState.buttons[bi] && !held;
                    return {
                        held,
                        pressed,
                        released,
                    };
                });
                input.gamepads.push({
                    axes: utils.clone(gamepad.axes),
                    buttons: buttons,
                });
                // Update the previous state of this GamePad.
                this.previousGamepadState.set(gi, {
                    buttons: gamepad.buttons.map((button) => button.pressed),
                });
            });
        }
        // Clear the pressed and released keys.
        this.keysPressed = {};
        this.keysReleased = {};
        return input;
    }
}
//# sourceMappingURL=defaultinput.js.map