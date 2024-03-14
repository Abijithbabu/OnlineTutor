import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import ResponsiveDialog from './Dialog';
import { sendNotification } from '../../../utils/api';

function generateToken(tokenServerUrl, userID) {
   return fetch(
      `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
      {
         method: "GET",
      }
   ).then((res) => res.json());
}

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

   // start the call
   let myMeeting = async (element) => {
      generateToken("https://nextjs-token.vercel.app/api", userID).then(
         (res) => {
            const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
               1484647939,
               res.token,
               roomID,
               userID,
               username
            );
            // create instance object from token
            const zp = ZegoUIKitPrebuilt.create(token);
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
               onLiveStart: () => sendNotification(roomID)
            });
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