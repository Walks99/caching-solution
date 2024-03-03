"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import TemplateOne from './TemplateTwo';

import { FetchData } from '../../api/FetchData';

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

  return (
    <main className={styles.mainContainer}>
      {dogData.map((dog: Dog) => (
        <div key={dog.id}>
          <TemplateOne key={dog.id} dog={dog} />
        </div>
      ))}
    </main>

  );
}