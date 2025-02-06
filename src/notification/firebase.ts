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

const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);

  if(permission === "granted"){
    console.log("Notification permission granted");
    await getToken(messaging, {
      vapidKey:
        "BPE5Ov7q7SyH7Dm6vPB9qS4xRgJCi6yNTiDC1RT3iuj91jq1fX5SpU6_aWXhcMOdct39KKr8xX_Y7YIhnqtgs1g",
    }).then((token) => {
      console.log(token);
    }).catch((err) => {
      console.log(err);
    });
  }

};

export { generateToken , messaging };
