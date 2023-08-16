export const curveCalculator = (startValue, endValue, duration, steps, startTime) => {
  const outuptArray = [];
  // const increaseTime = duration/steps;
  const increaseStep = (endValue-startValue)/(duration/steps)
  for(let i=0; i< duration; i += steps){
    outuptArray.push([startTime + i, startValue.toFixed(2)])
    startValue += increaseStep;
  }
  return outuptArray
}
