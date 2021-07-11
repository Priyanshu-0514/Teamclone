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


function Room(props){

     function handleMessage(){
         console.log("Message Box Is Opened.")
     }
     
     function copyURL(){
        let text = props.id;
		if (!navigator.clipboard) {
			let textArea = document.createElement("textarea")
			textArea.value = text
			document.body.appendChild(textArea)
			textArea.focus()
			textArea.select()
			try {
				document.execCommand('copy')
				alert("Link copied to clipboard!")
			} catch (err) {
				alert("Failed to copy")
			}
			document.body.removeChild(textArea)
			return
		}
		navigator.clipboard.writeText(text).then(function () {
			alert("Link copied to clipboard!")
		}, () => {
			alert("Failed to copy")
		})
     }

     function handleEndCall(){
        try {
			let tracks = this.localVideoref.current.srcObject.getTracks()
			tracks.forEach(track => track.stop())
		} catch (e) {}
		window.location.href = "/";
     }
     
     return (
        <div>
          <IconButton style={{ color: "#424242" }} onClick={props.handleVideo}>
              {props.video ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
          <IconButton style={{ color: "#424242" }} onClick={props.handleAudio}>
              {props.audio ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
          <IconButton style={{ color: "red" }} onClick={handleEndCall}>
          <CallEndIcon />
          </IconButton>
          <Button style={{backgroundColor: "#3f51b5",color: "whitesmoke",marginLeft: "20px",
          marginTop: "10px",width: "120px",fontSize: "10px"}} onClick={copyURL}>Copy invite link
          </Button>
        </div>
    );
}

export default Room;