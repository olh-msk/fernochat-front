import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  console.log(user);

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    if (!user) {
      history.push('/');
      return;
    }

    axios
      .get('https://api.chatengine.io/users/me', {
        headers: {
          'project-id': '3152784b-f4bf-4161-91f8-d7c01fc98df3',
          'user-name': user.email,
          'user-secret': user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append('avatar', avatar, avatar.name);

          axios
            .post('https://api.chatengine.io/users', formdata, {
              headers: {
                'private-key': '5e587896-1b59-4f09-ad35-6e44644bcb34',
              },
            })
            .then(() => setLoading(false).catch((error) => console.log(error)));
        });
      });
  }, [user, history]);

  if (!user || loading) return 'Loading';

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
        projectID="3152784b-f4bf-4161-91f8-d7c01fc98df3"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
