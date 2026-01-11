import { Suspense } from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Text, Container } from "@chakra-ui/react";
import {
  CAR_MODELS,
  getCarModelById,
  getAllCarModelIds,
  type CarModel,
} from "@/data/car-models";
import SimulationClientPage from "./SimulationClientPage";

// 静的生成 (SSG) - ビルド時に全車種ページを生成
export async function generateStaticParams() {
  return getAllCarModelIds().map((carId) => ({
    carId,
  }));
}

// 動的メタデータ生成（車種別SEO最適化）
type Props = {
  params: Promise<{ carId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { carId } = await params;
  const car = getCarModelById(carId);

  if (!car) {
    return {
      title: "車種が見つかりません | MY CAR CALC",
    };
  }

  const title = `${car.name}の維持費シミュレーション｜月々いくらかかる？ローン・税金・保険込み | MY CAR CALC`;
  const description = `${car.maker}・${car.name}の月々の維持費を徹底シミュレーション。${car.priceRange.popular}万円の人気グレードでローン返済額、自動車税、任意保険、ガソリン代、車検代まで含めたリアルな総額を計算。${car.seo.targetUser}におすすめ。`;

  return {
    title,
    description,
    keywords: [
      car.name,
      car.maker,
      "維持費",
      "シミュレーション",
      "月々",
      "ローン",
      "税金",
      "保険",
      car.bodyType,
      `${car.priceRange.popular}万円`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ja_JP",
      images: [
        {
          url: `/api/og?car=${carId}&price=${car.priceRange.popular}`,
          width: 1200,
          height: 630,
          alt: `${car.name}の維持費シミュレーション`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og?car=${carId}&price=${car.priceRange.popular}`],
    },
    alternates: {
      canonical: `/simulation/${carId}`,
    },
  };
}

// Loading状態のフォールバック
function SimulationLoading() {
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
          読み込み中...
        </Text>
      </Container>
    </Box>
  );
}

export default async function SimulationPage({ params }: Props) {
  const { carId } = await params;
  const car = getCarModelById(carId);

  if (!car) {
    notFound();
  }

  return (
    <Suspense fallback={<SimulationLoading />}>
      <SimulationClientPage car={car} />
    </Suspense>
  );
}
