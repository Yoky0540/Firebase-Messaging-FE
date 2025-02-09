import axios from "axios";

export const pushMessageByToken = async (
  title: string,
  body: string,
  deviceToken: string
) => {
  const url = `http://localhost:3000/api/firebase/send-notification`;
  const data = {
    title,
    body,
    deviceToken,
  };

  try {
    const result = await axios.post(url, data);
    if (result.status === 200) {
      console.log("push message to token: ", deviceToken);
    }
  } catch (error) {
    console.log(error);
  }
};

export const subscribeToTopic = async (deviceToken: string, topic: string) => {
  const url = `http://localhost:3000/api/firebase/subscribe-topic`;
  const data = {
    deviceToken,
    topic,
  };

  try {
    const result = await axios.post(url, data);
    if (result.status === 200) {
      console.log("success subscribe to topic: ", topic);
    }
  } catch (error) {
    console.log(error);
  }
};

export const unSubscribeToTopic = async (deviceToken: string, topic: string) => {
  const url = `http://localhost:3000/api/firebase/unsubscribe-topic`;
  const data = {
    deviceToken,
    topic,
  };

  try {
    const result = await axios.post(url, data);
    if (result.status === 200) {
      console.log("success unsubscribe to topic: ", topic);
    }
  } catch (error) {
    console.log(error);
  }
};

export const pushMessageByTopic = async (
    title: string,
    body: string,
    topic: string
  ) => {
    const url = `http://localhost:3000/api/firebase/send-notification-by-topic`;
    const data = {
      title,
      body,
      topic,
    };
  
    try {
      const result = await axios.post(url, data);
      if (result.status === 200) {
        console.log("push message to topic: ", topic);
      }
    } catch (error) {
      console.log(error);
    }
  };
