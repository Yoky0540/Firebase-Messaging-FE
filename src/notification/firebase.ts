import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_Key,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const generateToken = async () : Promise<string | null> => {
  const permission = await Notification.requestPermission();

  let fcmToken: string | null = null;
  if(permission === "granted"){
    await getToken(messaging, {
      vapidKey:import .meta.env.VITE_VAPID_KEY,
    }).then((token) => {
      fcmToken =  token;
    }).catch(() => {
      fcmToken =  null
    });
  }

  return fcmToken;

};

export { generateToken , messaging };
