import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, receiveMessage, sendMessage } from '../../Redux/Reducers/chatSlice';
import socket from '../../socket';
import "./chat.css"

const Chat = ({ receiverId }) => {
  const dispatch = useDispatch();
  const { messages, status, error } = useSelector((state) => state.chat);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchMessages(receiverId));

    socket.on('newMessage', (newMsg) => {
      dispatch(receiveMessage(newMsg));
    });

    socket.emit('registerUser', receiverId);

    return () => {
      socket.off('newMessage');
    };
  }, [dispatch, receiverId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessage({ receiverId, message }));
      setMessage('');
    }
  };

  if (status === 'loading') return <p>Loading messages...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='chat'>
      {messages.length > 0 ? (
        messages.map((msg) => (
          <div key={msg._id}>{msg.message}</div>
        ))
      ) : (
        <p>No messages yet. Start the conversation!</p>
      )}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}> Send Message</button>
    </div>
  );
};

export default Chat;
