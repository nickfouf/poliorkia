import * as s from "./serialize";
export function serialize(data) {
    const result = {};
    for (let key of Object.keys(data)) {
        result[key] = s.serialize(data[key]);
    }
    return result;
}
export function deserialize(source, dest) {
    for (const [key, value] of Object.entries(source)) {
        dest[key] = s.deserialize(source[key]);
    }
}
//# sourceMappingURL=autoserialize.js.map