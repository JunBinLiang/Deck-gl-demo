/*
import React from 'react';
import DeckGL from '@deck.gl/react';
import {TextLayer} from '@deck.gl/layers';



import {StaticMap} from 'react-map-gl';
const MY_ACCESS_TOKEN="pk.eyJ1IjoianVuYmluIiwiYSI6ImNrNGt3NTFwczEwbWUzb3FzbmVmazBiNzYifQ.1JUPfDgiLyRuZYYYjxs5mQ";
class App extends React.Component {
  render() {
    return (
      <StaticMap
		mapboxApiAccessToken={MY_ACCESS_TOKEN}
        width={600}
        height={600}
        latitude={37.7577}
        longitude={-122.4376}
		mapStyle="mapbox://styles/mapbox/light-v9"
        zoom={8} />
    );
  }
}
export default App;

*/





import React, {Component} from 'react';
import {StaticMap} from 'react-map-gl';
import {TextLayer} from '@deck.gl/layers';
import DeckGL, {GeoJsonLayer, ArcLayer} from 'deck.gl';
import textdata from './data';
import {IconLayer} from '@deck.gl/layers';
import icondata from "./icondata";
// Set your mapbox token here


const MAPBOX_TOKEN="pk.eyJ1IjoianVuYmluIiwiYSI6ImNrNGt3NTFwczEwbWUzb3FzbmVmazBiNzYifQ.1JUPfDgiLyRuZYYYjxs5mQ";

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30
};

class App extends Component {
  _onClick(info) {
    if (info.object) {
      // eslint-disable-next-line
      alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
    }
  }

  render() {
	  /*
    const layers = [
      new GeoJsonLayer({
        id: 'airports',
        data: AIR_PORTS,
        // Styles
        filled: true,
        pointRadiusMinPixels: 2,
        pointRadiusScale: 2000,
        getRadius: f => 11 - f.properties.scalerank,
        getFillColor: [200, 0, 80, 180],
        // Interactive props
        pickable: true,
        autoHighlight: true,
        onClick: this._onClick
      }),
      new ArcLayer({
        id: 'arcs',
        data: AIR_PORTS,
        dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
        // Styles
        getSourcePosition: f => [-0.4531566, 51.4709959], // London
        getTargetPosition: f => f.geometry.coordinates,
        getSourceColor: [0, 128, 200],
        getTargetColor: [200, 0, 80],
        getWidth: 1
      })
    ];
	 */ 
	  
const ICON_MAPPING = {
  "marker": {x: 0, y: 0, width: 24, height: 20, mask: true},
  "marke": {x: 0, y: 25, width: 18, height: 20, mask: true}
};
	  
  
	  
/////////////////////////////////////
//My custom layer
/////////////////////////////////////
	const layers1=[
		new TextLayer({
    		id: 'text-layer',
    		data:textdata,
			pickable: true,
			getPosition: d => d.coordinates,
			getText: d => d.name,
			getSize: 32,
			getAngle: 0,
			getTextAnchor: 'middle',
			getAlignmentBaseline: 'center',
		
  }),
		new IconLayer({
			id: 'icon-layer',
			data:icondata,
			pickable: true,
			// iconAtlas and iconMapping are required
			// getIcon: return a string
			iconAtlas: './svgimg.png',
			iconMapping: ICON_MAPPING,
			getIcon: d => 'marker',
			sizeScale: 10,
			getPosition: d => d.coordinates,
			getSize: d => 10,
			getColor: d => [Math.sqrt(d.exits), 140, 0]
  })
];

    return (
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers1}>
        <StaticMap key={1} mapboxApiAccessToken={MAPBOX_TOKEN} mapStyle="mapbox://styles/mapbox/light-v9" />
      </DeckGL>
    );
  }
}
export default App;