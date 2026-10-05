import { fetchProfile, type Profile } from "@/data/customer";
import { useEffect, useState } from 'react';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let live = true;
    const controller = new AbortController();

    fetchProfile(controller.signal)
      .then((row) => {
        if (live) setProfile(row);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        if (live) setProfile(null);
      });

    return () => {
      live = false;
      controller.abort();
    };
  }, []);

  return profile;
}
