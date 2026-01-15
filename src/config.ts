export const RUBBER_BAND = {
    STIFFNESS: 200.0,
    POWER_CURVE: 15,
    CENTERING: 0.01,
    DAMPING: 0.998,
    ANCHOR_Z: 7.8,
    MAX_STRETCH: 1.5
};

export const BOARD = {
    WIDTH: 10,
    HEIGHT: 20.8,
    SLAT_WIDTH: 0.6,
    BASE_THICKNESS: 0.2,
    SLAT_HEIGHT: 0.8,
    BEVEL_SIZE: 0.05,
    TUNNEL_WIDTH: 1.8,
    TUNNEL_HEIGHT: 0.50,
};

export const PULI = {
    RADIUS: 0.65,
    HEIGHT: 0.30,
};

export const NAIL = {
    RADIUS: 0.1,
    HEIGHT: 0.5,
    COLOR: 0xC0C0C0,
    OFFSET_X: 3.9,
    OFFSET_Z: RUBBER_BAND.ANCHOR_Z,
};

export const NAILS_POSITIONS = [
    { x: -NAIL.OFFSET_X, y: -NAIL.OFFSET_Z }, // P0 Left
    { x: NAIL.OFFSET_X, y: -NAIL.OFFSET_Z },  // P0 Right
    { x: -NAIL.OFFSET_X, y: NAIL.OFFSET_Z },  // P1 Left
    { x: NAIL.OFFSET_X, y: NAIL.OFFSET_Z },   // P1 Right
];

export const PHYSICS = {
    FRICTION: 0.90,
    SUBSTEPS: 10,
    TIMESTEP: 1000 / 60,
};

export const VISUALS = {
    BAND_THICKNESS: 0.04,
    BAND_HEIGHT_SCALE: 4.0,
    BAND_COLOR: 0xff7800,
    BAND_SEGMENTS: 200,
    CANVAS_WIDTH: 600,
    CANVAS_HEIGHT: 900,
};

export const GAME_CONFIG = {
    DURATION_SECONDS: 45
};

export const TIMING_CONFIG = {
    NORMAL: {
        INITIAL_BLACK: 500,
        FADE: 1500,
        POST_FADE_WAIT: 1000,
        CAMERA_MOVE: 3500,
        // 3000ms / 3 steps = 1 second per number
        COUNTDOWN: 3000, 
        // 1 second for "Go!"
        GO_SIGNAL: 1000, 
    },
    FAST: {
        INITIAL_BLACK: 200,
        FADE: 500,
        POST_FADE_WAIT: 200,
        CAMERA_MOVE: 1500,
        // CHANGED: Match NORMAL speed (1s per number) even in fast mode
        COUNTDOWN: 3000,
        // CHANGED: Match NORMAL speed (1s for Go)
        GO_SIGNAL: 1000,
    }
};

export const GAME_FLOW = {
    // Default to Normal (Netplay) timings
    CAMERA_INTRO_MS: TIMING_CONFIG.NORMAL.INITIAL_BLACK + TIMING_CONFIG.NORMAL.FADE + TIMING_CONFIG.NORMAL.POST_FADE_WAIT + TIMING_CONFIG.NORMAL.CAMERA_MOVE,
    COUNTDOWN_MS: TIMING_CONFIG.NORMAL.COUNTDOWN,
};

// --- NEW: Color Palettes for UI ---
export const PALETTES = {
    DISCS: [
        { name: "ΜΠΛΕ", value: "#1F3C6E" },
        { name: "ΚΟΚΚΙΝΟ", value: "#8C1D18" },
        { name: "ΚΙΤΡΙΝΟ", value: "#f1c40f" },
        { name: "ΠΡΑΣΙΝΟ", value: "#27ae60" },
        { name: "ΠΟΡΤΟΚΑΛΙ", value: "#d35400" },
        { name: "ΜΩΒ", value: "#8e44ad" },
        { name: "ΜΑΥΡΟ", value: "#2d3436" },
        { name: "ΛΕΥΚΟ", value: "#dfe6e9" },
        { name: "ΚΥΑΝΟ", value: "#00cec9" },
        { name: "ΡΟΖ", value: "#fd79a8" }
    ],
    WOOD: [
        { name: "ΚΛΑΣΙΚΟ", value: "#4A2E1F" },
        { name: "ΠΡΑΣΙΝΟ", value: "#145A32" },
        { name: "ΚΟΚΚΙΝΩΠΟ", value: "#641E16" },
        { name: "ΜΑΥΡΟ", value: "#1e272e" },
        { name: "ΑΝΟΙΧΤΟ", value: "#A67B5B" }
    ],
    FLOOR: [
        { name: "ΛΕΥΚΟ", value: "#FFFFFF" },
        { name: "ΠΡΑΣΙΝΟ", value: "#145A32" },
        { name: "ΓΚΡΙ", value: "#7e7e7e" },
        { name: "ΣΚΟΥΡΟ", value: "#2d3436" },
        { name: "ΚΙΤΡΙΝΟ", value: "#ffde2e" },
        { name: "ΜΠΛΕ", value: "#1F3C6E" },
        { name: "ΚΟΚΚΙΝΟ", value: "#8C1D18" },
    ]
};