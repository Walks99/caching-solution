// TemplateOne.tsx
"use client";
import React from 'react';

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

// interface Dog {
//   id: number;
//   attributes: {
//     Breed: string;
//     Photo: {
//       data: {
//         attributes: {
//           url: string;
//         };
//       };
//     };
//   };
// }

function TemplateOne({ dog }: DogProps
  ) {
  const photoUrl = "http://localhost:1337"+ dog.attributes.Photo.data.attributes.url;

    // console.log(dog);
    ///console.log(data.data[0].attributes.Photo.data.attributes.url);
    // console.log(photoUrl);
// Accessing the photo URL

  return (
    <div className="flex items-center justify-center w-full flex-1 p-4 border border-gray-300 rounded-md shadow-md">
        {photoUrl && (
        <>
        <img src={photoUrl} alt={dog.attributes.Breed} className="max-w-full max-h-full w-full h-full object-cover" />
        </>
      )}

    </div>
  );
}

export default TemplateOne;
