import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { selectCurrentWeight } from '../slices/currentStateSlice';
import { selectTargetWeight } from '../slices/dataSlice';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: '80%',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  }
}));

function WeightChart({ weight }) {
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