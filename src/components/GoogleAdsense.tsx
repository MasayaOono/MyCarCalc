"use client";

import { useEffect, useRef } from "react";

type Props = {
  slot: string; // 広告ユニットID
  format?: "auto" | "fluid" | "rectangle"; // 広告サイズ
  responsive?: boolean;
  style?: React.CSSProperties;
};

export default function GoogleAdsense({
  slot,
  format = "auto",
  responsive = true,
  style,
}: Props) {
  const isLoaded = useRef(false);

  useEffect(() => {
    // 開発環境では広告を表示しない（誤クリック防止 & エラー回避）
    if (process.env.NODE_ENV === "development") return;

    try {
      // 既に広告が挿入されていなければ push する
      if (!isLoaded.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      }
    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, []);

  // 開発環境用のプレースホルダー
  if (process.env.NODE_ENV === "development") {
    return (
      <div
        style={{
          ...style,
          background: "#E2E8F0",
          color: "#718096",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          border: "1px dashed #CBD5E0",
          borderRadius: "8px",
        }}
      >
        AdSense Preview (Slot: {slot})
      </div>
    );
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX"}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}

// 型定義の拡張
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}
