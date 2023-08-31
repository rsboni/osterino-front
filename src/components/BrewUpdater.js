import React, {useEffect} from 'react'
import { updateData } from '../slices/dataSlice'
import { setCurrentTargetPressure } from '../slices/currentStateSlice'
import { writeTargetPressure } from '../slices/bluetoothSlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function BrewUpdater() {
  const dispatch = useDispatch()
  const  {currentTargetPressure, currentStartTime, currentTemperature, currentWeight, currentFlow, currentBrew, currentPressure} = useSelector((state => state.currentState))
  const {targetPressure, targetTime} = useSelector((state) => state.data)
  useEffect(() => {
    if (currentBrew) {
      // const interval = setInterval(() => {
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
      // }, 100);
      // return () => clearInterval(interval);
    }
  }, [currentBrew, currentFlow, currentPressure, currentStartTime, currentTargetPressure, currentTemperature, currentWeight, dispatch, targetPressure, targetTime]);


  return (
    <div></div>
  )
}
