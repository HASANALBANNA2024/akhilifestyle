"use client";
import { useCallback, useEffect, useState } from "react";
import { errorMessage } from "@/lib/errors";

// API থেকে ডাটা এনে loading/error/data দেয়। reload() দিয়ে আবার আনা যায়।
export function useAsync<T>(fn: () => Promise<T>, enabled = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try { setData(await fn()); }
    catch (e) { setError(errorMessage(e)); }
    finally { setLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (enabled) load(); }, [enabled, load]);

  return { data, setData, loading, error, reload: load };
}
