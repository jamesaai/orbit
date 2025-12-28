"use client";

import { loginState, workspacestate } from "@/state";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com";

export default function AuthProvider({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [login, setLogin] = useRecoilState(loginState);
  const [workspace] = useRecoilState(workspacestate);
  const router = useRouter();
  const pathname = usePathname();
  const posthogRef = useRef<any>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const req = await axios.get("/api/@me");
        setLogin({ ...req.data.user, workspaces: req.data.workspaces });
        setLoading(false);
      } catch (err: any) {
        console.error("Login check error:", err.response?.data);
        if (err.response?.data.error === "Workspace not setup") {
          router.push("/welcome");
          setLoading(false);
          return;
        }
        if (err.response?.data.error === "Not logged in") {
          if (pathname !== "/login" && pathname !== "/welcome") {
            router.push("/login");
          }
          setLoading(false);
          return;
        }
        setLoading(false);
      }
    };

    checkLogin();
  }, [setLoading, setLogin, router, pathname]);

  useEffect(() => {
    if (!POSTHOG_KEY) return;

    let mounted = true;
    (async () => {
      try {
        const posthog = (await import("posthog-js")).default;
        if (!mounted) return;
        posthog.init(POSTHOG_KEY as string, { api_host: POSTHOG_HOST });
        posthogRef.current = posthog;
      } catch (e) {
        console.error("Failed to init PostHog:", e);
      }
    })();
    return () => {
      mounted = false;
      try {
        posthogRef.current?.reset();
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    try {
      const ph = posthogRef.current;
      if (ph) {
        if (login && login.userId !== 1) {
          try {
            ph.identify(String(login.username), {
              userid: String(login.userId),
              username: login.username,
            });
          } catch (e) {
            console.error("PostHog identify error:", e);
          }
        } else {
          try {
            ph.reset();
          } catch (e) {}
        }
      }
    } catch (e) {
      console.error("PostHog identify error", e);
    }
  }, [login]);

  useEffect(() => {
    (async () => {
      if (!INTERCOM_APP_ID) return;
      if (!login || login.userId === 1 || !login.username) {
        try {
          (window as any).Intercom && (window as any).Intercom("shutdown");
        } catch (e) {}
        return;
      }

      try {
        const cfgResp = await fetch("/api/intercom/config");
        const cfg = cfgResp.ok ? await cfgResp.json() : { configured: false };
        if (!cfg.configured) {
          console.warn(
            "Intercom server-side JWT not configured; skipping Intercom load."
          );
          return;
        }

        const Intercom = (await import("@intercom/messenger-js-sdk")).default;

        const avatar = `${window.location.origin}/avatars/${login.userId}.png`;
        const userId = String(login.userId);
        const payload: any = {
          app_id: INTERCOM_APP_ID,
          name: login.username,
          user_id: userId,
          avatar: { type: "image", image_url: avatar },
        };

        try {
          const r = await fetch("/api/intercom/token", {
            credentials: "same-origin",
          });
          if (r.ok) {
            const j = await r.json();
            if (j.intercom_user_hash) {
              payload.user_hash = j.intercom_user_hash;
            }
          }
        } catch (e) {}

        try {
          Intercom(payload);
        } catch (e) {
          console.error("Failed to initialize Intercom:", e);
        }
      } catch (e) {
        console.error("Intercom init error", e);
      }
    })();
  }, [login]);

  return null;
}

