"use server";   

import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const API_TOKEN = process.env.API_TOKEN;
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/api/dogs?populate=*`, {
      cache: 'no-store',
        headers: {
          Authorization: `bearer ${API_TOKEN}`,
        }
    }); 

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.data);
    return NextResponse.json(data);
}