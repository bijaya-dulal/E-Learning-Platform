import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const VideoCall = () => {
  const { roomID: roomIDFromParams } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUrlParams = (url) => {
      let urlStr = url.split('?')[1];
      const urlSearchParams = new URLSearchParams(urlStr);
      return Object.fromEntries(urlSearchParams.entries());
    };

    // Generate a Token by calling a method.
    // @param 1: appID
    // @param 2: serverSecret
    // @param 3: Room ID
    // @param 4: User ID
    // @param 5: Username
    const roomID = roomIDFromParams || getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = "userName" + userID;
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
  }, [roomIDFromParams]);

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
