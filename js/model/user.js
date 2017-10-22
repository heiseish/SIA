//@flow
'use-strict';
export default  { //each user path is differentiated by username, which is unique
  "username": "yinghang", //unique key
  "currentlyEnrolled": true,
  "sessions": {
    "21 July 2017" : {
      "session" : 1,
      "location": "gym",
      "attendance": "missing",
      "date": "21 July 2017",
      "time": "11:00 - 13:00"
      // etc, to be added along the way
    },
    "23 July 2017": {
      "session" : 2,
      "location": "gym",
      "attendance": "completed",
      "date": "23 July 2017",
      "time": "11:00 - 13:00"
      //..
    },
    "28 July 2017": {
      "session" : 3,
      "location": "gym",
      "date": "28 July 2017",
      "time": "11:00 - 13:00",
      "attendance": "need_verification",
      "confirmedParty": "user"

    }
    //...
  },
  "email": "gg@gmail.com",
  "trainer": {
    "name": "Isaac Chew",
    "id": "chewchew",
    "picture": "https://s-media-cache-ak0.pinimg.com/736x/5d/ec/40/5dec4023ea476dc77ea05ac73259852f.jpg"
  },
  "nutritionList": {
    "morning": {
      "carrot": {
        "name": "carrot",
        "checked": false
      },
      "pho": {
        "name": "pho",
        "checked": false
      }
    },
    "lunch": {
      "coffee": {
        "name": "coffee",
        "checked": false
      },
      "weed": {
        "name": "weed",
        "checked": false
      }
    },
    "dinner": {
      "coffee": {
        "name": "coffee",
        "checked": false
      },
      "weed": {
        "name": "weed",
        "checked": false
      }
    }

  },



}
