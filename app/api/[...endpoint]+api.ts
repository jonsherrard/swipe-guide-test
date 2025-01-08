import { URL } from 'node:url'

const API_BASE_URL = 'https://c33p01hq50.execute-api.eu-west-1.amazonaws.com';

export const GET = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api', '/assesment');
  const apiURL = new URL(path, API_BASE_URL);

  try {
    const apiResponse = await fetch(apiURL.toString(), {
      method: request.method,
      headers: request.headers,
    });

    if (!apiResponse.ok) {
      console.warn(`API request failed with status: ${apiResponse.status} for url: ${apiURL.toString()}`);
      return new Response(null, {
        status: apiResponse.status,
        statusText: apiResponse.statusText,
      });
    }

    const data = await apiResponse.json();
    return Response.json(data);
  } catch (error) {
    console.error(`Error during API request: ${error} for url: ${apiURL.toString()}`);
    return new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};