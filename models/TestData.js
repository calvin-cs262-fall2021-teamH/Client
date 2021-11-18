import PointOfInterest from './PointOfInterest.js';

export const TEST_POINTS_OF_INTEREST = [
    new PointOfInterest(
        1,
        'Whiskey Pond',
        'This secluded pond is fed by a seep on the eastern edge. It is home to ducks,' + 
        'frogs, and plants like Buttonbush, Duckweed, and the tiniest vascular' +
        'plant in Michigan, water meal. Watch for the Great Blue Heron that often feeds here',
        42.932583143988886,
        -85.58309647938191,
        15,
        'https://raw.githubusercontent.com/calvin-cs262-fall2021-teamH/Service/connect_points_to_dataservice/point_assets/WhiskeyPond.png'),
    new PointOfInterest(
        2,
        'Crown Gap',
        'In 1995, this large maple tree fell, removing branches from several neighboring trees. ' +
        'The result was a large hole in the canopy, or a crown gap. The gap allows more sunlight to ' +
        'reach the forest floor, encouraging growth of seedlings. Eventually one or two of the seedlings ' +
        'you see now will out-compete the others and will fill the canopy gap',
        42.93374267151409,
        -85.58030280488913,
        15,
        'https://raw.githubusercontent.com/calvin-cs262-fall2021-teamH/Service/connect_points_to_dataservice/point_assets/CrownGap.png')
];
