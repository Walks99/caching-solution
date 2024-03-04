"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';

interface Dog {
    id: number;
    name: string;
    age: number;
}

export default function MyComponent() {
 const [dogData, setDogData] = useState<Dog[]>([]);
 const [error, setError] = useState<string | null>(null);

 const fetchDogData = async () => {
  console.log('Fetching dog data...')
    try {
      const response = await fetch('/api/retrievedogdata', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Dog[] = await response.json();
      setDogData(data);
    } catch (error: any) {
      console.error('Error fetching dogs:', error);
      setError(error.message);
    }
 };

 useEffect(() => {
    fetchDogData();
    const intervalId = setInterval(fetchDogData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId); // Clean up interval on component unmount
 }, []);

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
