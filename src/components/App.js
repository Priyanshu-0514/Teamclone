
import React from 'react';
import Home from './Home';
import VideoRoom from './VideoRoom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path="/:url" component={VideoRoom} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
