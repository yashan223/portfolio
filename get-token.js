import fs from 'fs';
import http from 'http';

const envFile = fs.readFileSync('.env', 'utf8');
const getEnv = (key) => {
  const match = envFile.match(new RegExp(`${key}=(.*)`));
  return match ? match[1].replace(/['"]/g, '').trim() : null;
};

const client_id = getEnv('SPOTIFY_CLIENT_ID');
const client_secret = getEnv('SPOTIFY_CLIENT_SECRET');

if (!client_id || !client_secret) {
  console.error('❌ Please add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to .env.local first!');
  process.exit(1);
}

const redirect_uri = 'http://127.0.0.1:3000/callback';

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/callback')) {
    const parsed = new URL(req.url, `http://127.0.0.1:3000`);

    const error = parsed.searchParams.get('error');
    if (error) {
      res.end(`Spotify returned an error: ${error}. Check that your Redirect URI in the Spotify Dashboard is exactly: http://127.0.0.1:3000/callback`);
      console.log(`\n❌ Spotify error: ${error}`);
      console.log('👉 Make sure your Spotify Dashboard Redirect URI is EXACTLY: http://127.0.0.1:3000/callback');
      process.exit(1);
    }

    const code = parsed.searchParams.get('code');
    if (code) {
      res.end('Success! Check your terminal for the refresh token. You can close this tab.');
      
      const authBuffer = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
      
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authBuffer}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri,
        }).toString()
      })
      .then(r => r.json())
      .then(data => {
        if (data.refresh_token) {
          console.log('\n\n=== ✅ YOUR REFRESH TOKEN ===');
          console.log(data.refresh_token);
          console.log('=============================\n');
          console.log('Copy this into your .env.local file as SPOTIFY_REFRESH_TOKEN!');
        } else {
          console.log('\n❌ Error getting token:', data);
        }
        process.exit(0);
      })
      .catch(err => {
        console.error('Error fetching token:', err);
        process.exit(1);
      });
    } else {
      res.end('No code found in URL.');
      process.exit(1);
    }
  }
});

server.listen(3000, () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=user-read-currently-playing%20user-read-recently-played`;
  console.log('\n--- SPOTIFY REFRESH TOKEN GENERATOR ---');
  console.log('1. Go to Spotify Developer Dashboard and add this to Redirect URIs: http://127.0.0.1:3000/callback');
  console.log('2. Click Save in the dashboard.');
  console.log('3. Open this exact URL in your browser:\n');
  console.log(authUrl + '\n');
  console.log('Waiting for you to log in in your browser...');
});