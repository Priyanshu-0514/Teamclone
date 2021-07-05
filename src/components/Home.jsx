import React, { useState } from 'react';
import Axios from 'axios';
import Room from './Room';
// The usage -
import Peer from 'peerjs';

function Home(){
    let dateString = new Date().toLocaleString().split(',').find(() => true);

    const [room,setRoom] = useState(false);
    const [videoList,setVideoList] = useState([]);
    const [media,setmedia] = useState(null);
    

  
    const getRoom = () => {
         let myPeer = new Peer(undefined, {
        
          host: 'localhost',
        port: 9000,
        path: '/myapp',
        key:'peerjs'
      });
      myPeer.on('open', (id) => {
        console.log("Successfully connected with Peer Server.");
        console.log(id);
        // Call a peer, providing our mediaStream
        const myVideo = document.createElement('video');
        myVideo.muted = true;
        setRoom(true);
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        }).then(stream => {
          addVideoStream(myVideo, stream);
            // peer.call()
            
        });

      
        
      

    })
    }

    
function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  var doc = document.getElementById("videoClass");
  doc.appendChild(video);
}



    if(room) {
        // <video id="video" src={videoObject} autoplay="autoplay" />

        return (
          <div id="videoClass">
             <Room />
          </div>
        );

      }

    return (
      <div id="homePage">
        <header> Team Clone</header>
        <div className="container">
        {/* <form id="container1"> */}
        <button  name="" id="button1" onClick={getRoom}>Create New Meeting</button>
        <p>-or-</p>
        <input type="text" name="" id="" placeholder="join by code"></input>
        <button type="submit">Enter</button>
        </div>
        {/* </form> */}
        <footer> {dateString} </footer>
      </div>
    );
}

export default Home;