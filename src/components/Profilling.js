import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { profiles } from '../utils/profiles';
import ProfileCard from './ProfileCard';
import { Button } from '@mui/material';
import { setData } from '../slices/dataSlice';
import { useDispatch } from 'react-redux';



export default function Profilling(props) {
  const {setProfile} = props
  
  const dispatch = useDispatch();
  const [ selectedIndex, setSelectedIndex] = React.useState(0)
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
    dispatch(setData(profiles[index]))
  };
  return (<Box sx={{display: 'flex', height:'85vh'}}>
    <Box sx={{ width: '40%', overflow:'auto', maxWidth: 360, height: '100%', bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="profile list" sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        '& ul': { padding: 0 },
      }}>
        {profiles.map((profile, index) => {
          return (
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemText primary={profile.title} />
            </ListItemButton>
          )
        })}
      </List>
    </Box>
    <Box sx={{ width: '60%', maxWidth: 900, bgcolor: 'background.paper',flexGrow: 1, p: 3, overflow:'auto' }}>
      <ProfileCard profile={profiles[selectedIndex]} />
      <Button
            fullWidth
            variant='contained'
            size='large'
            className='button'
            color='primary'
            onClick={() => setProfile(profiles[selectedIndex])}
            spacing={2}
          > Set Profile </Button>
    </Box>
  </Box>
  );
}