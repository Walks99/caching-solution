// TemplateOne.tsx
"use client";
import React from "react";
import styles from "./TemplateTwo.module.scss";

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
        };
      };
    };
  };
}

function TemplateOne({ dog }: DogProps) {
  const photoUrl =
    "http://localhost:1337" + dog.attributes.Photo.data.attributes.url;

  // console.log(dog);
  ///console.log(data.data[0].attributes.Photo.data.attributes.url);
  // console.log(photoUrl);

  return (
    <div className={styles.mainContainer}>
      {photoUrl && (
        <div className={styles.imageContainer}>
          <img src={photoUrl} alt={dog.attributes.Breed} />
        </div>
      )}
    </div>
  );
}

export default TemplateOne;
