import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [ availablePlaces, setAvailablePlaces ] = useState([]);
  const [ isFetching, setIsFetching ] = useState(false);

  // It is provided by the browser and can be used to both send and fetch data 
  // it takes the URL 
  // Then fetch returns a 'promise', which is a javascript value that will eventualy resolve to another value
  // And to access the results, we can chain the fetch with 'then()' method
  // '.then()' will be executed once the promise is resolved
  // you can also use async await to get data after promise is resolved (but it is not allowed in react component functions)
  
  // fetch('http://localhost:3000/places').then((response)=>{
  //   return response.json(); // json also returns a promise, so we can chain another '.then()' method with it
  // }).then((resData)=>{
  //   setAvailablePlaces(resData.places)
  // })

  // But this approach has a major flaw, it will lead to infinite loop
  // to solve this problem, wrap the code above in useEffect hook


  // useEffect(()=>{
  //   fetch('http://localhost:3000/places').then((response)=>{
  //       return response.json(); // json also returns a promise, so we can chain another '.then()' method with it
  //     }).then((resData)=>{
  //       setAvailablePlaces(resData.places);
  //   });
  // }, [])

  // ANOTHER WAY OF FETCHING DATA USING ASYNC AWAIT
  useEffect(()=>{
    async function fetchPlaces(){
      setIsFetching(true);
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsFetching(false);
    }
    fetchPlaces();
  }, [])

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText = "Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}