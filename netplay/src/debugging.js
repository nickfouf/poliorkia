import * as log from "loglevel";
export const DEV = process.env.NODE_ENV === "development";
if (DEV) {
    log.enableAll();
}
//# sourceMappingURL=debugging.js.map