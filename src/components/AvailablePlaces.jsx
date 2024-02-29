import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [ availablePlaces, setAvailablePlaces ] = useState([]); // data state
  const [ isFetching, setIsFetching ] = useState(false); // loading state
  const [ error, setError ] = useState(); //error state

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

      try{
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();
  
        // if response returns a success, the status code will be 200 or 300
        // if response returns a failure, the status code will be 400 or 500
  
        if(!response.ok){
          // instantiating built-in error class
          // But it leads to crashing of an app
          // to tackle this problem we should use try catch block
          // We can wrap this code in try catch block to update the UI and not crash the app
          throw new Error('Failed to fetch places')
        }
        setAvailablePlaces(resData.places);
      } 
      catch(error){
        setError({message: error.message || 'Could not fetch places, please try again later.'})
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, [])

  if(error){
    return <Error title="An error occured!" message={error.message} />
  }

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