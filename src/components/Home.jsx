import React, { useState } from 'react';
import Axios from 'axios';
import Room from './Room';
import { useHistory } from "react-router-dom";
// The usage -
import Peer from 'peerjs';

function Home(){
    let dateString = new Date().toLocaleString().split(',').find(() => true);

    let history = useHistory();

    const [link,setLink] = useState('');
    
    const handleChange = (event) => {
      console.log(event.target.value);
      setLink(event.target.value);
    }
    const createRoom = () => {
      history.push(
        `/${"newRoom"}`);
        }
     
    const joinRoom = () => {
      history.push(
        `/${link}`
      );
    }

    return (
      <div id="homePage">
        <header> Team Clone</header>
        <div className="container">
        {/* <form id="container1"> */}
        <button  name="" id="button1" onClick={createRoom}>Create New Meeting</button>
        <p>-or-</p>
        <input type="text" name="" id="" placeholder="join by code" onChange={handleChange}></input>
        <button type="submit" id="button2" onClick={joinRoom} >Enter</button>
        </div>
        {/* </form> */}
        <footer> {dateString} </footer>
      </div>
    );
}

export default Home;