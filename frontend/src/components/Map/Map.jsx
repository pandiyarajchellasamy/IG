import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  DirectionsRenderer,
  MarkerF,
  OverlayViewF
} from '@react-google-maps/api';
import { Button, Card, Row, Col, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Replace with your Google Maps API key
const API_KEY = 'AIzaSyC3CkBv44KOImdVKEfnP0bSVYvnsnvab5s';

const containerStyle = {
  width: '70vw',
  height: '100vh'
};

function Direction() {
  const [autocompleteSource, setAutocompleteSource] = useState(null);
  const [autocompleteDestination, setAutocompleteDestination] = useState(null);
  const [source, setSource] = useState({});
  const [destination, setDestination] = useState({});
  const [directions, setDirections] = useState(null);
  const [center, setCenter] = useState({
    lat: 13.0827, // Default center point (Chennai, India)
    lng: 80.2707
  });

  useEffect(() => {
    if (source.lat && destination.lat) {
      directionRoute();
      handleGetRoute();
    }
  }, [source, destination]);

 
  const onLoadSource = (autocomplete) => {
    setAutocompleteSource(autocomplete);
  };

  const onPlaceChangedSource = () => {
    if (autocompleteSource !== null) {
      const place = autocompleteSource.getPlace();
      setSource({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        label: place.name
      });
    }
  };

  const onLoadDestination = (autocomplete) => {
    setAutocompleteDestination(autocomplete);
  };

  const onPlaceChangedDestination = () => {
    if (autocompleteDestination !== null) {
      const place = autocompleteDestination.getPlace();
      setDestination({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        label: place.name
      });
    }
  };

  const handleGetRoute = () => {
    if (source.lat && destination.lat) {
      directionRoute();
    } else {
      alert('Please select both a pickup and drop location.');
    }
  };

  

  const directionRoute = () => {
    if (!window.google) {
      console.error('Google Maps API is not available.');
      return;
    }

    if (!source.lat || !destination.lat) {
      console.error('Source or destination is invalid.');
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
          const distanceText = result.routes[0].legs[0].distance.text;
          const durationText = result.routes[0].legs[0].duration.text;
          setDistance(distanceText);
          setDuration(durationText);
        } else if (status === 'ZERO_RESULTS') {
          alert('No route could be found between the selected locations.');
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={['places', 'directions']}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100vw' }}>
        <div style={{ width: '30vw', padding: '20px' }}>
          <h4>PickUp Location</h4>
          <Autocomplete onLoad={onLoadSource} onPlaceChanged={onPlaceChangedSource}>
            <input
              type="text"
              placeholder="Enter pick up location"
              style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
          </Autocomplete>

          <h4>Drop Location</h4>
          <Autocomplete onLoad={onLoadDestination} onPlaceChanged={onPlaceChangedDestination}>
            <input
              type="text"
              placeholder="Enter drop location"
              style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
          </Autocomplete>

          <Button variant="primary" onClick={handleGetRoute} style={{ marginBottom: '20px' }}>
            Get Route
          </Button>


        </div>

        <div style={{ width: '70vw', height: '100vh' }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onLoad={(map) => setCenter(map.getCenter().toJSON())}
          >
            {source.lat && (
              <MarkerF
                position={{ lat: source.lat, lng: source.lng }}
                icon={{ url: '/square.png', scaledSize: { width: 20, height: 20 } }}
              >
                <OverlayViewF
                  position={{ lat: source.lat, lng: source.lng }}
                  mapPaneName="overlayLayer"
                >
                  <div className="bg-black rounded-3 font-bold">
                    <p className="p-2 text-white">{source.label}</p>
                  </div>
                </OverlayViewF>
              </MarkerF>
            )}

            {destination.lat && (
              <MarkerF
                position={{ lat: destination.lat, lng: destination.lng }}
                icon={{ url: '/dest.png', scaledSize: { width: 20, height: 20 } }}
              >
                <OverlayViewF
                  position={{ lat: destination.lat, lng: destination.lng }}
                  mapPaneName="overlayLayer"
                >
                  <div className="bg-black font-bold rounded-3">
                    <p className="p-2 text-white">{destination.label}</p>
                  </div>
                </OverlayViewF>
              </MarkerF>
            )}

            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: '#000',
                    strokeWeight: 5
                  },
                  suppressMarkers: true
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}

export default Direction;
