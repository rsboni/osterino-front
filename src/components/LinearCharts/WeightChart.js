import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCurrentWeight } from '../../slices/currentStateSlice';
import { selectTargetWeight } from '../../slices/dataSlice';
import { BorderLinearProgress } from '../../utils/BorderLinearProgress';

function WeightChart() {
  const targetWeight = useSelector(selectTargetWeight)
  const currentWeight = useSelector(selectCurrentWeight)
  return (
    <>       
      <Typography><b>Weigth:</b></Typography>
      <BorderLinearProgress variant="determinate" value={currentWeight / (currentWeight > 50 ? currentWeight : 50) * 100} />
      <Typography>{currentWeight} g <br /></Typography>
      <Typography variant='body2'><b>Target:</b> {targetWeight} g</Typography>
    </>)
}

export default WeightChart