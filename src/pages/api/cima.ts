import type { APIRoute } from 'astro';
import https from 'https';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const nombre = url.searchParams.get('nombre');
  console.log('API called with nombre:', nombre);

  if (!nombre) {
    console.log('Error: Nombre is required');
    return new Response(JSON.stringify({ error: 'Se requiere el nombre del medicamento' }), { status: 400 });
  }

  const apiUrl = `https://cima.aemps.es/cima/rest/medicamentos?nombre=${encodeURIComponent(nombre)}`;
  console.log('Fetching data from:', apiUrl);

  return new Promise((resolve, reject) => {
    https.get(apiUrl, (resp) => {
      let data = '';

      console.log('Status Code:', resp.statusCode);
      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        resolve(new Response(data, { status: 200, headers: { 'Content-Type': 'application/json' } }));
      });

    }).on('error', (err) => {
      console.error('Error fetching data:', err);
      reject(new Response(JSON.stringify({ error: 'Error al obtener los datos del medicamento' }), { status: 500 }));
    });
  });
};
