import { useState } from "react";
import useChatRoom from "./useChatRoom";
import showNotification from "./notifications";

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('htttps://localhost:1234')

  useChatRoom({
    roomId: roomId, serverUrl: serverUrl,
    onReceiveMessage(msg) {
      showNotification(' New Mesaage ..' + msg)
    }
  })

  return (
    <>
      <label>
        Server Url :
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1> Welcome to the {roomId} room ! </h1>
    </>
  )
};
