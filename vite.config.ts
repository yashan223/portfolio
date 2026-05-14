import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      tsConfigPaths(),
      tanstackStart({
        spa: {
          enabled: true,
          prerender: {
            outputPath: "index.html",
            crawlLinks: true,
          },
        },
      }),
      react(),
      tailwindcss(),
      {
        name: "spotify-api-dev",
        configureServer(server) {
          server.middlewares.use("/api/spotify", async (_req, res) => {
            const client_id = env.SPOTIFY_CLIENT_ID;
            const client_secret = env.SPOTIFY_CLIENT_SECRET;
            const refresh_token = env.SPOTIFY_REFRESH_TOKEN;

            if (!client_id || !client_secret || !refresh_token) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Missing Spotify env vars" }));
              return;
            }

            try {
              const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

              const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                  Authorization: `Basic ${basic}`,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ grant_type: "refresh_token", refresh_token }),
              });
              const { access_token } = (await tokenRes.json()) as { access_token: string };

              const nowRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
                headers: { Authorization: `Bearer ${access_token}` },
              });

              if (nowRes.status === 200) {
                const song = (await nowRes.json()) as any;
                if (song?.item) {
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({
                    isPlaying: song.is_playing,
                    title: song.item.name,
                    artist: song.item.artists.map((a: any) => a.name).join(", "),
                    albumImageUrl: song.item.album.images[0]?.url ?? "",
                    songUrl: song.item.external_urls.spotify,
                  }));
                  return;
                }
              }

              const recentRes = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
                headers: { Authorization: `Bearer ${access_token}` },
              });

              if (recentRes.status === 200) {
                const recent = (await recentRes.json()) as any;
                const track = recent?.items?.[0]?.track;
                if (track) {
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({
                    isPlaying: false,
                    title: track.name,
                    artist: track.artists.map((a: any) => a.name).join(", "),
                    albumImageUrl: track.album.images[0]?.url ?? "",
                    songUrl: track.external_urls.spotify,
                  }));
                  return;
                }
              }

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ isPlaying: false }));
            } catch (err) {
              console.error("Spotify dev proxy error:", err);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Spotify fetch failed" }));
            }
          });
        },
      },
    ],
    server: {
      cors: true,
    },
    preview: {
      cors: true,
    },
  };
});
