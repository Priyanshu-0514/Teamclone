import React, { useState } from 'react';
import Room from './Room';
import { useHistory } from "react-router-dom";
import Peer from 'peerjs';

function VideoRoom() {
  
    const [room,setRoom] = useState(false);
    const [myId,setmyId] = useState('');
    const [audio,setAudio] = useState(true);
    const [video,setVideo] = useState(true);

    let history = useHistory();

    let meetId = history.location.pathname.replace("/",'');
    console.log(meetId);
    
    function handleAudio(){
      setAudio(!audio);
      window.localStream.getAudioTracks()[0].enabled = !window.localStream.getAudioTracks()[0].enabled;
    }

    function handleVideo(){
      setVideo(!video);
      window.localStream.getVideoTracks()[0].enabled = !window.localStream.getVideoTracks()[0].enabled;
    }

    

if(!room){
     let peer = new Peer({
        
        host: 'peerjsserver01.herokuapp.com',
      port: 443,
      path: '/',
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
          // myVideo.muted = true;
          setRoom(true);
          setmyId(id);
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          }).then(stream => {
         
            // this local video my steam
            window.localStream = stream;
              console.log(id);
            addVideoStream(myVideo, stream);
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
  peer.on('connection', function(conn) { 
    console.log('connected');

   });

  peer.on('error', function(err){
    alert(err.message);
    // Return to step 2 if error occurs
    step2();
  });

  function step3 (call) {
   let peerArray = [];
      // Wait for stream on the call, then set peer video display
      call.on('stream', function(stream){
        if(!peerArray.includes(call.id)){
        console.log('Waiting');
        const myVideo = document.createElement('video');
        myVideo.classList.add(peer.id);
        addVideoStream(myVideo, stream);
        peerArray.push(call.id);
        }
      });

    // UI stuff
    // window.existingCall = call;
    call.on('close', step2);
    
  }

  function step2 () {
    console.log("step2 called.");
    var myObj = document.getElementsByClassName(peer.id);
    myObj.remove();
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
               <Room id={myId} audio={audio} video={video} handleAudio={handleAudio} handleVideo={handleVideo} />
            </div>
    );
              
}

export default VideoRoom;