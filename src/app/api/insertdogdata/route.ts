// -------------------------------------------------------
/* This is the server-side code for handling PUT requests to insert dog data into a file. 
This endpoint is called by the client component src>app>templates>templateThree>page.tsx. */
"use server";
// Import necessary modules from Next.js server components.
// NextRequest and NextResponse are used to handle incoming requests and responses.
import { NextRequest, NextResponse } from "next/server";

// Import the file system module from Node.js for asynchronous file operations.
// This module provides functions for working with the file system, such as reading and writing files.
import fs from "fs/promises";

// Import the path module from Node.js for handling and transforming file paths.
// This module provides utilities for working with file and directory paths.
import path from "path";

// Define an interface for the data structure we expect to receive.
// This interface describes the shape of the data, ensuring type safety.
// Each dog object has an id, name, and age.
interface DogData {
  id: number; // Unique identifier for each dog.
  name: string; // Name of the dog.
  age: number; // Age of the dog.
}

// This asynchronous function reads data from a ReadableStream object.
// It's designed to handle streams of Uint8Array data, which is common for binary data.
async function readStream(stream: ReadableStream<Uint8Array>): Promise<string> {
  // Obtain a reader from the stream to read its contents.
  const reader = stream.getReader();
  // Initialize an empty string to accumulate the data read from the stream.
  let result = "";
  // Start an infinite loop to read data from the stream.
  while (true) {
    // Read a chunk of data from the stream.
    // This operation is asynchronous and returns a promise that resolves to an object.
    const { done, value } = await reader.read();
    // If the stream is done (i.e., no more data to read), break the loop.
    if (done) {
      break;
    }
    // Decode the Uint8Array chunk into a string using TextDecoder.
    // This is necessary because the stream reads data in binary format.
    result += new TextDecoder().decode(value);
  }
  // Return the accumulated string data.
  return result;
}

// This function handles PUT requests to the server.
// It's an asynchronous function because it performs asynchronous operations.
export async function PUT(req: NextRequest, res: NextResponse) {
  // Check if the request body is not null before attempting to read it.
  // This is a safeguard against null values, which could lead to runtime errors.
  if (req.body) {
    // If the request body is not null, read its contents using the readStream function.
    // This function returns a promise that resolves to a string, which is the data read from the stream.
    const data = await readStream(req.body);
    // Log the received data to the console for debugging purposes.
    console.log("Received data:", data);

    // Parse the received string data as JSON.
    // This operation converts the string into a JavaScript object, allowing us to work with it programmatically.
    const jsonData: DogData[] = JSON.parse(data);
    // Log the parsed data to the console.
    // This step is useful for verifying that the data was correctly parsed.
    console.log("Parsed data:", jsonData);

    // Define the directory and file path where you want to store the data.
    // path.join is used to construct the file path in a platform-independent way.
    const dirPath = path.join(process.cwd(), "data");
    const filePath = path.join(dirPath, "dogs.json");

    try {
      // Ensure the directory exists, creating it if necessary.
      // The { recursive: true } option ensures that the directory is created along with any necessary parent directories.
      await fs.mkdir(dirPath, { recursive: true });

      // Convert the jsonData array to a JSON string.
      // JSON.stringify is used to convert the JavaScript object into a JSON string.
      // The second argument (null) is a replacer function that transforms the results.
      // The third argument (2) specifies the number of spaces to use for indentation, making the output more readable.
      const jsonString = JSON.stringify(jsonData, null, 2);

      // Write the JSON string to the file.
      // fs.writeFile is used to write data to a file, replacing the file if it already exists.
      await fs.writeFile(filePath, jsonString);

      // Log a success message to the console.
      console.log("Data saved to file successfully");
    } catch (error) {
      // Log an error message to the console if an error occurs during file writing.
      console.error("Error saving data to file:", error);
      // Return an error response to the client.
      // The error response includes a status code and a message.
      return NextResponse.error();
    }

    // Return a JSON response to the client indicating that the data was received and saved successfully.
    // This response includes a message property with a success message.
    return NextResponse.json({
      message: "Data received and saved successfully",
    });
  } else {
    // If the request body is null, log an error message to the console.
    // This is a fallback for handling cases where no data is received.
    console.error("No data received");
    // Return an error response to the client.
    // The error response includes a status code and a message.
    return NextResponse.error();
  }
}
// // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
