export class ConnectionStats {
    constructor(windowDuration = 5 * 1000) {
        /** The duration of that stats window in milliseconds. */
        Object.defineProperty(this, "windowDuration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** The window of most recently sent packets. */
        Object.defineProperty(this, "window", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.windowDuration = windowDuration;
    }
    updateWindow() {
        const windowStart = performance.now() - this.windowDuration;
        while (this.window.length > 0) {
            if (this.window[0].timestamp < windowStart)
                this.window.shift();
            else
                break;
        }
    }
    onMessage(byteLength) {
        this.window.push({
            timestamp: performance.now(),
            bytes: byteLength,
        });
        this.updateWindow();
    }
    getPacketsPerSecond() {
        this.updateWindow();
        return (1000 * this.window.length) / this.windowDuration;
    }
    getAveragePacketSize() {
        this.updateWindow();
        const bytes = this.window.reduce((a, b) => a + b.bytes, 0);
        return bytes / this.window.length;
    }
    getBytesPerSecond() {
        this.updateWindow();
        const bytes = this.window.reduce((a, b) => a + b.bytes, 0);
        return (1000 * bytes) / this.windowDuration;
    }
    formatStats() {
        return `${this.getPacketsPerSecond().toFixed(2)} msgs/sec, ${this.getAveragePacketSize().toFixed(2)} bytes/msg, ${this.getBytesPerSecond()} bytes/sec`;
    }
}
//# sourceMappingURL=stats.js.map