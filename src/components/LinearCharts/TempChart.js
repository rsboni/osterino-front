import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCurrentTemperature, selectCurrentTargetTemperature} from '../../slices/currentStateSlice';
import { BorderLinearProgress } from '../../utils/BorderLinearProgress';

function TempChart() {
  const currentTemperature = useSelector(selectCurrentTemperature)
  const currentTargetTemperature = useSelector(selectCurrentTargetTemperature)
  return (
    <>
      <Typography><b>Temperature:</b>
        <BorderLinearProgress variant="determinate" value={currentTemperature / 130 * 100} />
        {currentTemperature} ºC</Typography>
      <Typography>
      <b>Target:</b>
      {currentTargetTemperature} ºC
      </Typography>
    </>
  )
}

export default TempChart