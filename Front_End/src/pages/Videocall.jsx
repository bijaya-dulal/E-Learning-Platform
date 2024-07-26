// import React, { useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';

// const VideoCall = () => {
//   const { roomID: roomIDFromParams } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getUrlParams = (url) => {
//       let urlStr = url.split('?')[1];
//       const urlSearchParams = new URLSearchParams(urlStr);
//       return Object.fromEntries(urlSearchParams.entries());
//     };

//     // Generate a Token by calling a method.
//     // @param 1: appID
//     // @param 2: serverSecret
//     // @param 3: Room ID
//     // @param 4: User ID
//     // @param 5: Username
//     const roomID = roomIDFromParams || getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
//     const userID = Math.floor(Math.random() * 10000) + "";
//     const userName = "userName" + userID;
//     const appID = 1983781798;
//     const serverSecret = "5afeb59a76f86324138749997e959627";
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zp.joinRoom({
//       container: document.querySelector("#video-call-container"),
//       sharedLinks: [{
//         name: 'Personal link',
//         url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
//       }],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.VideoConference,
//       },
//       turnOnMicrophoneWhenJoining: false,
//       turnOnCameraWhenJoining: false,
//       showMyCameraToggleButton: true,
//       showMyMicrophoneToggleButton: true,
//       showAudioVideoSettingsButton: true,
//       showScreenSharingButton: true,
//       showTextChat: true,
//       showUserList: true,
//       maxUsers: 2,
//       layout: "Auto",
//       showLayoutButton: false,
//     });
//   }, [roomIDFromParams]);

//   return (
//     <div>
//       <div id="video-call-container" style={{ width: '100vw', height: '100vh' }}></div>
//       <div>
//         <Link to="/">Home</Link>
//         <button onClick={() => navigate(-1)}>Go Back</button>
//       </div>
//     </div>
//   );
// };

// export default VideoCall;

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VideoCall = () => {
  const { roomID: roomIDFromParams } = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUrlParams = (url) => {
      let urlStr = url.split('?')[1];
      const urlSearchParams = new URLSearchParams(urlStr);
      return Object.fromEntries(urlSearchParams.entries());
    };

    const fetchUserDetails = async () => {
      try {
        const sessionId = sessionStorage.getItem('session_id'); // Retrieve session ID from storage
        const response = await axios.get('/user/', {
          headers: {
            'Authorization': `Session ${sessionId}`, // Pass session ID in headers or as needed
          },
        });
        setUserName(response.data.username); // Set the fetched username
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();

    const initializeVideoCall = () => {
      const roomID = roomIDFromParams || getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
      const userID = Math.floor(Math.random() * 10000) + "";
      const appID = 1983781798;
      const serverSecret = "5afeb59a76f86324138749997e959627";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: document.querySelector("#video-call-container"),
        sharedLinks: [{
          name: 'Personal link',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
        }],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        turnOnMicrophoneWhenJoining: false,
        turnOnCameraWhenJoining: false,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTextChat: true,
        showUserList: true,
        maxUsers: 2,
        layout: "Auto",
        showLayoutButton: false,
      });
    };

    if (userName) {
      initializeVideoCall(); // Initialize video call after fetching the username
    }
  }, [roomIDFromParams, userName]);

  return (
    <div>
      <div id="video-call-container" style={{ width: '100vw', height: '100vh' }}></div>
      <div>
        <Link to="/">Home</Link>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};

export default VideoCall;
