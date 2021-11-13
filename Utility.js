export const scaleValue = (value, oldMin, oldMax, newMin, newMax) => {
    return ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
}