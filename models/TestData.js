import PointOfInterest from './PointOfInterest.js';

export const POINTS = [
    new PointOfInterest(
        'Whiskey Pond',
        'This secluded pond is fed by a seep on the eastern edge. It is home to ducks,' + 
        'frogs, and plants like Buttonbush, Duckweed, and the tiniest vascular' +
        'plant in Michigan, water meal. Watch for the Great Blue Heron that often feeds here',
        42.932583143988886,//42.93264295748676, // 42.932583143988886, -85.58309647938191
        -85.58309647938191,//-85.5831781329471,
        15,
        null,
        require('../assets/WhiskeyPond.png')),
    new PointOfInterest(
        'Crown Gap',
        'In 1995, this large maple tree fell, removing branches from several neighboring trees. ' +
        'The result was a large hole in the canopy, or a crown gap. The gap allows more sunlight to ' +
        'reach the forest floor, encouraging growth of seedlings. Eventually one or two of the seedlings ' +
        'you see now will out-compete the others and will fill the canopy gap',
        42.93374267151409,
        -85.58030280488913,
        15,
        null,
        require('../assets/CrownGap.png'))
];
