import { profiles } from "./profiles";

export const curveCalculator = (startValue, endValue, duration, steps, startTime) => {
  const outuptArray = [];
  // const increaseTime = duration/steps;
  const increaseStep = (endValue - startValue) / (duration / steps)
  for (let i = 0; i < duration; i += steps) {
    outuptArray.push([startTime + i, startValue.toFixed(1)])
    startValue += increaseStep;
  }
  return outuptArray
}

export const profileMap = (profile) => {
  let t = 0
  let yTempValue = [], yWeightValue = [], yFlowValue = [], yPressureValue = [], labels = []
  profile.steps.forEach((step, index, array) => {
    const duration = parseFloat(step.seconds)
    const temperature = parseFloat(step.temperature ??= 0)
    const flow = parseFloat(step.flow ??= 0)
    const pressure = parseFloat(step.pressure ??= 0)
    const previousPressure = parseFloat(array[index === 0 ? 0 : index - 1].pressure)
    if (duration > 4) labels.push({
      x: t,
      label: {
        text: step.name,
      }
    })
    yTempValue.push(...curveCalculator(temperature, temperature, duration - 1, 0.5, t))
    yFlowValue.push(...curveCalculator(flow, flow, duration - 1, 0.5, t))
    yPressureValue.push(...curveCalculator(step.transition === "smooth" ? previousPressure : pressure, pressure, duration - 1, 0.5, t))
    t = t + duration
  });

  return [yTempValue, yWeightValue, yFlowValue, yPressureValue, labels]
}