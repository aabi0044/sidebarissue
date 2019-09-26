import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

admin.initializeApp();


exports.newSubscriberNotification = functions.firestore
    .document('winners/{winnersId}')
    .onCreate(async (event:any) => {

    const data = event.data();

    const userId = data.id;
    const name= data.name;
  

    // Notification content
    const payload = {
      notification: {
          title: 'Winner of the week',
          body: `congratulation ${name}, you won lottery this week`,
          icon:'../src/bluelogo.png'
     
      }
    }

    // ref to the device collection for the user
    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', userId)


    // get the user's tokens and send notifications
    const devices = await devicesRef.get();

     let tokens:Array<any>=[];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push( token )
    })

    return admin.messaging().sendToDevice(tokens, payload)

});