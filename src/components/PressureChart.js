import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { selectCurrentPressure, selectCurrentTargetPressure } from '../slices/currentStateSlice';

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