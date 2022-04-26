import { useCallback, useEffect, useState, createContext, useReducer } from 'react';
import './App.css';
import MessageContainer from './components/MessageContainer';
import SendMessageForm from './components/SendMessageForm';
import ListUsers from './components/ListUsers';

import socket from './service/socket';
import { room } from './configs';

export const MessageContext = createContext();

function reducerMessages(state, message) {
  return [...state, message];
}

export default function App() {
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState({ count: 0, users: [], user: false });
  const [messages, setMessages] = useReducer(reducerMessages, []);

  const handleJoin = useCallback((data) => {
    setJoined(true);
    setUsers(JSON.parse(data));
    const welcomeMessage = {
      id: Date.now(),
      from: "SYSTEM",
      content: "Welcome aboard!!"
    };
    setMessages(welcomeMessage);
  }, []);

  const handleConnect = useCallback((data) => {
    const userName = 'Zero';
    socket.emit('join-room', { room, userName }, handleJoin);
  }, [handleJoin]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", handleConnect);
      socket.on("chat", setMessages);
      return () => {
        socket.off("connect", handleConnect);
        socket.off("chat", setMessages);
      };
    }
  }, [joined, handleConnect]);

  return (
    <MessageContext.Provider value={{ messages, setMessages, users }}>
      <div className="App">
        <div className="App-header">
          <p>Redis Chat{ joined ? (<span className='status on'>On</span>) : (<span className='status off'>Off</span>) }</p>
        </div>
        <div className="content">
          <div className="chatting">
            <MessageContainer messages={messages} />
            <SendMessageForm />
          </div>
          <ListUsers />
        </div>
      </div>
    </MessageContext.Provider>
  );
}
