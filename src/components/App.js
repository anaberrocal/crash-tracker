import React, { useState } from 'react';
import './App.css';
import ReactMapGL, { Marker } from 'react-map-gl';
import uuid from 'uuid';
import crashTracker from './../assets/crashTracker.png';
import crashIconLow from './../assets/crashIconLow.png';
import crashIconHigh from './../assets/crashIconHigh.png';
// import * as predictionsData from "../util/predictions.json";
// import * as zones from "../util/zones.json";
import * as actualData from "../util/predictions-actual.json";


function App() {
  const [viewport, setViewport] = useState({
    latitude: 30.3209,
    longitude: -81.7287,
    width: "100vw",
    height: "100vh",
    zoom: 12,
  });

const handleMarkers = () => {
  let solution = [];
   actualData.data.coordinates.high.forEach(o => {
  solution.push(o.shape.coordinates.map( c => (
    <Marker 
    key={uuid()}
    latitude = {c[1]}
    longitude = {c[0]}
    >
     <div className="crash">
      <img src={crashIconHigh} alt="Crash Icon High" className="crashIcon"/>
      </div>
    </Marker>
  )))
  })

  actualData.data.coordinates.low.forEach(o => {
    solution.push(o.shape.coordinates.map( c => (
      <Marker 
      key={uuid()}
      latitude = {c[1]}
      longitude = {c[0]}
      >
       <div className="crash">
        <img src={crashIconLow} alt="Crash Icon Low" className="crashIcon"/>
        </div>
      </Marker>
    )))
    })
   return solution
};

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
        {handleMarkers()}
      </ReactMapGL>
      </div>
    </div>
  );
}

export default App;
