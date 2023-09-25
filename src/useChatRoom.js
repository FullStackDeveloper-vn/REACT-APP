import { useEffect } from "react";
import createConnection from "./chat";
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {

  const onMessage = useEffectEvent(onReceiveMessage);

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    }
    const connection = createConnection(options)
    connection.connect()
    connection.on('message', (msg) => {
      // showNotification('New message' + msg)
      onMessage(msg)
    })
    return () => connection.disconnect()

  }, [roomId, serverUrl])

};
