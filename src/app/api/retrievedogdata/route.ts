/* This endpoint is called by the client component src>app>templates>templateThree>page.tsx. 
It reads the contents of the dogs.json file and returns them as a JSON response to the client.
 */
"use server"

import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest, res: NextResponse) {
 try {
    // Define the path to the dogs.json file
    const filePath = path.join(process.cwd(), 'data', 'dogs.json');

    // Read the contents of the dogs.json file
    const data = await fs.readFile(filePath, 'utf-8');

    // Parse the JSON string into an array of dog objects
    const dogs = JSON.parse(data);

    // Return the array of dog objects as a JSON response
    return NextResponse.json(dogs);
 } catch (error) {
    console.error('Error retrieving dog data:', error);
    // Return an error response with a status code of 500
    return NextResponse.error();
 }
}
