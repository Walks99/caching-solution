"use client";

import React, { useEffect, useState } from 'react';
import TemplateOne from './TemplateOne';

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {dogData.map((dog: Dog) => (
        <TemplateOne key={dog.id} dog={dog} />
      ))}
    </main>

  );
}