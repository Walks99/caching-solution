"use client";

import React, { useEffect, useState } from 'react';
import TemplateOne from './templates/TemplateOne';

const API_TOKEN = process.env.API_TOKEN;

interface Dog {
  id: number;
  breed: string;
  photo: {
    url: string;
  };
}

export default function Home() {
  const [dogData, setDogData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/dogs?populate=*`, {
          method: 'GET',
          headers: {
            Authorization: `bearer de637863fb966ae259daa21b6538f9d94aa79c1ce7ef582363c2a782e1e078f21d557446920f8ddaa1f30744e2c7774621c6030fe693cd1a3ae76295cc121bcff98c861b567eca126f1435f7662f8db492ed79285a5f217b3804c4e528a20a19656c4963a56ee7d5fb8b22ee8611bca44f1df1a00d24c336bcf85d8c8b92ecb2`,
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDogData(data.data); // Assuming data is wrapped in a 'data' object
        console.log(data.data);
        // console.log(data.data[0].attributes.Photo.data.attributes.url);
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {dogData.map(dog => (
        <TemplateOne key={dog.id} dog={dog} />
      ))}
    </main>
  );
}
