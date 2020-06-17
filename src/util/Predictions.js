import React, { useState, useEffect } from 'react';
import { Marker } from 'react-map-gl';
import uuid from 'uuid';
import crashIconLow from './../assets/crashIconLow.png';
import crashIconHigh from './../assets/crashIconHigh.png';

export default function Predictions() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = "https://cdn.urbansdk.com/actual_v_prediction.json";
        fetch(proxyUrl + targetUrl)
          .then(res => res.json())
          .then(
            (result) => {
              setData(result)
              setLoading(false)
            },
          )
      }, [])

      const handleMarkers = () => {
        let solution = [];
         data.data.coordinates.high.forEach(o => {
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
      
        data.data.coordinates.low.forEach(o => {
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
        <div>
            {!loading && handleMarkers()}
        </div>
    )
};