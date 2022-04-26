import { useEffect, useRef } from 'react';
import MessageBox from './components/MessageBox';
import './styles.css';

function MessageContainer({ messages }) {
  const messagesEndRef = useRef(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  });
  return (
    <div className="chat-content">
      {messages.map((message) => (
        <MessageBox key={message.id} time={message.id} from={message.from} content={message.content} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageContainer;
