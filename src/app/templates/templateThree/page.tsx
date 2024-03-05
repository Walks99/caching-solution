"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
// Importing the functions to insert and retrieve dog data from IndexedDB.
import { insertDogData, getDogDataFromIndexedDB } from '../../../services/indexedDB';

// Define the shape of the data we expect to receive from the server.
interface Dog {
    id: number;
    name: string;
    age: number;
}

// Define the component that will be rendered by the client.
export default function MyComponent() {
 const [dogData, setDogData] = useState<Dog[]>([]);
 const [error, setError] = useState<string | null>(null);

/*  This useEffect hook runs on intial render. It contains 
a setInterval function that runs th 'runFunctions' function every 10 seconds.
This triggers the 'fetchDogData' function to fetch dog data from the server and
the 'getDogDataFromIndexedDB' function to retrieve dog data from IndexedDB.
*/
 useEffect(() => {
    const runFunctions = async () => {
      try {
        await fetchDogData();
        const data = await getDogDataFromIndexedDB();
      if (data && data.length > 0) {
        setDogData(data);
      }
    } catch (error : any) {
      console.error('Error fetching or retrieving dog data:', error);
      setError(error.message);
    }
      }

    const intervalId = setInterval(() => {
      runFunctions();
    }, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
 }, []);

 /* The fetchDogData function sends a GET request to the server to retrieve dog data.
  If the request is successful, the data is inserted into the component's state using the
  setDogData function. If the request fails, an error message is logged to the console and
  stored in the component's state using the setError function.
 */
 const fetchDogData = async () => {
  console.log('Fetching dog data...')
    try {
      const response = await fetch('/api/retrievedogdata', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Dog[] = await response.json();
      insertDogData(data);
    } catch (error: any) {
      console.error('Error fetching dogs:', error);
      setError(error.message);
    }
 };

//  The component dynamically renders the dog data received from the server.
 return (
    <div className={styles.mainContainer}>
      <div>
        {dogData.map((dog) => (
          <div key={dog.id}>
            <h2>Name: {dog.name}</h2>
            <p>Age: {dog.age}</p>
          </div>
        ))}
      </div>
    </div>
 );
}
