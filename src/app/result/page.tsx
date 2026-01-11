import { Suspense } from "react";
import { type Metadata } from "next";
import ResultClientPage from "./ResultClientPage";
import { Box, Text, Container } from "@chakra-ui/react";
import { REGIONS, DEFAULT_REGION, type RegionKey } from "@/data/regions";

// 動的メタデータ生成（SEO最適化）
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const price = params.vehiclePrice?.toString() || "300";
  const regionKey = (params.region as RegionKey) || DEFAULT_REGION;
  const regionName = REGIONS[regionKey]?.name || "全国";

  const title = `${price}万円の車、月々の維持費は？ローン・税金・保険込みで試算 | MY CAR CALC`;
  const description = `車両価格${price}万円の車を購入した場合のリアルな月額費用をシミュレーション。${regionName}エリアでの駐車場代やガソリン代、車検代まで含めた「本当の出費」がわかります。`;

  return {
    title,
    description,
    keywords: [
      "車",
      "ローン",
      "維持費",
      "シミュレーション",
      "月々",
      `${price}万円`,
      "計算",
      "自動車税",
      "車検",
      "保険",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ja_JP",
      images: [
        {
          url: `/api/og?price=${price}&region=${regionKey}`,
          width: 1200,
          height: 630,
          alt: `${price}万円の車の維持費シミュレーション結果`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og?price=${price}&region=${regionKey}`],
    },
    alternates: {
      canonical: `/result?vehiclePrice=${price}&region=${regionKey}`,
    },
  };
}

// Loading状態のフォールバック
function ResultLoading() {
  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.sm" textAlign="center">
        <Text color="gray.500" fontSize="lg">
          計算中...
        </Text>
      </Container>
    </Box>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<ResultLoading />}>
      <ResultClientPage />
    </Suspense>
  );
}
