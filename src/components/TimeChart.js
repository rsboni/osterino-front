import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { selectTime } from '../slices/dataSlice';

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


function TimeChart() {
  const time = useSelector(selectTime)
  
  return(
    <> <Typography><b>Time:</b></Typography>
    <BorderLinearProgress variant="determinate" value={time[time.length - 1]} />
    <Typography>{time[time.length -1].toFixed(0)} sec</Typography>
    </>)
}

export default TimeChart