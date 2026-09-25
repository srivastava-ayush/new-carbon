"use client";
import { useEffect, useMemo } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

type CalConfig = NonNullable<React.ComponentProps<typeof Cal>["config"]>;

const CAL_LINK = "https://cal.com/carbonsynq/book-a-demo";

/**
 * Cal injects its own default palette (gray brand #292929, #d1d5db borders,
 * #f6f7f9 muted surfaces, unset radius). Overriding the CSS variables maps the
 * booker onto CarbonSynq's design tokens so it reads as part of the page.
 */
const THEME_LIGHT: Record<string, string> = {
  "cal-brand": "#188f8b",
  "cal-brand-color": "#188f8b",
  "cal-brand-emphasis": "#0d4f4b",
  "cal-bg": "#ffffff",
  "cal-bg-subtle": "#fbfcfa",
  "cal-bg-muted": "#f2f6f4",
  "cal-bg-emphasis": "#e9f2f0",
  "cal-bg-inverted": "#0b1f1e",
  "cal-bg-brand": "#188f8b",
  "cal-bg-brand-muted": "#e8f5f4",
  "cal-bg-brand-emphasis": "#0d4f4b",
  "cal-bg-primary": "#188f8b",
  "cal-bg-primary-muted": "#e8f5f4",
  "cal-bg-primary-emphasis": "#0d4f4b",
  "cal-text": "#0b1f1e",
  "cal-text-emphasis": "#0b1f1e",
  "cal-text-muted": "#5f706e",
  "cal-text-subtle": "#848484",
  "cal-text-inverted": "#ffffff",
  "cal-border": "#e4e9e7",
  "cal-border-booker": "#e4e9e7",
  "cal-border-emphasis": "#c9d4d1",
  "cal-border-muted": "#eef2f0",
  "cal-border-subtle": "#f2f5f4",
  "cal-radius": "12px",
  "cal-radius-sm": "6px",
  "cal-radius-md": "8px",
  "cal-radius-lg": "10px",
  "cal-radius-xl": "12px",
  "cal-radius-2xl": "16px",
  "cal-radius-3xl": "20px",
};

/** The booker is pinned to light; these exist so a `dark` key is never left unset. */
const THEME_DARK: Record<string, string> = {
  ...THEME_LIGHT,
  "cal-bg": "#0b1f1e",
  "cal-bg-subtle": "#0d2422",
  "cal-bg-muted": "#122b29",
  "cal-bg-emphasis": "#173532",
  "cal-text": "#f4f7f6",
  "cal-text-emphasis": "#ffffff",
  "cal-text-muted": "#9bb0ad",
  "cal-text-subtle": "#7d918f",
  "cal-border": "#1e3a37",
  "cal-border-booker": "#1e3a37",
  "cal-border-emphasis": "#2b4f4b",
  "cal-border-muted": "#17302e",
  "cal-border-subtle": "#122725",
};

export default function BookDemo() {
  const config = useMemo(
    () =>
      ({
        layout: "month_view",
        theme: "light",
        hideEventTypeDetails: true,
        hideBranding: true,
      }) as unknown as CalConfig,
    [],
  );

  useEffect(() => {
    let active = true;
    // CSS variables are applied inside the booker via a `ui` postMessage, not via
    // the URL. The SDK queues this until the iframe reports ready, so it is safe
    // to fire alongside the embed's own init.
    (async () => {
      const cal = await getCalApi({ namespace: "book-a-demo" });
      if (!active) return;
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: true,
        cssVarsPerTheme: { light: THEME_LIGHT, dark: THEME_DARK },
        styles: {
          body: { background: "#ffffff" },
          branding: { brandColor: "#188f8b" },
        },
      });
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="cal-booker w-full">
      <Cal
        namespace="book-a-demo"
        calLink={CAL_LINK}
        config={config}
        style={{ width: "100%" }}
      />
    </div>
  );
}
