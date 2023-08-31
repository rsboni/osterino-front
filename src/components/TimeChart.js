import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { selectCurrentBrew, selectCurrentEndTime, selectCurrentStartTime } from '../slices/currentStateSlice';
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
  const currentStartTime = useSelector(selectCurrentStartTime)
  const currentBrew = useSelector(selectCurrentBrew)
  const currentEndTime = useSelector(selectCurrentEndTime)
  const time = useSelector(selectTime)
  
  return(
    <> <Typography><b>Time:</b></Typography>
    <BorderLinearProgress variant="determinate" value={(currentStartTime && currentBrew ? Math.floor((new Date().getTime() - currentStartTime) / 1000) : currentStartTime && !currentBrew ? Math.floor((currentEndTime - currentStartTime) / 1000) : time[time.length - 1]) / 100 * 100} />
    <Typography>{currentStartTime && currentBrew ? Math.floor((new Date().getTime() - currentStartTime) / 1000) : currentStartTime && !currentBrew ? Math.floor((currentEndTime - currentStartTime) / 1000) : 0} sec</Typography>
    </>)
}

export default TimeChart