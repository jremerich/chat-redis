import { useContext } from 'react';
import { MessageContext } from '../../../../App';
import './styles.css';

function MessageBox({ time, from, content }) {
  const { users: { user } } = useContext(MessageContext);
  let messageClass = ' from-others';

  if (from === user.id) {
    messageClass = ' mine';
  } else if (from === 'SYSTEM') {
    messageClass = ''
  }

  const date = new Date(time);
  const formatedTime = date.toLocaleTimeString();

  return (
    <div className={`message${messageClass}`}>
      <p className="user">{ from }</p>
      <p className="content">{ content }</p>
      <p className="time">{ formatedTime }</p>
    </div>
  );
}

export default MessageBox;
