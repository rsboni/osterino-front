import React from 'react'
import EspressoChart from './EspressoChart'
import { profileMap } from '../utils/profileCalculator'
import { Divider, Typography } from '@mui/material'

export default function ProfileCard({profile}) {
  const [data, labels] = profileMap(profile)

  return (
    <div>
      <EspressoChart props={[data, labels, false, '200px']}/>
     <Typography variant='h4'>{profile.title}</Typography>
     <Typography variant='subtitle1'>{profile.author}</Typography>
     <Divider />
     <br />
     <Typography>{profile.notes}</Typography>
    <br/>
     <Typography><b>Beverage:</b> {profile.beverage_type}</Typography>
     <Typography><b>Target Weight:</b> {profile.target_weight} g</Typography>
    </div>
  )
}
