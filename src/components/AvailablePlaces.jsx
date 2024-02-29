import { useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [ availablePlaces, setAvailablePlaces ] = useState([]);

  // It is provided by the browser and can be used to both send and fetch data 
  // it takes the URL 
  // Then fetch returns a 'promise', which is a javascript value that will eventualy resolve to another value
  // And to access the results, we can chain the fetch with 'then()' method
  // '.then()' will be executed once the promise is resolved
  // you can also use async await to get data after promise is resolved (but it is not allowed in react component functions)
  fetch('http://localhost:3000/places').then((response)=>{
    return response.json(); // json also returns a promise, so we can chain another '.then()' method with it
  }).then((resData)=>{
    setAvailablePlaces(resData.places)
  })
  // But this approach has a major flaw, it will lead to infinite loop

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
