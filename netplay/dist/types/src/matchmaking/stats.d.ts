export declare class ConnectionStats {
    /** The duration of that stats window in milliseconds. */
    windowDuration: number;
    /** The window of most recently sent packets. */
    window: Array<{
        timestamp: number;
        bytes: number;
    }>;
    constructor(windowDuration?: number);
    updateWindow(): void;
    onMessage(byteLength: number): void;
    getPacketsPerSecond(): number;
    getAveragePacketSize(): number;
    getBytesPerSecond(): number;
    formatStats(): string;
}
