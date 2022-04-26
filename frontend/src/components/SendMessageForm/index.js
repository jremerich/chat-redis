import './styles.css';

import { useContext, useState } from 'react';
import socket from '../../service/socket';
import { room } from '../../configs';
import { MessageContext } from '../../App';

export default function SendMessageForm() {
  const [content, setContent] = useState('');
  const { setMessages } = useContext(MessageContext);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const id = Date.now();
    const payload = { id, room, content }
    socket.emit('say', JSON.stringify(payload), setMessages);
    setContent('');
  }

  return (
    <form onSubmit={(e) => handleSendMessage(e)} className="chat-message">
      <input value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={(e) => handleSendMessage(e)}>Send</button>
    </form>
  );
}
