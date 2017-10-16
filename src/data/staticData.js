export default {
  defaultId: 'pirate',
  maps:[
    {
      id: 'pirate',
      image: 'maps/map-pirate.jpg',
      title: 'Pirate map',
      data:{
        origWidth: 554,
        origHeight: 736,
        scale: 1.5
      },
      locations:[
        {
          title: 'Cyclone Turret',
          description: 'Yarr.. this be a cyclone turret',
          type: 'turret',
          turretId: 'turret1',
          percX: 0.1718,
          percY: 0.1185
        },
        {
          title: 'Compass Turret',
          description: 'This can hit targets in the south east',
          type: 'turret',
          turretId: 'turret2',
          percX: 0.761,
          percY: 0.8449,
          calibration: {}
        },
        {
          title: 'X Marks the Spot',
          description: 'This location can be reached by both turrets',
          type: 'location',
          percX: 0.45,
          percY: 0.53,
          calibration: {
            turret1: {
              rotX:20,
              rotY:30
            },
            turret2: {
              rotX:45,
              rotY:60
            }
          }
        },
        {
          title: 'SKULL ROCK',
          description: 'Easy to hit from turret1',
          type: 'location',
          percX: 0.42,
          percY: 0.21,
          calibration: {
            turret1: {
              rotX:50,
              rotY:10
            }
          }
        },
        {
          title: 'Pirate shit',
          description: 'Easy to hit from turret2',
          type: 'location',
          percX: 0.7971,
          percY: 0.5862,
          calibration: {
            turret2: {
              rotX:50,
              rotY:10
            }
          }
        }
      ]
    },
    {
      id: 'office',
      image: 'maps/office-01.png',
      title: 'The Office',
      data:{
        origWidth: 1000,
        origHeight: 1400,
        scale: .75
      },
      locations: [
        {
          title: 'turret',
          type: 'turret',
          turretId: 'turret1',
          percX: 0.5,
          percY: 0.56,
          calibration: {}
        },
        {
          title: 'conference room 1',
          type: 'location',
          percX: 0.26,
          percY: 0.63,
          calibration: {
            turret1: {
              rotX:-45,
              rotY:5
            }
          }
        },
        {
          title: 'conference room 2',
          type: 'location',
          percX: 0.25,
          percY: 0.5,
          calibration: {}
        },
        {
          title: 'conference room 3',
          type: 'location',
          percX: 0.26,
          percY: 0.38,
          calibration: {}
        },
        {
          title: 'sink',
          type: 'location',
          percX: 0.3,
          percY: 0.17,
          calibration: {}
        },
        {
          title: 'copier',
          type: 'location',
          percX: 0.78,
          percY: 0.27,
          calibration: {}
        }
      ]
    }
  ]
};