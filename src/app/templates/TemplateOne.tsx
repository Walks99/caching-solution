// TemplateOne.tsx
"use client";
import React from 'react';
import Image from 'next/image';

interface DogProps {
  dog: {
    id: number;
    attributes: {
      Breed: string;
      Photo: {
        data: {
            attributes: {

                url: string;
        };
    }
      };
    };
  };
}

function TemplateOne({ dog }: DogProps) {
    console.log(dog);
    ///console.log(data.data[0].attributes.Photo.data.attributes.url);
    const photoUrl = "http://localhost:1337"+ dog.attributes.Photo.data.attributes.url;
    console.log(photoUrl);
// Accessing the photo URL

  return (
    <div className="flex items-center justify-center w-full flex-1 p-4 border border-gray-300 rounded-md shadow-md">
      {photoUrl && (
        <img src={photoUrl} alt={dog.attributes.Breed} className="max-w-full max-h-full" width={200} height={200}/>
      )}
        <h2 className="text-xl font-bold">{dog.attributes.Breed}</h2>
      {/* Your content here */}
    </div>
  );
}

export default TemplateOne;
