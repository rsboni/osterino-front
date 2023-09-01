import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTime } from '../../slices/dataSlice';
import { BorderLinearProgress } from '../../utils/BorderLinearProgress';

function TimeChart() {
  const time = useSelector(selectTime)
  return(
    <> <Typography><b>Time:</b></Typography>
    <BorderLinearProgress variant="determinate" value={time[time.length - 1]} />
    <Typography>{time[time.length -1].toFixed(0)} sec</Typography>
    </>)
}

export default TimeChart