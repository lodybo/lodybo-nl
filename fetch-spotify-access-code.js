fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
})
  .then((res) => res.json())
  .then((json) => {
    console.log('Requested Access Token from Spotify:');
    console.log(json.access_token);
    console.log(`Expires in: ${json.expires_in / 60} minutes`);
    console.log(' ');
  })
  .catch((err) => console.error(err));
