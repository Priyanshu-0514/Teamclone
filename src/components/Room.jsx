import React, { useState ,useEffect } from 'react';
import {IconButton, Badge, Input, Button} from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import ScreenShareIcon from '@material-ui/icons/ScreenShare'
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare'
import CallEndIcon from '@material-ui/icons/CallEnd'
import ChatIcon from '@material-ui/icons/Chat'

function Room(){
      
     const [video,setVideo] = useState(false);
     const [audio,setAudio] = useState(false);
    
     function handleAudio() {
         setAudio(!audio);
     } 

     function handleVideo() {
         setVideo(!video);
     }
     
     function copyURL(){
         console.log("URL Copied.")
     }
     return (
        <div>
          <IconButton style={{ color: "#424242" }} onClick={handleVideo}>
              {video === true ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
          <IconButton style={{ color: "#424242" }} onClick={handleAudio}>
              {audio === true ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
          <IconButton style={{ color: "red" }} onClick={handleAudio}>
          <CallEndIcon />
          </IconButton>
          <IconButton style={{ color: "green" }} onClick={handleAudio}>
          <ChatIcon />
          </IconButton>
          <Button style={{backgroundColor: "#3f51b5",color: "whitesmoke",marginLeft: "20px",
          marginTop: "10px",width: "120px",fontSize: "10px"}} onClick={copyURL}>Copy invite link</Button>
        </div>
    );
}

export default Room;