"use client";

const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

//  ---------------------------------- START of insertDogData function
/* The insertDogData function is called from the client component
src>app>templates>templateThree>page.tsx and inserts the dog data
(received from the server component src>app>api>retrieveddogdata>route.ts)
into IndexedDB. It is triggered on the initial mount of the client 
component and again every ten seconds thereafter. The dog data is passed
to the function as an argument. There is logic within the client component
which ensures that the insertDogData function runs and succesfully inserts
the dog data into IndexedDB before the getDogDataFromIndexedDB function
is called. */
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

// ---------
/* The following code checks if the data in the store matches the new data. 
If it does not, the store is cleared and the new data is inserted. This is 
to ensure that the data in the store is always up to date. */
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = function () {
      const existingData = getAllRequest.result;

      // Compare existing data with new data
      if (JSON.stringify(existingData) !== JSON.stringify(dogData)) {
        // If data does not match, clear the store and insert new data
        store.clear();
        dogData.forEach((dog) => {
          store.put(dog);
        });
      }
    };
    // ^^^^^^^^

    transaction.oncomplete = function () {
      db.close();
    };
  };
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^END of insertDogData function
// ################################################################
//  ------------------------------START of getDogDataFromIndexedDB function
/* The getDogDataFromIndexedDB function is called from the client component src>app>templates>templateThree>page.tsx and returns a promise that resolves
with the dog data from IndexedDB. It is triggered on on the initial mount of
the client component and again every ten seconds thereafter. There is logic 
within the client component that ensures the getDogDataFromIndexedDB function 
is only called once insertDogData function has succusufully inserted the dog
data into IndexedDB. */
export function getDogDataFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("Dogs", 1);

    request.onerror = function (event) {
      reject(new Error("An error occurred with IndexedDB"));
    };

    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction("dogData", "readonly");
      const store = transaction.objectStore("dogData");
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = function () {
        resolve(getAllRequest.result);
      };

      getAllRequest.onerror = function () {
        reject(new Error("Error retrieving data from IndexedDB"));
      };
    };
  });
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^ END of getDogDataFromIndexedDB function
