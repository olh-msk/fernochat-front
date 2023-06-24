import React from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';

const Chats = () => {
  const { user } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Fernochat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectId="3152784b-f4bf-4161-91f8-d7c01fc98df3"
        userName="."
        userSercret="."
      />
    </div>
  );
};

export default Chats;
