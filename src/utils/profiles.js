export const profiles = [{
  "title": "80's Espresso",
  "author": "Decent",
  "notes": "For medium to dark roasted beans. Produced a complex espresso meant for sipping, not for mixing with milk. The low starting temperature of 82C--which declines to 72C--is the magic.  This creates a silky, textured shot with good aroma, pleasant acidity, great complexity, and no off flavors. There are two styles: a ristretto or a double shot.  With a ristretto, put the recommended dose weight (ie, 14g, 15g, 18g, 20g) into the basket, and pull it as a 1:1 ratio shot.  For a double shot, updose by 10% to 20% and extract to a 2:1 ratio (and grind a bit coarser).  With both approaches, immediately after preinfusion aim for a flow rate in the range of 0.5-1.2ml/sec. The darker the roast, the slower the recommended flow rate. The ristretto has more flavor and complexity while the overdosed double shot is very smooth, easy to drink, and classic.",
  "beverage_type": "espresso",
  "id": "80sEspresso",
  "tank_temperature": "0.0",
  "target_weight": "36.0",
  "target_volume": "0.0",
  "target_volume_count_start": "1.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "preinfusion",
      "temperature": "82.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "7.5",
      "seconds": "8.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "3.8"
      }
    },
    {
      "name": "rise and hold",
      "temperature": "80.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "7.8",
      "seconds": "4.0",
      "volume": "0.0"
    },
    {
      "name": "decline",
      "temperature": "72.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "5.0",
      "seconds": "50.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Adaptive (for medium roasts)",
  "author": "Decent",
  "notes": "This profile aims to unite the best practices in espresso extraction that we have learned so far with the Decent. It unites Brakel's Londonium, Rao's Blooming and Gagné's Adaptive profiles. The flow rate during extraction will automatically adjust itself from the flow rate actually happening during the Pressurize step and then gently increase it from there.  A 15g dose is typical.  Aim for a flow rate around 1.5 ml/s at the Pressurize step. 15g in, 33g out, in 32 seconds is a typical recipe for a medium roast.  Grind fine enough to keep dripping during preinfusion to around 4g.",
  "beverage_type": "espresso",
  "id": "Adaptive (for medium roasts)",
  "tank_temperature": "0.0",
  "target_weight": "36.0",
  "target_volume": "36.0",
  "target_volume_count_start": "3.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "Prefill",
      "temperature": "93.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "8.0",
      "seconds": "2.0",
      "volume": "100.0"
    },
    {
      "name": "Fill",
      "temperature": "93.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "8.0",
      "seconds": "12.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "3.0"
      }
    },
    {
      "name": "Compressing",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "3.0",
      "seconds": "12.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "under",
        "value": "3.0"
      }
    },
    {
      "name": "Dripping",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "3.0",
      "seconds": "6.0",
      "volume": "0.0"
    },
    {
      "name": "Pressurize",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "11.0",
      "seconds": "6.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "8.8"
      }
    },
    {
      "name": "Extraction start",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "1.5",
      "seconds": "0.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "0.0"
      }
      ,
      "limiter": {
        "value": "9.5",
        "range": "0.6"
      }
    },
    {
      "name": "Extraction",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "smooth",
      "flow": "2.5",
      "seconds": "60.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "9.5",
        "range": "0.6"
      }
    }
  ]
}
  ,
{
  "title": "Advanced spring lever",
  "author": "Decent",
  "notes": "An advanced spring lever profile by John Weiss that addresses a problem with simple spring lever profiles, by using both pressure and flow control. The last two steps keep pressure/flow under control as the puck erodes, if the shot has not finished by the end of step 3. Please consider this as a starting point for tweaking.",
  "beverage_type": "espresso",
  "id": "Advanced spring lever",
  "tank_temperature": "0.0",
  "target_weight": "36.0",
  "target_volume": "0.0",
  "target_volume_count_start": "0.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "infuse",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "6.0",
      "seconds": "20.0",
      "volume": "100.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "3.0"
      }
    },
    {
      "name": "rise and hold",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.0",
      "seconds": "10.0",
      "volume": "0.0"
    },
    {
      "name": "decline",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "4.0",
      "seconds": "20.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "under",
        "value": "4.0"
      }
    },
    {
      "name": "pressure limit",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "4.0",
      "seconds": "10.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "over",
        "value": "1.0"
      }
    },
    {
      "name": "flow limit",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "smooth",
      "flow": "1.0",
      "seconds": "30.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Best Practice - Adaptive (for medium roasts)",
  "author": "Decent",
  "notes": "This profile aims to unite the best practices in espresso extraction that we have learned so far with the Decent. It unites Brakel's Londonium, Rao's Blooming and Gagné's Adaptive profiles. The flow rate during extraction will automatically adjust itself from the flow rate actually happening during the Pressurize step and then gently increase it from there.  A 15g dose is typical.  Aim for a flow rate around 1.5 ml/s at the Pressurize step. 15g in, 33g out, in 32 seconds is a typical recipe for a medium roast.  Grind fine enough to keep dripping during preinfusion to around 4g.",
  "beverage_type": "espresso",
  "id": "best_practice",
  "tank_temperature": "0.0",
  "target_weight": "36.0",
  "target_volume": "36.0",
  "target_volume_count_start": "3.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "Prefill",
      "temperature": "93.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "8.0",
      "seconds": "2.0",
      "volume": "100.0"
    },
    {
      "name": "Fill",
      "temperature": "93.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "8.0",
      "seconds": "12.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "3.0"
      }
    },
    {
      "name": "Compressing",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "3.0",
      "seconds": "12.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "under",
        "value": "3.0"
      }
    },
    {
      "name": "Dripping",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "3.0",
      "seconds": "6.0",
      "volume": "0.0"
    },
    {
      "name": "Pressurize",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "11.0",
      "seconds": "6.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "8.8"
      }
    },
    {
      "name": "Extraction start",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "1.5",
      "seconds": "0.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "0.0"
      }
      ,
      "limiter": {
        "value": "9.5",
        "range": "0.6"
      }
    },
    {
      "name": "Extraction",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "smooth",
      "flow": "2.5",
      "seconds": "60.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "9.5",
        "range": "0.6"
      }
    }
  ]
}
  ,
{
  "title": "Blooming Espresso",
  "author": "Decent",
  "notes": "This technique causes a furor when Rao first published it.  His extraction of 24% is 2% higher than what is usually attainable with only the very best grinders, yet Rao did it with an inexpensive home grinder.  This technique is especially appropriate for lightly roasted, complex and expensive coffee beans.",
  "beverage_type": "espresso",
  "id": "BloomingEspresso",
  "tank_temperature": "0.0",
  "target_weight": "60.0",
  "target_volume": "0.0",
  "target_volume_count_start": "2.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "preinfusion",
      "temperature": "97.5",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "4.0",
      "seconds": "23.0",
      "volume": "500.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.0"
      }
    },
    {
      "name": "pause",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "30.0",
      "volume": "0.0"
    },
    {
      "name": "ramp",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "smooth",
      "flow": "2.2",
      "seconds": "5.0",
      "volume": "0.0"
    },
    {
      "name": "flat flow",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "2.2",
      "seconds": "20.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "8.6",
        "range": "0.6"
      }
    },
    {
      "name": "reset temperature",
      "temperature": "98.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "1.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Classic Italian espresso",
  "author": "Decent",
  "notes": "This will imitate the espresso style of the majority of cafes around the world. It uses a short preinfusion with a flat 9 bar pressure profile.",
  "beverage_type": "espresso",
  "id": "Classic Italian espresso",
  "tank_temperature": "0.0",
  "target_weight": "36.0",
  "target_volume": "36.0",
  "target_volume_count_start": "2.0",
  "legacy_profile_type": "settings_2a",
  "type": "pressure",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "preinfusion temp boost",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "4.5",
      "seconds": "2.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.0"
      }
    },
    {
      "name": "preinfusion",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "4.5",
      "seconds": "6.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.0"
      }
    },
    {
      "name": "forced rise without limit",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.0",
      "seconds": "3.0",
      "volume": "0.0"
    },
    {
      "name": "rise and hold",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.0",
      "seconds": "32.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "4.5",
        "range": "1.0"
      }
    }
  ]
}
  ,
{
  "title": "Cleaning Forward Flush x5",
  "author": "Decent",
  "notes": "A convenient way to 5 times flush and clean your group head.  (1) Put a blind basket in your portafilter  (2) Put 3g (1/2 teaspoon) of espresso machine detergent in the blind basket  (3) Run this profile  (4) When it is done, remove the portafilter off Flush the DE1 until the water goes clear  (5) Put the portafilter back without detergent and run this profile again  (6) Finally, run FLUSH for 20 seconds.",
  "beverage_type": "cleaning",
  "id": "CleaningForwardFlushx5",
  "tank_temperature": "0.0",
  "target_weight": "0.0",
  "target_volume": "0.0",
  "target_volume_count_start": "2.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "kr",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "Pressure rise 1",
      "temperature": "85.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.999999999999993",
      "seconds": "20.0",
      "volume": "500.0"
    },
    {
      "name": "Pause 1",
      "temperature": "85.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "0.0",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "Pressure rise 2",
      "temperature": "85.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.999999999999993",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "Pause 2",
      "temperature": "85.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "-3.885780586188048e-16",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "Pressure rise 3",
      "temperature": "85.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.999999999999993",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "Pause 3",
      "temperature": "85.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "-5.717648576819556e-15",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "Pressure rise 4",
      "temperature": "85.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.999999999999993",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "Pause 4",
      "temperature": "85.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "-5.717648576819556e-15",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "Pressure rise 5",
      "temperature": "85.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.999999999999993",
      "seconds": "15.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "D-Flow / default",
  "author": "Damian",
  "notes": "Damian's D-Flow profile. A simple to use advanced profile; By Damian Brakel https://www.diy.brakel.com.au/",
  "beverage_type": "espresso",
  "id": "D-Flow / default",
  "tank_temperature": "0.0",
  "target_weight": "40.0",
  "target_volume": "0.0",
  "target_volume_count_start": "2.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "Filling",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "2.0",
      "seconds": "25.0",
      "volume": "100.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "1.5"
      }
    },
    {
      "name": "Infusing",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "3.0",
      "seconds": "60.0",
      "volume": "0.0"
    },
    {
      "name": "Pouring",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "2.0",
      "seconds": "127.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "7.5000000000000036",
        "range": "0.2"
      }
    }
  ]
}
  ,
{
  "title": "Damian's LM Leva",
  "author": "Damian",
  "notes": "Damian wrote this profile to mimic a shot Gabor Laczko recorded on a La Marzocco Leva machine using his Smart Espresso Profiler. He feels that this is a great profile for non milk drinks, it highlights flavours in a smooth balanced way, with a more creamy body than the thicker chocolatey body of the LRv2 profile. By Damian Brakel https://www.diy.brakel.com.au/",
  "beverage_type": "espresso",
  "id": "DamiansLMLeva",
  "tank_temperature": "0.0",
  "target_weight": "42.0",
  "target_volume": "0.0",
  "target_volume_count_start": "2.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "fill",
      "temperature": "89.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "1.8",
      "seconds": "20.0",
      "volume": "100.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "1.0"
      }
    },
    {
      "name": "preinfusion",
      "temperature": "88.5",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "2.2",
      "seconds": "10.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.0"
      }
    },
    {
      "name": "rise",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "8.0",
      "seconds": "5.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "8.0"
      }
    },
    {
      "name": "hold",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "8.0",
      "seconds": "5.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "over",
        "value": "1.5"
      }
    },
    {
      "name": "decline",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "2.2",
      "seconds": "58.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Damian's LRv2",
  "author": "Damian",
  "notes": "This profile simulates a Londinium R machines extraction style. This is an advanced profile with some added steps to assist with less than ideal puck prep. Christee-Lee described it as like having a milkshake with extra syrup. Great body and flavour range. 2nd edition.  This is identical to the  'Londonium' profile, but renamed to be easier to understand.  By Damian Brakel https://www.diy.brakel.com.au/",
  "beverage_type": "espresso",
  "id": "DamiansLRv2",
  "tank_temperature": "0.0",
  "target_weight": "42.0",
  "target_volume": "0.0",
  "target_volume_count_start": "0.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "Fill",
      "temperature": "89.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "2.0",
      "seconds": "25.0",
      "volume": "100.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "1.5"
      }
    },
    {
      "name": "Infuse",
      "temperature": "88.5",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "3.0",
      "seconds": "12.0",
      "volume": "0.0"
    },
    {
      "name": "Pressure Up",
      "temperature": "88.5",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.0",
      "seconds": "8.0",
      "volume": "0.0"
    },
    {
      "name": "Pressure Decline",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "3.0",
      "seconds": "55.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "over",
        "value": "2.8"
      }
    },
    {
      "name": "Pressure Hold",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "3.0",
      "seconds": "127.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "over",
        "value": "2.8"
      }
    },
    {
      "name": "Flow Limit",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "2.5",
      "seconds": "127.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Damian's LRv3",
  "author": "Damian",
  "notes": "This profile simulates a Londinium R machines extraction style. This is an advanced profile with some added steps to assist with less than ideal puck prep. Christee-Lee described it as like having a milkshake with extra syrup. Great body and flavour range. 3rd edition. By Damian Brakel https://www.diy.brakel.com.au/",
  "beverage_type": "espresso",
  "id": "DamiansLRv3",
  "tank_temperature": "0.0",
  "target_weight": "42.0",
  "target_volume": "0.0",
  "target_volume_count_start": "0.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "Fill",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "2.0",
      "seconds": "25.0",
      "volume": "100.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "1.5"
      }
    },
    {
      "name": "Infuse",
      "temperature": "89.5",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "3.0",
      "seconds": "12.0",
      "volume": "0.0"
    },
    {
      "name": "Pressure Up",
      "temperature": "89.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.0",
      "seconds": "4.0",
      "volume": "0.0"
    },
    {
      "name": "9 Bar Hold",
      "temperature": "89.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.0",
      "seconds": "30.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "over",
        "value": "1.9"
      }
    },
    {
      "name": "Pressure Decline",
      "temperature": "89.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "5.5",
      "seconds": "35.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "over",
        "value": "2.8"
      }
    },
    {
      "name": "5 Bar Hold ",
      "temperature": "89.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "5.5",
      "seconds": "127.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "over",
        "value": "2.8"
      }
    },
    {
      "name": "Flow Limit",
      "temperature": "89.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "2.2",
      "seconds": "127.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Default",
  "author": "Decent",
  "notes": "This profile is gentle on the coffee puck and not too demanding on the barista.  Produces a very acceptable espresso in a wide variety of settings.",
  "beverage_type": "espresso",
  "id": "Default",
  "tank_temperature": "0.0",
  "target_weight": "36.0",
  "target_volume": "36.0",
  "target_volume_count_start": "2.0",
  "legacy_profile_type": "settings_2a",
  "type": "pressure",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "preinfusion temp boost",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "4.0",
      "seconds": "2.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.0"
      }
    },
    {
      "name": "preinfusion",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "4.0",
      "seconds": "18.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.0"
      }
    },
    {
      "name": "forced rise without limit",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "8.6",
      "seconds": "3.0",
      "volume": "0.0"
    },
    {
      "name": "rise and hold",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "8.6",
      "seconds": "1.0",
      "volume": "0.0"
    },
    {
      "name": "forced rise without limit",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "8.6",
      "seconds": "3.0",
      "volume": "0.0"
    },
    {
      "name": "decline",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "6.0",
      "seconds": "32.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Easy Blooming - Pressure Dynamic Decline",
  "author": "Stéphane",
  "notes": "94°C for all steps - blooming stopped if P < 2.0 bar - fast pressure rise to 6 bar - dynamic pressure decline",
  "beverage_type": "espresso",
  "id": "EasyBlooming-PressureDynamicDecline",
  "tank_temperature": "0.0",
  "target_weight": "45.0",
  "target_volume": "0.0",
  "target_volume_count_start": "1.0",
  "legacy_profile_type": "settings_2c2",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "preinfusion",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "5.0",
      "seconds": "20.0",
      "volume": "100.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.0"
      }
    },
    {
      "name": "dynamic bloom",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "90.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "under",
        "value": "2.0"
      }
    },
    {
      "name": "fast pressure",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "6.0",
      "seconds": "4.0",
      "volume": "0.0"
    },
    {
      "name": "pressure hold 1",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "6.0",
      "seconds": "4.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "over",
        "value": "1.6"
      }
    },
    {
      "name": "P fast decline 1",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "4.0",
      "seconds": "10.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "under",
        "value": "1.4"
      }
    },
    {
      "name": "P fast decline 2",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "3.0",
      "seconds": "40.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "under",
        "value": "1.4"
      }
    },
    {
      "name": "pressure hold 2",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "6.0",
      "seconds": "8.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "over",
        "value": "1.9"
      }
    },
    {
      "name": "P decline 1",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "5.0",
      "seconds": "10.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "under",
        "value": "1.7"
      }
    },
    {
      "name": "P decline 2",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "4.0",
      "seconds": "40.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "under",
        "value": "1.7"
      }
    },
    {
      "name": "pressure hold 3",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "6.0",
      "seconds": "30.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "over",
        "value": "2.2"
      }
    },
    {
      "name": "P slow decline",
      "temperature": "94.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "4.5",
      "seconds": "40.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Extractamundo Dos!",
  "author": "Decent",
  "notes": "Dynamic bloom into pressure extraction. Based on the 'easy blooming' profile structure from Luca and Stephane and modified to primarily target high extraction grinders at high flow rates, typically ending around 2.5-4ml/s. Dial with ratio once grind is giving an ending flowrate in the range. Includes a significant temperature drop that reduces harshness (although the actual temperature drop is much less than programmed). Improves upon TurboBloom by using a flow-based pressure drop instead of a programmed pressure drop. By Joe D.",
  "beverage_type": "espresso",
  "id": "ExtractamundoDos!",
  "tank_temperature": "0.0",
  "target_weight": "40.0",
  "target_volume": "0.0",
  "target_volume_count_start": "2.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "preinfusion",
      "temperature": "83.5",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "8.0",
      "seconds": "20.0",
      "volume": "100.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.5"
      }
    },
    {
      "name": "dynamic bloom",
      "temperature": "67.5",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "40.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "under",
        "value": "2.2"
      }
    },
    {
      "name": "6 bar",
      "temperature": "74.5",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "6.0000000000000036",
      "seconds": "60.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "under",
        "value": "0.0"
      }
      ,
      "limiter": {
        "value": "1.0",
        "range": "3.0"
      }
    }
  ]
}
  ,
{
  "title": "Filter 2.0",
  "author": "Decent",
  "notes": "A new technique developed by Scott Rao, for making filter coffee with an espresso machine and 24g basket.  The process: (1) insert two micron 55mm paper filter into the bottom of a clean portafilter basket.  (2) Rinser the filter and basket with hot water.  (3) Fill the basket with 20g to 22g of finely ground coffee, not quite espresso grind, but far finer than any filter grind.  (4) WDT the grounds.  (5) tamping is optional.  (6) Place a metal mesh filter on top.  (7) Lock in the portafilter and make the espresso to a 5:1 ratio. (8) Dilute with 225g-250g of water.",
  "beverage_type": "filter",
  "id": "Filter2.0",
  "tank_temperature": "0.0",
  "target_weight": "100.0",
  "target_volume": "100.0",
  "target_volume_count_start": "1.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "preinfusion",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "5.0",
      "seconds": "6.0",
      "volume": "465.0"
    },
    {
      "name": "pause",
      "temperature": "85.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "120.0",
      "volume": "0.0"
    },
    {
      "name": "flat flow",
      "temperature": "85.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "3.0",
      "seconds": "120.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "3.0",
        "range": "0.6"
      }
    },
    {
      "name": "reset temperature",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "1.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Flow profile for straight espresso",
  "author": "Decent",
  "notes": "John Buckman, the founder of Decent Espresso, finds that this flow profile produces the best espresso shots for straight espresso drinks in the widest variety of circumstances. It is especially tolerant of not-yet-very-good barista technique.",
  "beverage_type": "espresso",
  "id": "Flow profile for straight espresso",
  "tank_temperature": "0.0",
  "target_weight": "36.0",
  "target_volume": "36.0",
  "target_volume_count_start": "1.0",
  "legacy_profile_type": "settings_2b",
  "type": "flow",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "preinfusion",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "4.0",
      "seconds": "20.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "5.0"
      }
    },
    {
      "name": "hold",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "2.0",
      "seconds": "30.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "8.6",
        "range": "0.9"
      }
    },
    {
      "name": "decline",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "smooth",
      "flow": "1.0",
      "seconds": "0.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "8.6",
        "range": "0.9"
      }
    }
  ]
}
  ,
{
  "title": "GHC/manual pressure control",
  "author": "Decent",
  "notes": "For use with machines that have a group head controller (GHC).  Hold your finger on the GHC for the pressure you want.",
  "beverage_type": "manual",
  "id": "GHCmanualpressurecontrol",
  "tank_temperature": "0.0",
  "target_weight": "0.0",
  "target_volume": "0.0",
  "target_volume_count_start": "0.0",
  "legacy_profile_type": "settings_2a",
  "type": "pressure",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "forced rise without limit",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "0.0",
      "seconds": "3.0",
      "volume": "0.0"
    },
    {
      "name": "rise and hold",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "0.0",
      "seconds": "57.0",
      "volume": "0.0"
    },
    {
      "name": "decline",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "0.0",
      "seconds": "60.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Gentle and sweet",
  "author": "Decent",
  "notes": "This is a very easy espresso to successfully make and is suggested if you are having difficulty making good drinks.  The pressure rises to only 6 bar and then slowly descends to 4 bar.  The resulting espresso should be free of channeling, have low acidity and quite pleasant to drink straight or with milk.",
  "beverage_type": "espresso",
  "id": "Gentle and sweet",
  "tank_temperature": "0.0",
  "target_weight": "36.0",
  "target_volume": "36.0",
  "target_volume_count_start": "2.0",
  "legacy_profile_type": "settings_2a",
  "type": "pressure",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "preinfusion temp boost",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "4.0",
      "seconds": "2.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.0"
      }
    },
    {
      "name": "preinfusion",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "4.0",
      "seconds": "18.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.0"
      }
    },
    {
      "name": "forced rise without limit",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "6.0",
      "seconds": "3.0",
      "volume": "0.0"
    },
    {
      "name": "rise and hold",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "6.0",
      "seconds": "13.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "4.0",
        "range": "1.0"
      }
    },
    {
      "name": "decline",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "4.0",
      "seconds": "30.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "4.0",
        "range": "1.0"
      }
    }
  ]
}
  ,
{
  "title": "Londonium",
  "author": "Decent",
  "notes": "This profile simulates a Londinium R machines extraction style. This is an advanced profile with some added steps to assist with less than ideal puck prep. Christee-Lee described it as like having a milkshake with extra syrup. Great body and flavour range.  By Damian Brakel https://www.diy.brakel.com.au/londinium-r-style-profile/",
  "beverage_type": "espresso",
  "id": "Londonium",
  "tank_temperature": "0.0",
  "target_weight": "36.0",
  "target_volume": "0.0",
  "target_volume_count_start": "2.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "Fill",
      "temperature": "89.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "2.0",
      "seconds": "25.0",
      "volume": "100.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "1.5"
      }
    },
    {
      "name": "Infuse",
      "temperature": "88.5",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "3.0",
      "seconds": "12.0",
      "volume": "0.0"
    },
    {
      "name": "Pressure Up",
      "temperature": "88.5",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.0",
      "seconds": "8.0",
      "volume": "0.0"
    },
    {
      "name": "Pressure Decline",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "3.0",
      "seconds": "55.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "over",
        "value": "2.5"
      }
    },
    {
      "name": "Pressure Hold",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "3.0",
      "seconds": "127.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "over",
        "value": "2.5"
      }
    },
    {
      "name": "Flow Limit",
      "temperature": "88.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "2.0",
      "seconds": "127.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Rao Allongé",
  "author": "Decent",
  "notes": "An amazing long espresso for light roasts, this is the biggest fruit bomb of any brewing method we know.  5:1 ratio, 35-40 seconds, coarse espresso grind. If close to the right pressure, make 0.5g dose adjustments to get to an 8-9 bar peak. The very high flow rate means small grind adjustments cause big pressure changes. An advanced technique, allongé averages 24% extraction.",
  "beverage_type": "espresso",
  "id": "RaoAllongé",
  "tank_temperature": "0.0",
  "target_weight": "135.0",
  "target_volume": "180.0",
  "target_volume_count_start": "0.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "hold at 4.5 ml/s",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "4.5",
      "seconds": "60.0",
      "volume": "500.0"
      ,
      "limiter": {
        "value": "8.6",
        "range": "0.6"
      }
    }
  ]
}
  ,
{
  "title": "Tea/in a basket",
  "author": "Decent",
  "notes": "This profile makes an acceptable mug of tea using a regular portafilter espresso basket.  Place half a teaspoon of loose leaf tea, or a teabag, into a basket of any size.  Works best of teas that prefer high brewing temperatures, such as English Breakfast.  For better quality brews, use a tea portafilter, but this technique works well enough if you don't own that.",
  "beverage_type": "tea",
  "id": "Teainabasket",
  "tank_temperature": "0.0",
  "target_weight": "0.0",
  "target_volume": "295.0",
  "target_volume_count_start": "0.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "preinfusion boost",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "4.0",
      "seconds": "4.0",
      "volume": "0.0"
    },
    {
      "name": "flow",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.5",
      "seconds": "5.0",
      "volume": "0.0"
    },
    {
      "name": "hold",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "10.0",
      "volume": "0.0"
    },
    {
      "name": "flow",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "3.0",
      "seconds": "12.0",
      "volume": "0.0"
    },
    {
      "name": "hold",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "12.0",
      "volume": "0.0"
    },
    {
      "name": "flow",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "3.0",
      "seconds": "12.0",
      "volume": "0.0"
    },
    {
      "name": "hold",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "12.0",
      "volume": "0.0"
    },
    {
      "name": "flow",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "3.0",
      "seconds": "12.0",
      "volume": "0.0"
    },
    {
      "name": "hold",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "12.0",
      "volume": "0.0"
    },
    {
      "name": "flow",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "3.0",
      "seconds": "12.0",
      "volume": "0.0"
    },
    {
      "name": "hold",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.1",
      "seconds": "12.0",
      "volume": "0.0"
    },
    {
      "name": "flow",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "3.0",
      "seconds": "12.0",
      "volume": "0.0"
    },
    {
      "name": "hold",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "10.0",
      "volume": "0.0"
    },
    {
      "name": "flow",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "3.0",
      "seconds": "10.0",
      "volume": "0.0"
    },
    {
      "name": "flow",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "10.0",
      "volume": "0.0"
    },
    {
      "name": "flow",
      "temperature": "100.0",
      "sensor": "water",
      "pump": "flow",
      "transition": "fast",
      "flow": "3.0",
      "seconds": "10.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Test/Flow calibration",
  "author": "Decent",
  "notes": "Put a 0.3mm puck simulator basket into a portafilter. Connect a bluetooth scale.  Run this profile. Change the Flow value on the Calibration page, and rerun this profile.  Repeat until the blue and brown lines follow each other.",
  "beverage_type": "calibrate",
  "id": "TestFlowcalibration",
  "tank_temperature": "0.0",
  "target_weight": "0.0",
  "target_volume": "0.0",
  "target_volume_count_start": "2.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "1 bar",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "1.0",
      "seconds": "20.0",
      "volume": "0.0"
    },
    {
      "name": "2 bar",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "2.0",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "3 bar",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "3.0",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "4 bar",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "4.0",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "5 bar",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "5.0",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "6 bar",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "6.0",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "7 bar",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "7.0",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "8 bar",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "8.0",
      "seconds": "15.0",
      "volume": "0.0"
    },
    {
      "name": "9 bar",
      "temperature": "90.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.0",
      "seconds": "15.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "Traditional lever machine",
  "author": "Decent",
  "notes": "Lever espresso machines are why we refer to pulling an espresso.  You pull a spring-loaded lever by hand to create pressure on the coffee puck.  This 9 bar espresso is the most common type of classic lever espresso you'll have, and many fans consider lever shots to be the best espresso they've ever had.",
  "beverage_type": "espresso",
  "id": "Traditionallevermachine",
  "tank_temperature": "0.0",
  "target_weight": "36.0",
  "target_volume": "36.0",
  "target_volume_count_start": "1.0",
  "legacy_profile_type": "settings_2a",
  "type": "pressure",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "preinfusion",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "4.5",
      "seconds": "20.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.0"
      }
    },
    {
      "name": "forced rise without limit",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.0",
      "seconds": "3.0",
      "volume": "0.0"
    },
    {
      "name": "rise and hold",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "9.0",
      "seconds": "5.0",
      "volume": "0.0"
    },
    {
      "name": "decline",
      "temperature": "92.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "0.0",
      "seconds": "27.0",
      "volume": "0.0"
    }
  ]
}
  ,
{
  "title": "TurboBloom",
  "author": "Decent",
  "notes": "Dynamic bloom into pressure extraction. Based on the 'easy blooming' profile structure from Luca and Stephane and modified to primarily target high extraction grinders at high flow rates, typically ending around 3-4.5ml/s. Dial with ratio once grind is giving an ending flowrate in the range. Includes a significant temperature drop that reduces harshness (although the actual temperature drop is much less than programmed). By Joe D.",
  "beverage_type": "espresso",
  "id": "TurboBloom",
  "tank_temperature": "0.0",
  "target_weight": "39.0",
  "target_volume": "0.0",
  "target_volume_count_start": "2.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "preinfusion",
      "temperature": "86.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "8.0",
      "seconds": "20.0",
      "volume": "100.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.0"
      }
    },
    {
      "name": "dynamic bloom",
      "temperature": "70.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "0.0",
      "seconds": "40.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "under",
        "value": "2.2"
      }
    },
    {
      "name": "ramp",
      "temperature": "80.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "6.0000000000000036",
      "seconds": "4.0",
      "volume": "0.0"
    },
    {
      "name": "6 bar",
      "temperature": "77.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "6.0000000000000036",
      "seconds": "2.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "flow",
        "condition": "under",
        "value": "0.0"
      }
      ,
      "limiter": {
        "value": "4.5",
        "range": "1.0"
      }
    },
    {
      "name": "decline",
      "temperature": "77.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "2.999999999999999",
      "seconds": "40.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "4.5",
        "range": "1.0"
      }
    }
  ]
}
  ,
{
  "title": "TurboTurbo",
  "author": "Decent",
  "notes": "Non-blooming turbo shot profile intended primarily for high extraction grinders with ending flow of 3-4.5ml/s. The profile uses maximum fill rate in preinfusion as coarse grinds saturate easily and quickly. Dial with ratio once grind is giving an ending flowrate in the range. Includes a significant temperature drop that reduces harshness (although the actual temperature drop is much less than programmed).  By Joe D.",
  "beverage_type": "espresso",
  "id": "TurboTurbo",
  "tank_temperature": "0.0",
  "target_weight": "35.0",
  "target_volume": "0.0",
  "target_volume_count_start": "2.0",
  "legacy_profile_type": "settings_2c",
  "type": "advanced",
  "lang": "en",
  "hidden": "0",
  "version": "2",
  "steps": [
    {
      "name": "Fill",
      "temperature": "86.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "5.999999999999996",
      "seconds": "4.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "2.0"
      }
    },
    {
      "name": "PI",
      "temperature": "82.0",
      "sensor": "coffee",
      "pump": "flow",
      "transition": "fast",
      "flow": "5.0",
      "seconds": "20.0",
      "volume": "0.0"
      ,
      "exit": {
        "type": "pressure",
        "condition": "over",
        "value": "4.0"
      }
    },
    {
      "name": "rise and hold",
      "temperature": "77.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "fast",
      "pressure": "6.0",
      "seconds": "5.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "6.0",
        "range": "1.0"
      }
    },
    {
      "name": "decline",
      "temperature": "77.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "4.0",
      "seconds": "15.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "4.5",
        "range": "1.0"
      }
    },
    {
      "name": "hold",
      "temperature": "77.0",
      "sensor": "coffee",
      "pump": "pressure",
      "transition": "smooth",
      "pressure": "4.0",
      "seconds": "60.0",
      "volume": "0.0"
      ,
      "limiter": {
        "value": "4.5",
        "range": "1.0"
      }
    }
  ]
}
]