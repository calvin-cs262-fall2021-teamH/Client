import { scaleValue } from '../Utility';

export const REAL_UPPER_LEFT_CORNER_COORD = { lat: 42.93532617951739, long: -85.58525936106732 };
export const REAL_LOWER_RIGHT_CORNER_COORD = { lat: 42.9297585579178, long: -85.57842713530987 };

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
    // TOOD: why did i negate these values
    // scaleValue(-long, -REAL_UPPER_LEFT_CORNER_COORD.long, -REAL_LOWER_RIGHT_CORNER_COORD.long, MAP_X, MAP_WIDTH);
    let pixelX = scaleValue(point.longitude, REAL_UPPER_LEFT_CORNER_COORD.long, REAL_LOWER_RIGHT_CORNER_COORD.long, minX, maxX);
    let pixelY = scaleValue(point.latitude, REAL_LOWER_RIGHT_CORNER_COORD.lat, REAL_UPPER_LEFT_CORNER_COORD.lat, minY, maxY);
    return { x: pixelX, y: pixelY };
}