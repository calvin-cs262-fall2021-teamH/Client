import { scaleValue } from '../Utility';

const REAL_UPPER_LEFT_CORNER_COORD = { lat: 42.93532617951739, long: -85.58525936106732 };
const REAL_LOWER_RIGHT_CORNER_COORD = { lat: 42.9297585579178, long: -85.57842713530987 };

class PointOfInterest {
    constructor(name, imageURL, latitude, longitude, radius) {
        this.name = name;
        this.image = downloadOrUncacheImage(imageURL);
        this.latitude = latitude;
        this.longitude = longitude;
        this.radius = radius;
    }

    downloadOrUncacheImage(imageURL) {
        // TODO: figure out downloading or uncaching images
        return require('../assets/WhiskeyPond.png');
    }

    scaleCoordsToPixelCoords(minX, minY, maxX, maxY) {
        // TOOD: why did i negate these values
        // scaleValue(-long, -REAL_UPPER_LEFT_CORNER_COORD.long, -REAL_LOWER_RIGHT_CORNER_COORD.long, MAP_X, MAP_WIDTH);
        let pixelX = scaleValue(this.longitude, REAL_UPPER_LEFT_CORNER_COORD.long, REAL_LOWER_RIGHT_CORNER_COORD.long, minX, maxX);
        let pixelY = scaleValue(this.latitude, REAL_LOWER_RIGHT_CORNER_COORD.lat, REAL_UPPER_LEFT_CORNER_COORD.lat, minY, maxY);
        return { x: pixelX, y: pixelY };
    }
}