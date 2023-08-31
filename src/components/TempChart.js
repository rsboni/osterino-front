import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { selectCurrentTemperature } from '../slices/currentStateSlice';

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

function TempChart() {
  const  currentTemperature = useSelector(selectCurrentTemperature)
  return(
   <>
   <Typography><b>Temperature:</b>
            <BorderLinearProgress variant="determinate" value={currentTemperature / 130 * 100} />
            {currentTemperature} ºC</Typography>
   </>
  )
}

export default TempChart