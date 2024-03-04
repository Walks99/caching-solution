// "use client";

// const indexedDB =
//   window.indexedDB ||
//   window.mozIndexedDB ||
//   window.webkitIndexedDB ||
//   window.msIndexedDB ||
//   window.shimIndexedDB;

// // Function to insert dog data into IndexedDB
// export function insertDogData(dogData) {
//     const request = indexedDB.open("Dogs", 1);
   
//     request.onerror = function (event) {
//        console.error("An error occurred with IndexedDB");
//        console.error(event);
//     };

//     request.onupgradeneeded = function () {
//         const db = request.result;
//         const store = db.createObjectStore("dogData", { keyPath: "id" });
//       };
   
//     request.onsuccess = function () {
//        const db = request.result;
//        const transaction = db.transaction("dogData", "readwrite");
//        const store = transaction.objectStore("dogData");
   
//        // Assuming dogData is an array of dog objects
//        dogData.forEach(dog => {
//          store.put(dog);
//        });
   
//        transaction.oncomplete = function () {
//          db.close();
//        };
//     };
//    }   



// ------------------------------
// "use client";

// const indexedDB =
//  window.indexedDB ||
//  window.mozIndexedDB ||
//  window.webkitIndexedDB ||
//  window.msIndexedDB ||
//  window.shimIndexedDB;

// // Function to insert dog data into IndexedDB
// export function insertDogData(dogData) {
//  const request = indexedDB.open("Dogs", 1);

//  request.onerror = function (event) {
//     console.error("An error occurred with IndexedDB");
//     console.error(event);
//  };

//  request.onupgradeneeded = function () {
//     const db = request.result;
//     const store = db.createObjectStore("dogData", { keyPath: "id" });
//  };

//  request.onsuccess = function () {
//     const db = request.result;
//     const transaction = db.transaction("dogData", "readwrite");
//     const store = transaction.objectStore("dogData");

//     // Get all existing data from the store
//     const getAllRequest = store.getAll();

//     getAllRequest.onsuccess = function () {
//       const existingData = getAllRequest.result;

//       // Compare existing data with new data
//       if (JSON.stringify(existingData) !== JSON.stringify(dogData)) {
//         // If data does not match, clear the store and insert new data
//         store.clear();
//         dogData.forEach(dog => {
//           store.put(dog);
//         });
//       }
//     };

//     transaction.oncomplete = function () {
//       db.close();
//     };
//  };
// }

// ------------------------------

"use client";

const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

// Function to insert dog data into IndexedDB
export function insertDogData(dogData) {
    const request = indexedDB.open("Dogs", 1);
   
    request.onerror = function (event) {
       console.error("An error occurred with IndexedDB");
       console.error(event);
    };

    request.onupgradeneeded = function () {
        const db = request.result;
        const store = db.createObjectStore("dogData", { keyPath: "id" });
      };
   
    request.onsuccess = function () {
       const db = request.result;
       const transaction = db.transaction("dogData", "readwrite");
       const store = transaction.objectStore("dogData");
   
         // Get all existing data from the store
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = function () {
      const existingData = getAllRequest.result;

      // Compare existing data with new data
      if (JSON.stringify(existingData) !== JSON.stringify(dogData)) {
        // If data does not match, clear the store and insert new data
        store.clear();
        dogData.forEach(dog => {
          store.put(dog);
        });
      }
    };
   
       transaction.oncomplete = function () {
         db.close();
       };
    };
   }   
