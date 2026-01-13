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
    BAND_COLOR: 0xdeb887,
    BAND_SEGMENTS: 200,
    CANVAS_WIDTH: 600,
    CANVAS_HEIGHT: 900,
};

// --- NEW CONFIGURATION ---

export const TIMING_CONFIG = {
    NORMAL: {
        INITIAL_BLACK: 500,
        FADE: 1500,
        POST_FADE_WAIT: 1000,
        CAMERA_MOVE: 3500,
        COUNTDOWN: 6000,
    },
    FAST: {
        INITIAL_BLACK: 200,
        FADE: 500,
        POST_FADE_WAIT: 200,
        CAMERA_MOVE: 1500,
        COUNTDOWN: 3000,
    }
};

export const GAME_FLOW = {
    // Default to Normal (Netplay) timings
    CAMERA_INTRO_MS: TIMING_CONFIG.NORMAL.INITIAL_BLACK + TIMING_CONFIG.NORMAL.FADE + TIMING_CONFIG.NORMAL.POST_FADE_WAIT + TIMING_CONFIG.NORMAL.CAMERA_MOVE,
    COUNTDOWN_MS: TIMING_CONFIG.NORMAL.COUNTDOWN,
};

