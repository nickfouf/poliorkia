import * as serialize from "./serialization/serialize";
/**
 * A helper class representing a Vec2. Most games are going
 * to be using the Vector class provided by their game framework,
 * so this is mostly for internal use + demos.
 */
export class Vec2 {
    constructor(x = 0, y = 0) {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.x = x;
        this.y = y;
    }
    multiplyScalar(scalar) {
        return new Vec2(this.x * scalar, this.y * scalar);
    }
    add(other) {
        return new Vec2(this.x + other.x, this.y + other.y);
    }
    subtract(other) {
        return new Vec2(this.x - other.x, this.y - other.y);
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        const length = this.length();
        if (length === 0) {
            return new Vec2(0, 0);
        }
        else {
            return new Vec2(this.x / length, this.y / length);
        }
    }
}
// Register Vec2 class with serializer.
serialize.registerCustomType(Vec2, "netplayjs.Vec2", (data) => {
    return [data.x, data.y];
}, (data) => {
    return new Vec2(data[0], data[1]);
});
//# sourceMappingURL=vec2.js.map