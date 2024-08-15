//Inbox.js
import React, { useEffect, useState } from 'react';
import { signOut } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';
import { ref, onValue, set } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js';
import { auth, database } from '/TextboX/FireBaseConfig/firebaseConfig.js';


function Inbox() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(Object.values(data));
      }
    });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const messagesRef = ref(database, `messages/${auth.currentUser.uid}_${selectedUser.email}`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMessages(Object.values(data));
        }
      });
    }
  }, [selectedUser]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = () => {
    if (newMessage && selectedUser) {
      const messageId = new Date().toISOString();
      set(ref(database, `messages/${auth.currentUser.uid}_${selectedUser.email}/${messageId}`), {
        sender: auth.currentUser.email,
        message: newMessage,
        timestamp: messageId
      });
      setNewMessage('');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
      <h1>Inbox</h1>
      <div>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.email} onClick={() => handleSelectUser(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedUser && (
        <div>
          <h2>Chat with {selectedUser.name}</h2>
          <div>
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === auth.currentUser.email ? 'message-sent' : 'message-received'}>
                {msg.message}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default Inbox;
