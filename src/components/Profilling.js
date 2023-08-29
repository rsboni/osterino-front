import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
import { profiles } from '../utils/profiles';
import { profileMap } from '../utils/profileCalculator';
import EspressoChart from './EspressoChart';
import ProfileCard from './ProfileCard';

export default function Profilling() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (<>
    <Box sx={{ width: '40%', maxWidth: 360, height: '100%', bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="profile list" sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '900px',
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
    <Box sx={{ width: '60%', maxWidth: 900, bgcolor: 'background.paper' }}>
      <ProfileCard profile={profiles[selectedIndex]} />
    </Box>
  </>
  );
}