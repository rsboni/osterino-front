import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCurrentPressure, selectCurrentTargetPressure } from '../../slices/currentStateSlice';
import { BorderLinearProgress } from '../../utils/BorderLinearProgress';

function PressureChart() {
  const currentPressure = useSelector(selectCurrentPressure)
  const currentTargetPressure = useSelector(selectCurrentTargetPressure)
  return(<>
    <Typography><b>Pressure:</b> </Typography>
    <BorderLinearProgress variant="determinate" value={currentPressure / 15 * 100} />
    <Typography>{currentPressure} bar <br /></Typography>
    <Typography variant='body2'><b>Target:</b> {currentTargetPressure} bar</Typography>
    </>
  )
}

export default PressureChart