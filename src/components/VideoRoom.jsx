import React, { useState } from 'react';
import Axios from 'axios';
import Room from './Room';
import { useHistory } from "react-router-dom";
import Peer from 'peerjs';
import { LaptopWindows } from '@material-ui/icons';



function VideoRoom() {
    const [room,setRoom] = useState(false);
    const [videoList,setVideoList] = useState([]);
    const [media,setmedia] = useState(null);
    const [myId,setmyId] = useState('');
    const [video,setVideo] = useState(true);
    const [audio,setAudio] = useState(true);
    let history = useHistory();

    let meetId = history.location.pathname.replace("/",'');
    console.log(meetId);
    
    function handleAudio(){
      setAudio(!audio);
      // window.localStream.getAudioTracks()[0]= audio;
    }

    function handleVideo(){
      setVideo(!video);
    }


if(!room){
    let peer = new Peer({
        
        host: 'localhost',
      port: 9000,
      path: '/myapp',
      key:'peerjs'
    });
    
    

    peer.on('open', (id) => { 

      // video call code.....................................
       console.log("Successfully connected with Peer Server.");
        addSelfVideo(id);
        
        
    })
     
    function addSelfVideo(id){
          // Call a peer, providing our mediaStream
          const myVideo = document.createElement('video');
          myVideo.muted = true;
          setRoom(true);
          setmyId(id);
          navigator.mediaDevices.getUserMedia({
            video: video,
            audio: audio
          }).then(stream => {
         
            // this local video my steam
            window.localStream = stream;
              console.log(id);
            // addVideoStream(myVideo, stream);
            if(meetId != "newRoom"  && !room){
              setRoom(true);
              var call = peer.call(meetId, window.localStream);
              step3(call);
            }
          });
  
  
        // video call code.....................................
    }

   // Receiving a call
   peer.on('call', function(call){
    // Answer the call automatically (instead of prompting user) for demo purposes

    call.answer(window.localStream);
    step3(call);
  });

  peer.on('error', function(err){
    alert(err.message);
    // Return to step 2 if error occurs
    step2();
  });

  function step3 (call) {

      // Wait for stream on the call, then set peer video display
      call.on('stream', function(stream){
        console.log('Waiting');
        const myVideo = document.createElement('video');
        addVideoStream(myVideo, stream);
      });

    // UI stuff
    window.existingCall = call;
    call.on('close', step2);
    
  }

  function step2 () {
    setRoom(false);
  }
  
function addVideoStream(video, stream) {
video.srcObject = stream;
video.addEventListener('loadedmetadata', () => {
  video.play()
})
var doc = document.getElementById("videoClass");
doc.appendChild(video);
}
}
    return (
            <div id="videoClass">
               <Room id={myId} video={video} audio={audio} handleAudio={handleAudio} handleVideo={handleVideo}/>
            </div>


    );
}

export default VideoRoom;