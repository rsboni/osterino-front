import React, {useEffect} from 'react'
import { selectTargetPressure, selectTargetTime, updateData } from '../slices/dataSlice'
import { selectCurrentBrew, selectCurrentFlow, selectCurrentPressure, selectCurrentStartTime, selectCurrentTargetPressure, selectCurrentTemperature, selectCurrentWeight, setCurrentTargetPressure } from '../slices/currentStateSlice'
import { writeTargetPressure } from '../slices/bluetoothSlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function BrewUpdater() {
  const dispatch = useDispatch()
  const currentTargetPressure = useSelector(selectCurrentTargetPressure)
  const currentStartTime = useSelector(selectCurrentStartTime)
  const currentTemperature = useSelector(selectCurrentTemperature)
  const currentWeight = useSelector(selectCurrentWeight)
  const currentFlow = useSelector(selectCurrentFlow)
  const currentBrew = useSelector(selectCurrentBrew)
  const currentPressure = useSelector(selectCurrentPressure)
  const targetTime = useSelector(selectTargetTime)
  const targetPressure = useSelector(selectTargetPressure)

  useEffect(() => {
    if (currentBrew) {
      const interval = setInterval(() => {
      const t = ((new Date().getTime() - currentStartTime) / 1000)
      if (currentBrew) {
        dispatch(updateData(
          {
            pressure: currentPressure,
            temperature: currentTemperature,
            weight: currentWeight,
            flow: currentFlow,
            time: t
          }))
      }
      if (currentBrew) {
        for (var i = 0; i < targetPressure.length - 1; i++) {
          if (targetTime[i] <= t && targetTime[i + 1] > t) {
            if (Number(currentTargetPressure) !== Number(targetPressure[i])) {
              dispatch(setCurrentTargetPressure(targetPressure[i]))
              console.log("Setting presure to " + (targetPressure[i] * 10) + "curve=" + targetPressure[i])
              dispatch(writeTargetPressure(targetPressure[i]))
            }
          }
        }
      }
      }, 100);
      return () => clearInterval(interval);
    }
  });


  return (
    <div></div>
  )
}
