import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const subscribeToTopic = functions.https.onCall(
    async (data, context) => {
        alert(data)
      await admin.messaging().subscribeToTopic(data.token, data.topic);
  
      return `subscribed to ${data.topic}`;
    }
  );
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
