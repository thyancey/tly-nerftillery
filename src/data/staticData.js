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
        scale: 2
      },
      locations:[
        {
          title: 'cyclone',
          percX: 0.17,
          percY: 0.11
        },
        {
          title: 'compass',
          percX: 0.75,
          percY: 0.84
        },
        {
          title: 'x',
          percX: 0.45,
          percY: 0.53
        },
        {
          title: 'skull rock',
          percX: 0.42,
          percY: 0.21
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
          "title": "turret",
          "percX": 0.5,
          "percY": 0.56
        },
        {
          "title": "conference room 1",
          "percX": 0.26,
          "percY": 0.63
        },
        {
          "title": "conference room 2",
          "percX": 0.25,
          "percY": 0.5
        },
        {
          "title": "conference room 3",
          "percX": 0.26,
          "percY": 0.38
        },
        {
          "title": "sink",
          "percX": 0.3,
          "percY": 0.17
        },
        {
          "title": "copier",
          "percX": 0.78,
          "percY": 0.27
        }
      ]
    }
  ]
};