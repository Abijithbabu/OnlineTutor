import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import ResponsiveDialog from './Dialog';

export default function LiveMeeting() {

   const data = useSelector(state => state?.live)
   if (!data) return
   const { roomID, author, userID, username, participants } = data

   const role =
      userID === author
         ? ZegoUIKitPrebuilt.Host
         : participants?.includes(userID)
            ? ZegoUIKitPrebuilt.Audience
            : null;

   if (!role) {
      return <ResponsiveDialog id={roomID} />
   }

   let sharedLinks = [{
      name: 'Share Joining link',
      url: window.location.protocol + '//' + window.location.host + '/#/live/' + roomID
   }];

   // generate Kit Token
   const appID = parseInt(process.env.REACT_APP_APPID)
   const serverSecret = process.env.REACT_APP_SERVER_SECRET
   const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, username);

   // start the call
   let myMeeting = async (element) => {
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp?.joinRoom({
         container: element,
         scenario: {
            mode: ZegoUIKitPrebuilt.LiveStreaming,
            config: {
               role,
            },
         },
         sharedLinks,
         showPreJoinView: false,
         showRemoveUserButton:true
      });
   };

   return (
      <>
         {myMeeting && <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: '100vw', height: '100vh' }}
         ></div>}
      </>
   );
}