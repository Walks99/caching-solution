
"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';


import { FetchData } from '../../API/FetchData';

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

  useEffect(() => {
    const callFetchDataFunction = async () => {
      try {
        const data = await FetchData();
        setDogData(data.data);
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };
    callFetchDataFunction();
  }, []);

  // console.log(dogData[0].attributes.Photo.data.attributes.url);
  // const image = dogData[0].attributes.Photo.data.attributes.url;

  return (
    <div className={styles.mainContainer}>
      {dogData && dogData.map((dog: Dog) => (
        <img src={`http://localhost:1337${dog.attributes.Photo.data.attributes.url}`} key={dog.id}/>
      ))}
    </div>

  );
}