import { useEffect, useState } from 'react'
import { MessagePayload, onMessage } from 'firebase/messaging'
import { Button, Card, Modal, Switch, Typography } from 'antd'

import { generateToken, messaging } from './notification/firebase'
import { pushMessageByToken, pushMessageByTopic, subscribeToTopic, unSubscribeToTopic } from './api/handleApi'

import './App.css'

const { Title, Text } = Typography;
const topic = "first-topic";

function App() {
  const [fcmToken, setFCMToken] = useState("")

  const [notifyMessage, setNotifyMessage] = useState<MessagePayload>()
  const [isActive, setIsActive] = useState(false)

  const [topicMessage, setTopicMessage] = useState<MessagePayload>()
  const [isActiveTopic, setIsActiveTopic] = useState(false)
  const [isSubScribe, setIsSubScribe] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendMessage = async () => {
    await pushMessageByToken("title From Token", "body From Token", fcmToken).then(() => {
      setIsModalOpen(true)
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleConnectFirebase = async () => {
    const token = await generateToken();
    if (token) {
      setFCMToken(token)
      setIsActive(true)
      handleCallOnMessage()
      return;
    }
    setIsModalOpen(true)
  }

  const handleCallOnMessage = () => {
    onMessage(messaging, (payload) => {
      console.log(payload);
      if (isSubScribe) {
        setTopicMessage(payload);
      } else {
        setNotifyMessage(payload);
      }
      setIsModalOpen(true)
    });
  }

  const handleSendMessageTopic = async () => {
    await pushMessageByTopic("title form topic", "body from topic", topic).then(() => {
      setIsModalOpen(true)
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleSwitch = () => {
    setIsSubScribe(!isSubScribe)
  }

  useEffect(() => {
    if (!isSubScribe) {
      unSubscribeToTopic(fcmToken, topic).then(() => {
        handleCallOnMessage()
      })
      return;
    }
    setIsActiveTopic(true)
    subscribeToTopic(fcmToken, topic).then(() => {
      handleCallOnMessage()
    })
  }, [isSubScribe])

  useEffect(() => {
    handleConnectFirebase();
  }, [])

  return (
    <>
      <Title level={3}>Vite React Firebase Messaging</Title>
      <Card title="Firebase Messaging" bordered={true} style={{ width: 500, borderRadius: 10 }}>
        <Text strong>{notifyMessage?.notification?.body ?? "Something went wrong"}</Text>
        <br />
        <Button type="primary" onClick={handleSendMessage}>
          {isActive ? "Try to send message" : "Error"}
        </Button>

      </Card>
      <br />
      <Switch onChange={handleSwitch} checked={isSubScribe} />
      <Text strong>Subscribe to topic</Text>

      <Card title="Firebase Messaging By Topic" bordered={true} style={{ width: 500, borderRadius: 10 }}>
        <Title level={4}>Topic: {topic}</Title>
        <Text strong>{topicMessage?.notification?.body ?? "Something went wrong"}</Text>
        <br />
        <Button type="primary" onClick={handleSendMessageTopic} >
          {isActiveTopic ? "send message to topic" : "Error"}
        </Button>

      </Card>

      <Modal title={(isSubScribe ? topicMessage?.notification?.title : notifyMessage?.notification?.title) ?? "Error"} open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
        <Text strong>{(isSubScribe ? topicMessage?.notification?.body : notifyMessage?.notification?.body) ?? "Something went wrong"}</Text>
      </Modal>

    </>
  )
}

export default App
