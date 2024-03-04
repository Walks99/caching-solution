"use server"

import { NextRequest, NextResponse } from "next/server";

interface DogData {
 id: number;
 name: string;
 age: number;
}

async function readStream(stream: ReadableStream<Uint8Array>): Promise<string> {
 const reader = stream.getReader();
 let result = '';
 while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += new TextDecoder().decode(value);
 }
 return result;
}

export async function PUT(req: NextRequest, res: NextResponse) {
 // Check if req.body is not null before passing it to readStream
 if (req.body) {
    const data = await readStream(req.body);
    console.log('Received data:', data);

    // Parse the string as JSON
    const jsonData: DogData[] = JSON.parse(data);

    // Now you can work with jsonData as an array of DogData objects
    console.log('Parsed data:', jsonData);

    return NextResponse.json({
       message: "Data received successfully",
    });
 } else {
    // Handle the case where req.body is null
    console.error('No data received');
    return NextResponse.error();
    // return new NextResponse(null, { status: 400 });
 }
}
