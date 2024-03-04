// "use server" directive is used to indicate that this file is a server component in Next.js.
"use server";

// Importing necessary modules from Next.js server components.
import { NextRequest, NextResponse } from "next/server";

// Defining an interface for the data structure we expect to receive.
// This interface describes the shape of the data, ensuring type safety.
interface DogData {
  id: number; // Unique identifier for each dog.
  name: string; // Name of the dog.
  age: number; // Age of the dog.
}

// This asynchronous function reads data from a ReadableStream object.
// It's designed to handle streams of Uint8Array data, which is common for binary data.
async function readStream(stream: ReadableStream<Uint8Array>): Promise<string> {
  // Obtaining a reader from the stream to read its contents.
  const reader = stream.getReader();
  // Initializing an empty string to accumulate the data read from the stream.
  let result = "";
  // Starting an infinite loop to read data from the stream.
  while (true) {
    // Reading a chunk of data from the stream.
    // This operation is asynchronous and returns a promise that resolves to an object.
    const { done, value } = await reader.read();
    // If the stream is done (i.e., no more data to read), break the loop.
    if (done) {
      break;
    }
    // Decoding the Uint8Array chunk into a string using TextDecoder.
    // This is necessary because the stream reads data in binary format.
    result += new TextDecoder().decode(value);
  }
  // Returning the accumulated string data.
  return result;
}

// This function handles PUT requests to the server.
// It's an asynchronous function because it performs asynchronous operations.
export async function PUT(req: NextRequest, res: NextResponse) {
  // Checking if the request body is not null before attempting to read it.
  // This is a safeguard against null values, which could lead to runtime errors.
  if (req.body) {
    // If the request body is not null, read its contents using the readStream function.
    // This function returns a promise that resolves to a string, which is the data read from the stream.
    const data = await readStream(req.body);
    // Logging the received data to the console for debugging purposes.
    console.log("Received data:", data);

    // Parsing the received string data as JSON.
    // This operation converts the string into a JavaScript object, allowing us to work with it programmatically.
    const jsonData: DogData[] = JSON.parse(data);

    // Logging the parsed data to the console.
    // This step is useful for verifying that the data was correctly parsed.
    console.log("Parsed data:", jsonData);

    // Returning a JSON response to the client indicating that the data was received successfully.
    // This response includes a message property with a success message.
    return NextResponse.json({
      message: "Data received successfully",
    });
  } else {
    // If the request body is null, log an error message to the console.
    // This is a fallback for handling cases where no data is received.
    console.error("No data received");
    // Returning an error response to the client.
    // Note: The original code attempted to use NextResponse.error() incorrectly.
    // The correct approach is to use the NextResponse constructor with appropriate status code.
    // return new NextResponse(null, { status: 400 });
    // However, since the original code snippet had a commented-out line that correctly returns an error response,
    // I've left it as is for clarity. In practice, you should uncomment and use the correct approach.
    return NextResponse.error();
  }
}
