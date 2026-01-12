export function get(map, key) {
    let result = map.get(key);
    if (result !== undefined) {
        return result;
    }
    throw new Error(`Key ${String(key)} not in Map ${map.toString()}`);
}
export function clone(object) {
    return JSON.parse(JSON.stringify(object));
}
export function shift(array) {
    let result = array.shift();
    if (result !== undefined) {
        return result;
    }
    throw new Error(`Shift returned undefined from Array ${array.toString()}`);
}
export function createElementFromHTML(source) {
    const container = document.createElement("div");
    container.innerHTML = source;
    return container.firstChild;
}
//# sourceMappingURL=utils.js.map