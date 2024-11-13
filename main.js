import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import { Modify, Select, defaults as defaultInteractions } from 'ol/interaction.js';
import { fromLonLat } from 'ol/proj.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

// Vector source with GeoJSON data
const vectorSource = new VectorSource({
  url: './state_dist_assam.geojson',
  format: new GeoJSON(),
  wrapX: false,
});

// Vector layer to display the features
const vector = new VectorLayer({
  source: vectorSource,
  background: 'white',
});

// Select interaction
const select = new Select({
  wrapX: false,
});

// Modify interaction (optional)
const modify = new Modify({
  features: select.getFeatures(),
});

// Initialize the map
const map = new Map({
  interactions: defaultInteractions().extend([select, modify]),
  layers: [vector],
  target: 'map',
  view: new View({
    center: fromLonLat([91, 26]),
    zoom: 4,
  }),
});

// Function to add a new feature with a unique ID
// export function addFeature() {
//   const newFeature = new Feature({
//     geometry: new Point(fromLonLat([-80, 40])), // New point at longitude -80, latitude 40
//     name: 'New Point',
//     description: 'A new feature added dynamically',
//   });
  
//   // Assign a unique ID to the feature
//   newFeature.setId('new-feature-' + Date.now()); // Use timestamp as unique ID
//   vectorSource.addFeature(newFeature); // Add feature to the vector source
// }


// Function to add a new feature (point, line, or polygon)
export function addFeature(geometryType, attributes) {
  let geometry;
  console.log(geometry);
  
  switch (geometryType) {
    case 'Point':
      geometry = new Point(fromLonLat([-80, 40])); // Example point
      break;
    case 'LineString':
      geometry = new LineString([fromLonLat([-80, 40]), fromLonLat([-81, 41])]); // Example line
      break;
    case 'Polygon':
      geometry = new Polygon([[
        fromLonLat([-80, 40]),
        fromLonLat([-81, 40]),
        fromLonLat([-81, 41]),
        fromLonLat([-80, 41]),
        fromLonLat([-80, 40]),
      ]]); // Example polygon
      break;
    default:
      console.error('Unknown geometry type');
      return;
  }

  const newFeature = new Feature({
    geometry: geometry,
    ...attributes, // Add attributes dynamically
  });
  
  vectorSource.addFeature(newFeature); // Add feature to the vector source
}






// Function to remove the selected feature
export function removeSelectedFeature() {
  const selectedFeatures = select.getFeatures();
  if (selectedFeatures.getLength() > 0) {
    const selectedFeature = selectedFeatures.item(0); // Get the first (and only) selected feature
    vectorSource.removeFeature(selectedFeature); // Remove the selected feature from the vector source
  } else {
    alert("No feature selected.");
  }
}

// Function to modify the selected feature's attributes
export function modifyFeatureAttributes(newAttributes) {
  const selectedFeatures = select.getFeatures();
  if (selectedFeatures.getLength() > 0) {
    const selectedFeature = selectedFeatures.item(0);
    selectedFeature.setProperties(newAttributes); // Update the feature's properties
  } else {
    alert("No feature selected to modify.");
  }
}
