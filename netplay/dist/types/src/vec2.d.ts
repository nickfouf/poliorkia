/**
 * A helper class representing a Vec2. Most games are going
 * to be using the Vector class provided by their game framework,
 * so this is mostly for internal use + demos.
 */
export declare class Vec2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    multiplyScalar(scalar: number): Vec2;
    add(other: Vec2): Vec2;
    subtract(other: Vec2): Vec2;
    length(): number;
    normalize(): Vec2;
}
