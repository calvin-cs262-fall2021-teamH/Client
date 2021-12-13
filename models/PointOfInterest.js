import { scaleValue } from '../Utility';

const OLD_LEFT_BOUND = -85.58525936106732;
const OLD_RIGHT_BOUND = -85.57842713530987;
const OLD_LOWER_BOUND = 42.9297585579178;
const OLD_UPPER_BOUND = 42.93532617951739;

export const LEFT_BOUND = -85.58509326405748;
export const RIGHT_BOUND = -85.57838795335962;
export const LOWER_BOUND = 42.930338787000515;
export const UPPER_BOUND = 42.93668603235268;

export const REAL_UPPER_LEFT_CORNER_COORD = { lat: UPPER_BOUND, long: LEFT_BOUND };
export const REAL_LOWER_RIGHT_CORNER_COORD = { lat: LOWER_BOUND, long: RIGHT_BOUND };

export default class PointOfInterest {
    constructor(id, name, info, latitude, longitude, radius, imageurl) {
        this.id = id;
        this.name = name;
        this.info = info;
        this.latitude = latitude;
        this.longitude = longitude;
        this.radius = radius;
        this.imageurl = imageurl; // this is not in camelcase intentionally; the dataservice delivers this in the same casing, ignoring the correct casing that we put in the database column name
    }
}

export function isCoordWithinBoundaries(point) {
    return point.latitude >= REAL_LOWER_RIGHT_CORNER_COORD.lat &&
            point.latitude <= REAL_UPPER_LEFT_CORNER_COORD.lat &&
            point.longitude >= REAL_UPPER_LEFT_CORNER_COORD.long &&
            point.longitude <= REAL_LOWER_RIGHT_CORNER_COORD.long; 
}

export function scaleCoordsToPixelCoords(point, minX, minY, maxX, maxY) {
    let pixelX = (point.longitude - LEFT_BOUND) / (RIGHT_BOUND - LEFT_BOUND) * maxX;
    let pixelY = (point.latitude - UPPER_BOUND) / (LOWER_BOUND - UPPER_BOUND) * maxY;
    return { x: pixelX, y: pixelY };
}