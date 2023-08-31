import React, { useEffect, useState } from 'react'
import { selectTargetPressure, selectTargetTime, updateData } from '../slices/dataSlice'
import { selectCurrentBrew, selectCurrentFlow, selectCurrentPressure, selectCurrentStartTime, selectCurrentTargetPressure, selectCurrentTemperature, selectCurrentWeight, setCurrentTargetPressure } from '../slices/currentStateSlice'
import { writeTargetPressure } from '../slices/bluetoothSlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function BrewUpdater() {
  const dispatch = useDispatch()
  const [updateTime, setUpdateTime] = useState(0)
  const currentTargetPressure = useSelector(selectCurrentTargetPressure)
  const currentStartTime = useSelector(selectCurrentStartTime)
  const currentTemperature = useSelector(selectCurrentTemperature)
  const currentWeight = useSelector(selectCurrentWeight)
  const currentFlow = useSelector(selectCurrentFlow)
  const currentBrew = useSelector(selectCurrentBrew)
  const currentPressure = useSelector(selectCurrentPressure)
  const targetTime = useSelector(selectTargetTime)
  const targetPressure = useSelector(selectTargetPressure)

  const updateBrew = () => {
    const t = ((new Date().getTime() - currentStartTime) / 1000)
    if (currentBrew) {
      if(t - updateTime > .200){
        dispatch(updateData(
          {
            pressure: currentPressure,
            temperature: currentTemperature,
            weight: currentWeight,
            flow: currentFlow,
            time: t,
          }))
          setUpdateTime((new Date().getTime() - currentStartTime) / 1000)
        }
    }
    else if(updateTime >0) setUpdateTime(0);
    if (currentBrew) {
      for (var i = 0; i < targetPressure.length - 1; i++) {
        if (targetTime[i] <= t && targetTime[i + 1] > t && targetTime[i] > 1) {
          if (Number(currentTargetPressure) !== Number(targetPressure[i])) {
            dispatch(setCurrentTargetPressure(targetPressure[i]))
            console.log("Setting presure to " + (targetPressure[i] * 10) + "curve=" + targetPressure[i])
            dispatch(writeTargetPressure(targetPressure[i]))
            break
          }
        }
      }
    }

  }

  useEffect(() => {
      const interval = setInterval(() => updateBrew(), 200);
      return () => clearInterval(interval);
  });


  return (
    <div></div>
  )
}
