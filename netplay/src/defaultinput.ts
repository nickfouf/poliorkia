import { NetplayInput } from "./netcode/types";
import * as utils from "./utils";
import { TouchControl } from "./touchcontrols";
import { Vec2 } from "./vec2";

type GamepadButton = {
  pressed: boolean;
  released: boolean;
  held: boolean;
};

export class DefaultInput extends NetplayInput {
  keysPressed: { [key: string]: boolean } = {};
  keysHeld: { [key: string]: boolean } = {};
  keysReleased: { [key: string]: boolean } = {};

  // --- NEW: World Coordinates (The Fix) ---
  // We send the projected world position directly to ensure
  // 100% determinism regardless of screen aspect ratio.
  targetX?: number;
  targetY?: number;

  mouseButtons: Set<number> = new Set();
  mousePosition?: { x: number; y: number };
  touches: Array<{ x: number; y: number }> = [];

  gamepads: Array<{
    axes: Array<number>;
    buttons: Array<GamepadButton>;
  }> = [];

  touchControls?: { [name: string]: any };

  arrowKeys(): Vec2 {
    return new Vec2(
      (this.keysHeld.ArrowLeft ? -1 : 0) + (this.keysHeld.ArrowRight ? 1 : 0),
      (this.keysHeld.ArrowDown ? -1 : 0) + (this.keysHeld.ArrowUp ? 1 : 0)
    );
  }

  wasd(): Vec2 {
    return new Vec2(
      (this.keysHeld.a ? -1 : 0) + (this.keysHeld.d ? 1 : 0),
      (this.keysHeld.s ? -1 : 0) + (this.keysHeld.w ? 1 : 0)
    );
  }
}

export class DefaultInputReader {
  canvas: HTMLCanvasElement;
  canvasSize: { width: number; height: number };

  keysPressed: { [key: string]: boolean } = {};
  keysHeld: { [key: string]: boolean } = {};
  keysReleased: { [key: string]: boolean } = {};

  mouseButtonsHeld: Set<number> = new Set();

  mousePosition: { x: number; y: number } | null = null;
  touches: Array<{ x: number; y: number }> = [];
  
  lastTouchTime: number = 0;

  touchControls: { [name: string]: TouchControl };

  previousGamepadState: Map<number, { buttons: Array<boolean> }> = new Map();

  private boundKeyDown: (e: KeyboardEvent) => void;
  private boundKeyUp: (e: KeyboardEvent) => void;
  private boundMouseEnter: (e: MouseEvent) => void;
  private boundMouseMove: (e: MouseEvent) => void;
  private boundMouseLeave: (e: MouseEvent) => void;
  private boundMouseDown: (e: MouseEvent) => void;
  private boundMouseUp: (e: MouseEvent) => void;
  private boundContextMenu: (e: MouseEvent) => void;
  private boundTouchStart: (e: TouchEvent) => void;
  private boundTouchMove: (e: TouchEvent) => void;
  private boundTouchEnd: (e: TouchEvent) => void;

  getCanvasScale(): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return { x: 1, y: 1 };
    return {
      x: this.canvasSize.width / rect.width,
      y: this.canvasSize.height / rect.height,
    };
  }

  projectClientPosition(clientX: number, clientY: number): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    const scale = this.getCanvasScale();
    return {
      x: (clientX - rect.left) * scale.x,
      y: (clientY - rect.top) * scale.y,
    };
  }

  constructor(
    root: HTMLElement = document.body,
    canvas: HTMLCanvasElement,
    canvasSize: { width: number; height: number },
    pointerLock: boolean = false,
    preventContextMenu: boolean = false,
    touchControls: { [name: string]: TouchControl } = {}
  ) {
    this.canvas = canvas;
    this.canvasSize = canvasSize;
    this.touchControls = touchControls;

    this.boundKeyDown = (event) => {
        if (event.repeat) return;
        this.keysHeld[event.key] = true;
        this.keysPressed[event.key] = true;
    };
    this.boundKeyUp = (event) => {
        this.keysHeld[event.key] = false;
        this.keysReleased[event.key] = true;
    };

    this.boundMouseEnter = (e) => this.updateMousePosition(e);
    
    this.boundMouseMove = (e) => {
      // Ignore mouse if touch is active
      if (Date.now() - this.lastTouchTime < 1000) return; 
      this.updateMousePosition(e);
    };
    
    this.boundMouseLeave = (e) => { this.mousePosition = null; };
    
    this.boundMouseDown = (event) => {
      if (Date.now() - this.lastTouchTime < 1000) return;
      this.mouseButtonsHeld.add(event.button);
      if (pointerLock) canvas.requestPointerLock();
    };
    
    this.boundMouseUp = (event) => {
      this.mouseButtonsHeld.delete(event.button);
    };
    this.boundContextMenu = (e) => {
      if (preventContextMenu) e.preventDefault();
    };

    const handleTouch = (e: TouchEvent) => {
        this.lastTouchTime = Date.now();
        if (e.cancelable) e.preventDefault();
        this.updateTouches(e);
    };

    this.boundTouchStart = handleTouch;
    this.boundTouchMove = handleTouch;
    this.boundTouchEnd = handleTouch;

    root.addEventListener("keydown", this.boundKeyDown, false);
    root.addEventListener("keyup", this.boundKeyUp, false);

    canvas.addEventListener("mouseenter", this.boundMouseEnter, false);
    canvas.addEventListener("mousemove", this.boundMouseMove, false);
    canvas.addEventListener("mouseleave", this.boundMouseLeave, false);
    canvas.addEventListener("mousedown", this.boundMouseDown);
    window.addEventListener("mouseup", this.boundMouseUp);
    canvas.addEventListener("contextmenu", this.boundContextMenu);

    canvas.addEventListener("touchstart", this.boundTouchStart, { passive: false });
    canvas.addEventListener("touchmove", this.boundTouchMove, { passive: false });
    canvas.addEventListener("touchend", this.boundTouchEnd, { passive: false });
  }

  destroy() {
    const root = document.body; 
    root.removeEventListener("keydown", this.boundKeyDown, false);
    root.removeEventListener("keyup", this.boundKeyUp, false);

    this.canvas.removeEventListener("mouseenter", this.boundMouseEnter, false);
    this.canvas.removeEventListener("mousemove", this.boundMouseMove, false);
    this.canvas.removeEventListener("mouseleave", this.boundMouseLeave, false);
    this.canvas.removeEventListener("mousedown", this.boundMouseDown);
    window.removeEventListener("mouseup", this.boundMouseUp);
    this.canvas.removeEventListener("contextmenu", this.boundContextMenu);

    this.canvas.removeEventListener("touchstart", this.boundTouchStart);
    this.canvas.removeEventListener("touchmove", this.boundTouchMove);
    this.canvas.removeEventListener("touchend", this.boundTouchEnd);
  }

  updateMousePosition(event: MouseEvent) {
    if (document.pointerLockElement === this.canvas) {
      if (!this.mousePosition) {
        this.mousePosition = this.projectClientPosition(event.clientX, event.clientY);
      } else {
        const scale = this.getCanvasScale();
        this.mousePosition.x += event.movementX * scale.x;
        this.mousePosition.y += event.movementY * scale.y;
      }
    } else {
      this.mousePosition = this.projectClientPosition(event.clientX, event.clientY);
    }
  }

  updateTouches(event: TouchEvent) {
    this.touches.length = event.targetTouches.length;
    for (let i = 0; i < event.targetTouches.length; ++i) {
      const projected = this.projectClientPosition(
        event.targetTouches[i].clientX,
        event.targetTouches[i].clientY
      );
      this.touches[i] = projected;
    }
  }

  getInput(): DefaultInput {
    let input = new DefaultInput();

    for (let key in this.keysPressed) {
      if (this.keysPressed[key]) {
        input.keysPressed[key] = true;
        input.keysHeld[key] = true;
      }
    }
    for (let key in this.keysHeld) {
      if (this.keysHeld[key]) input.keysHeld[key] = true;
    }
    for (let key in this.keysReleased) {
      if (this.keysReleased[key]) input.keysReleased[key] = true;
    }

    const hasTouches = this.touches.length > 0;
    const recentTouch = Date.now() - this.lastTouchTime < 1000;
    
    input.touches = utils.clone(this.touches);

    if (hasTouches || recentTouch) {
        input.mousePosition = undefined;
        input.mouseButtons = new Set();
        // Emulate Mouse Button 0 for touch to ensure compatibility
        if (hasTouches) {
            input.mouseButtons.add(0);
        }
    } else {
        if (this.mousePosition)
            input.mousePosition = utils.clone(this.mousePosition);
        input.mouseButtons = new Set(this.mouseButtonsHeld);
    }

    for (let [name, control] of Object.entries(this.touchControls)) {
      input.touchControls = input.touchControls || {};
      input.touchControls[name] = utils.clone(control.getValue());
    }

    return input;
  }
}



