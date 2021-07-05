import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Webcam from "react-webcam";


function VideoRoom() {
    const WebcamComponent = () => <Webcam />;
   

    const myVideo = document.createElement('video');
    myVideo.muted = true;
    useEffect(() => {
        // var peer = new Peer(); 
           
    }, []);


    return (
        <div>
            {/* <Row id="main" className="flex-container" style={{ margin: 0, padding: 0 }}>
                <video id="my-video" ref={this.localVideoref} autoPlay muted style={{
                    borderStyle: "solid", borderColor: "#bdbdbd", margin: "10px", objectFit: "fill",
                    width: "100%", height: "100%"
                }}></video>
            </Row> */}
        </div>


    );
}

export default VideoRoom;