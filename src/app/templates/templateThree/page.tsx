"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';

interface Dog {
    id: number;
    attributes: {
      Breed: string;
      Photo: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
    };
  }

export default function MyComponent() {

  const [dogData, setDogData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

    console.log(`This was logged from the client component: ${dogData}`);

    return (
      <div className={styles.mainContainer}>
        {dogData && dogData.map((dog: Dog) => (
          <img src={`http://localhost:1337${dog.attributes.Photo.data.attributes.url}`} key={dog.id}/>
        ))}
        {/* {dogData ? null : JSON.stringify(dogData)} */}
        {error ? <div style={{fontSize: "60px"}}>Error: Unauthorised</div> : null}
      </div>
    );
  }