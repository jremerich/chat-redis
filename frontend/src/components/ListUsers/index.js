import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { MessageContext } from '../../App';
import { useContext } from 'react';

function ListUsers() {
  const { users } = useContext(MessageContext);
  console.log('users: ', users);
  return (
    <div className="list-users">
      <h3>There are {users.count} players here</h3>
      <ul>
        {users.users.map((userList) => (
            <li key={userList} className={userList === users.user.id ? 'you' : false}>
              { userList === users.user.id && (<FontAwesomeIcon icon={faUser} />) }
              { userList }
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ListUsers;
