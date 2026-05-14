export const config = {
  runtime: "edge",
};

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

if (!client_id || !client_secret || !refresh_token) {
  console.error("Missing Spotify Environment Variables");
}

const basic = btoa(`${client_id || ""}:${client_secret || ""}`);
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token || "",
    }),
  });

  return response.json();
};

export default async function handler(req: Request) {
  try {
    const { access_token } = await getAccessToken();

    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (nowPlayingRes.status === 200) {
      const song = await nowPlayingRes.json();
      
      if (song.item) {
        return new Response(
          JSON.stringify({
            isPlaying: song.is_playing,
            title: song.item.name,
            artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
            albumImageUrl: song.item.album.images[0].url,
            songUrl: song.item.external_urls.spotify,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30",
            },
          }
        );
      }
    }

    const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (recentlyPlayedRes.status === 200) {
      const recent = await recentlyPlayedRes.json();
      
      if (recent.items && recent.items.length > 0) {
        const track = recent.items[0].track;
        return new Response(
          JSON.stringify({
            isPlaying: false,
            title: track.name,
            artist: track.artists.map((_artist: any) => _artist.name).join(", "),
            albumImageUrl: track.album.images[0].url,
            songUrl: track.external_urls.spotify,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
            },
          }
        );
      }
    }

    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Spotify API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch Spotify data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
