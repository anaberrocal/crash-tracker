import React, { useState } from 'react';
import './App.css';
import ReactMapGL from 'react-map-gl';
import crashTracker from './../assets/crashTracker.png';
import Predictions from '../util/Predictions';


function App() {
  const [viewport, setViewport] = useState({
    latitude: 30.3209,
    longitude: -81.7287,
    width: "100vw",
    height: "100vh",
    zoom: 12,
  });

  return (
    <div className="App">
      <header className="header">
        <div><img src={crashTracker} alt="Crash Tracker icon" className="icon"/> <strong>Crash</strong>Tracker</div>
        <div className="county">Duval County's Traffic Tracker</div>
      </header>
      <div>
      <ReactMapGL 
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/anaberrocal/ckbh2i68i03xa1ik9wnzjrwnq"
      onViewportChange = {viewport => {
        setViewport(viewport);
      }}
      >
        <Predictions/>
      </ReactMapGL>
      </div>
    </div>
  );
}

export default App;
