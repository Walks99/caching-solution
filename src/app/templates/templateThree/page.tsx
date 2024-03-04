"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';

interface Dog {
    id: number;
    name: string;
    age: number;
  }

export default function MyComponent() {

  const [dogData, setDogData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  
    const callFetchDataFunction = async () => {
      try {
        const response = await fetch('/api/dogdata');
        const data = await response.json();
        console.log(data);
        setDogData(data.data);
      } catch (error: any) {
        console.error('Error fetching dogs:', error);
        setError(error);
      }
    };
    callFetchDataFunction();
    setInterval(callFetchDataFunction, 3000); // Fetch data every 3 seconds
  

    console.log(`This was logged from the client component: ${dogData}`);

    return (
      <div className={styles.mainContainer}>
        <h1>Template Three</h1>
        <p>This is a template with a client component that receives data from a server component and stores that data in IndexedDB.</p>
        <div>
          {dogData.map((dog: Dog) => (
            <div key={dog.id}>
              <h2>{dog.name}</h2>
              <p>Age: {dog.age}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }