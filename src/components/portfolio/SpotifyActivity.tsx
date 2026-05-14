import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
}

export function SpotifyActivity() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Error fetching Spotify data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotify();

    
    // Poll every 15 seconds
    const interval = setInterval(fetchSpotify, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div 
        className="mt-6 flex w-full items-center gap-3 rounded-2xl border p-3 backdrop-blur-xl animate-pulse"
        style={{
          backgroundColor: "var(--glass-bg)",
          borderColor: "var(--glass-border)",
        }}
      >
        <div className="h-10 w-10 rounded-md bg-muted/60" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-24 rounded bg-muted/60" />
          <div className="h-2 w-16 rounded bg-muted/60" />
        </div>
      </div>
    );
  }

  if (!data || !data.title) {
    return (
      <div 
        className="mt-6 flex w-full items-center gap-3 rounded-2xl border p-3 backdrop-blur-xl transition-all hover:bg-white/5"
        style={{
          backgroundColor: "var(--glass-bg)",
          borderColor: "var(--glass-border)",
        }}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10">
          <svg className="h-5 w-5 text-green-500/50" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.241 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-muted-foreground">Not Playing</span>
          <span className="text-xs text-muted-foreground/70">Spotify</span>
        </div>
      </div>
    );
  }

  return (
    <motion.a
      href={data.songUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="mt-6 flex w-full items-center gap-3 overflow-hidden rounded-2xl border p-2 backdrop-blur-xl transition-all hover:bg-white/5 dark:hover:bg-white/5 group relative"
      style={{
        backgroundColor: "var(--glass-bg)",
        borderColor: "var(--glass-border)",
      }}
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted/20">
        {data.albumImageUrl ? (
          <img
            src={data.albumImageUrl}
            alt={data.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-green-500/10">
            <Music2 className="h-5 w-5 text-green-500" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.241 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <span className="truncate text-sm font-bold text-foreground group-hover:text-green-400 transition-colors">
          {data.title}
        </span>
        <span className="truncate text-xs text-muted-foreground flex items-center gap-1.5">
          {data.isPlaying ? (
            <span className="text-green-500 font-medium animate-pulse">Listening to</span>
          ) : (
            <span>Recently played</span>
          )}
          <span>•</span>
          <span className="truncate">{data.artist || "Unknown Artist"}</span>
        </span>
      </div>

      {data.isPlaying ? (
        <div className="mr-2 flex h-4 w-4 shrink-0 items-end justify-between gap-0.5">
          <motion.span
            animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
            className="w-1 rounded-full bg-green-500"
          />
          <motion.span
            animate={{ height: ["40%", "100%", "20%", "60%", "40%"] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="w-1 rounded-full bg-green-500"
          />
          <motion.span
            animate={{ height: ["60%", "20%", "100%", "40%", "60%"] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="w-1 rounded-full bg-green-500"
          />
        </div>
      ) : (
        <div className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center">
          <svg className="h-5 w-5 text-muted-foreground/40 group-hover:text-green-500 transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.241 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
      )}
    </motion.a>
  );
}
