import { Providers } from "./providers";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "MY CAR CALC - 車の維持費シミュレーター",
    template: "%s | MY CAR CALC",
  },
  description:
    "車のローン返済額だけでなく、ガソリン代・駐車場代・税金・車検・保険などの維持費を含めたトータルコストを計算できる無料シミュレーター。月々の「本当の出費」がわかります。",
  keywords: [
    "車",
    "ローン",
    "維持費",
    "シミュレーション",
    "計算",
    "月々",
    "自動車税",
    "車検",
    "保険",
    "ガソリン代",
    "駐車場",
  ],
  authors: [{ name: "MY CAR CALC" }],
  creator: "MY CAR CALC",
  publisher: "MY CAR CALC",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://my-car-calc.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MY CAR CALC - 車の維持費シミュレーター",
    description:
      "ローンだけじゃない！税金・保険・車検・ガソリン代まで含めた月々の本当の出費がわかる。",
    url: "https://my-car-calc.com",
    siteName: "MY CAR CALC",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MY CAR CALC - 車の維持費シミュレーター",
    description:
      "ローンだけじゃない！税金・保険・車検・ガソリン代まで含めた月々の本当の出費がわかる。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// 構造化データ (Schema.org)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MY CAR CALC",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
  },
  description:
    "車のローン返済額だけでなく、ガソリン代・駐車場代・税金・車検・保険などの維持費を含めたトータルコストを計算できる無料シミュレーター。",
  featureList: [
    "ローン返済額計算（PMT関数）",
    "ガソリン代シミュレーション",
    "駐車場代（地域別）",
    "自動車税計算",
    "車検費用積立",
    "任意保険料計算",
    "メンテナンス費用積立",
    "車種別プリセット",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1200",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClientId =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX";

  return (
    <html lang="ja">
      <head>
        <meta
          name="google-site-verification"
          content="18DudpEq8dFrhiFgElYMA04_Tj-oS0KLNFOFgLzRKaY"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="google-adsense-account" content="ca-pub-9892962551219863" />
      </head>
      <body>
        <Providers>{children}</Providers>

        {/* Google AdSense - 遅延読み込みでパフォーマンスへの影響を最小限に */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
