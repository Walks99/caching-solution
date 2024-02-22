"use server";   

export async function FetchData() {
    const API_TOKEN = process.env.API_TOKEN;
    const API_URL = process.env.API_URL;
    console.log(API_TOKEN);
    const response = await fetch(`${API_URL}/api/cats?populate=*`, {
        method: 'GET',
        headers: {
          Authorization: `bearer ${API_TOKEN}`,
        }
      }); 

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}