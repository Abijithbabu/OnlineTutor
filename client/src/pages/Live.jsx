import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { courseDetails } from '../utils/api';
import { useSelector } from 'react-redux';
import ResponsiveDialog from '../components/general/live/Dialog';

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function Live() {

  const user = useSelector(state => state?.data?.user)
  const [course, setCourse] = React.useState()
  const roomID = getUrlParams().get('roomID')

  const fetchData = async () => await courseDetails(roomID).then(res => setCourse(res))

  React.useEffect(() => {
    roomID && fetchData()
  }, [roomID])

  const role =
    user?._id === course?.author
      ? ZegoUIKitPrebuilt.Host
      : course?.subscribers?.includes(user?._id)
        ? ZegoUIKitPrebuilt.Audience
        : null;

  if (!role) {
    return <ResponsiveDialog id={roomID}/>
  }

  let sharedLinks = [{
    name: 'Share Joining link',
    url: window.location.protocol + '//' + window.location.host + '/#/live/' + '?roomID=' + roomID
  }];

  // generate Kit Token
  const appID = process.env.REACT_APP_APPID
  const serverSecret = process.env.REACT_APP_SERVER_SECRET
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, user?._id, user?.name);

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
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}