import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { handleBooking } from './api/book-call.js';
import { handleSendGuide } from './api/send-guide.js';

function apiDevServerPlugin() {
  return {
    name: 'api-dev-server-plugin',
    configureServer(server) {
      // Booking API
      server.middlewares.use('/api/book-call', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let bodyStr = '';
        req.on('data', chunk => {
          bodyStr += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const body = JSON.parse(bodyStr || '{}');
            const result = await handleBooking(body);
            res.statusCode = 200;
            res.end(JSON.stringify(result));
          } catch (err) {
            console.error('API Error in /api/book-call:', err);
            res.statusCode = 400;
            res.end(JSON.stringify({ error: err.message || 'Server error' }));
          }
        });
      });

      // Send Free Guide API
      server.middlewares.use('/api/send-guide', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let bodyStr = '';
        req.on('data', chunk => {
          bodyStr += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const body = JSON.parse(bodyStr || '{}');
            const result = await handleSendGuide(body);
            res.statusCode = 200;
            res.end(JSON.stringify(result));
          } catch (err) {
            console.error('API Error in /api/send-guide:', err);
            res.statusCode = 400;
            res.end(JSON.stringify({ error: err.message || 'Server error' }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), apiDevServerPlugin()],
});
