
import React from 'react';

function App() {
  let dateString = new Date().toLocaleString().split(',').find(() => true);
  return (
    <div>
      <header> Team Clone</header>
      <form id="container1">
      <button type="submit" name="" id="button1">Create New Meeting</button>
      <p>-or-</p>
      <input type="text" name="" id="" placeholder="join by code"></input>
      <button type="submit">Enter</button>
      </form>
      <footer> {dateString} </footer>
    </div>
  );
}

export default App;
