export declare abstract class TouchControl {
    abstract show(): void;
    abstract getValue(): any;
}
export declare class VirtualJoystick extends TouchControl {
    base: HTMLDivElement;
    nub: HTMLDivElement;
    constructor();
    show(): void;
    value: {
        x: number;
        y: number;
    };
    updateTouch(touch?: Touch): void;
    getValue(): {
        x: number;
        y: number;
    };
}
