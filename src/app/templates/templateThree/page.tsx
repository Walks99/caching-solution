// "use client";

// import React, { useEffect, useState } from 'react';
// import styles from './page.module.scss';
// import { insertDogData } from '../../../services/indexedDB';

// interface Dog {
//     id: number;
//     name: string;
//     age: number;
// }

// export default function MyComponent() {
//  const [dogData, setDogData] = useState<Dog[]>([]);
//  const [error, setError] = useState<string | null>(null);

//  const fetchDogData = async () => {
//   console.log('Fetching dog data...')
//     try {
//       const response = await fetch('/api/retrievedogdata', { method: 'GET' });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data: Dog[] = await response.json();
//       setDogData(data);
//       insertDogData(data);
//     } catch (error: any) {
//       console.error('Error fetching dogs:', error);
//       setError(error.message);
//     }
//  };

//  useEffect(() => {
//     fetchDogData();
//     const intervalId = setInterval(fetchDogData, 10000); // Fetch data every 5 seconds
//     return () => clearInterval(intervalId); // Clean up interval on component unmount
//  }, []);

//  return (
//     <div className={styles.mainContainer}>
//       <div>
//         {dogData.map((dog) => (
//           <div key={dog.id}>
//             <h2>Name: {dog.name}</h2>
//             <p>Age: {dog.age}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//  );
// }

// ------------------------------

// "use client";

// import React, { useEffect, useState } from 'react';
// import styles from './page.module.scss';
// import { insertDogData, getDogDataFromIndexedDB } from '../../../services/indexedDB';

// interface Dog {
//     id: number;
//     name: string;
//     age: number;
// }

// export default function MyComponent() {
//  const [dogData, setDogData] = useState<Dog[]>([]);
//  const [error, setError] = useState<string | null>(null);

//  useEffect(() => {
//     // Retrieve data from IndexedDB on component mount
//     getDogDataFromIndexedDB()
//       .then(data => {
//         if (data && data.length > 0) {
//           setDogData(data);
//         }
//       })
//       .catch(err => {
//         console.error('Error retrieving data from IndexedDB:', err);
//         setError(err.message);
//       });

//     // Periodically fetch data from the server and update IndexedDB
//     const intervalId = setInterval(() => {
//       fetchDogData();
//       getDogDataFromIndexedDB()
//     }, 10000); // Fetch data every 10 seconds

//     return () => clearInterval(intervalId); // Clean up interval on component unmount
//  }, []);

//  const fetchDogData = async () => {
//   console.log('Fetching dog data...')
//     try {
//       const response = await fetch('/api/retrievedogdata', { method: 'GET' });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data: Dog[] = await response.json();
//       // setDogData(data);
//       insertDogData(data);
//     } catch (error: any) {
//       console.error('Error fetching dogs:', error);
//       setError(error.message);
//     }
//  };

//  return (
//     <div className={styles.mainContainer}>
//       <div>
//         {dogData.map((dog) => (
//           <div key={dog.id}>
//             <h2>Name: {dog.name}</h2>
//             <p>Age: {dog.age}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//  );
// }

// ------------------------------

"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { insertDogData, getDogDataFromIndexedDB } from '../../../services/indexedDB';

interface Dog {
    id: number;
    name: string;
    age: number;
}

export default function MyComponent() {
 const [dogData, setDogData] = useState<Dog[]>([]);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
    const runFunctions = async () => {
      try {
        await fetchDogData();
        const data = await getDogDataFromIndexedDB();
      if (data && data.length > 0) {
        setDogData(data);
      }
    } catch (error : any) {
      console.error('Error fetching or retrieving dog data:', error);
      setError(error.message);
    }
      }

    const intervalId = setInterval(() => {
      runFunctions();
    }, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
 }, []);

 const fetchDogData = async () => {
  console.log('Fetching dog data...')
    try {
      const response = await fetch('/api/retrievedogdata', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Dog[] = await response.json();
      // setDogData(data);
      insertDogData(data);
    } catch (error: any) {
      console.error('Error fetching dogs:', error);
      setError(error.message);
    }
 };

 

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
