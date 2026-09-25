"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function BookDemo() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "book-a-demo" });
      cal("ui", { hideEventTypeDetails: true, layout: "month_view" });
    })();
  }, []);

  return (
    <Cal
      namespace="book-a-demo"
      calLink="https://cal.com/carbonsynq/book-a-demo"
      style={{ width: "100%" }}
      config={{ layout: "month_view" }}
    />
  );
}