"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Slider,
  Button,
  SimpleGrid,
  Card,
  Badge,
  Collapsible,
  Flex,
  Grid,
  Dialog,
  Portal,
  IconButton,
  Icon,
  List,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuCar,
  LuFuel,
  LuSquareParking,
  LuShield,
  LuWrench,
  LuReceipt,
  LuWallet,
  LuPercent,
  LuCalendar,
  LuGift,
  LuGauge,
  LuArrowLeft,
  LuInfo,
  LuExternalLink,
  LuLightbulb,
  LuX,
  LuCheck,
} from "react-icons/lu";
import { PRESETS, type PresetKey } from "@/data/presets";
import { REGIONS, type RegionKey } from "@/data/regions";
import { BREAKDOWN_ADVICE, type AdviceContent } from "@/data/advice";
import {
  calculateTotalMonthlyCost,
  DEFAULT_INPUT,
  type CalcInput,
  type EntryInput,
  getRegionDefaults,
} from "@/lib/calculate";
import { type CarModel } from "@/data/car-models";
import GoogleAdsense from "@/components/GoogleAdsense";
import { SmartInput } from "@/components/ui/SmartInput";

// アニメーション定義
const fadeUpStyle = `
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-up {
    opacity: 0;
    animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

// 車種固有の維持費オーバーライド
type CarOverrides = {
  fuelEfficiency?: number;
  annualTax?: number;
  shakenCost?: number;
  maintenanceYearly?: number;
  insuranceMonthly?: number;
};

type Props = {
  entryData: EntryInput;
  onBack: () => void;
  carModel?: CarModel; // 車種別ページ用
  carOverrides?: CarOverrides; // 車種固有の初期値
};

// 広告コンポーネント（レクタングル大）
const AdSlotLarge = () => (
  <Box py={2}>
    <Text fontSize="xs" color="gray.400" textAlign="center" mb={1}>
      スポンサーリンク
    </Text>
    <Box
      minH="250px"
      maxW="100%"
      bg="gray.100"
      rounded="xl"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <GoogleAdsense
        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE || "0000000000"}
        format="rectangle"
        style={{ width: "100%", maxWidth: "300px", height: "250px" }}
      />
    </Box>
  </Box>
);

// アドバイスダイアログコンポーネント（コンテキスト広告付き）
const AdviceDialog = ({
  content,
  isOpen,
  onClose,
}: {
  content: AdviceContent | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!content) return null;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      size="sm"
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" />
        <Dialog.Positioner>
          <Dialog.Content rounded="2xl" bg="white" overflow="hidden" mx={4}>
            {/* ヘッダー */}
            <Dialog.Header
              bg="gray.50"
              py={4}
              px={5}
              borderBottom="1px solid"
              borderColor="gray.100"
            >
              <HStack justify="space-between" w="full">
                <HStack gap={2}>
                  <Icon color="blue.500">
                    <LuLightbulb />
                  </Icon>
                  <Dialog.Title
                    fontSize="md"
                    fontWeight="bold"
                    color="gray.800"
                  >
                    {content.title}
                  </Dialog.Title>
                </HStack>
                <Dialog.CloseTrigger asChild>
                  <IconButton
                    aria-label="閉じる"
                    variant="ghost"
                    size="sm"
                    color="gray.400"
                    _hover={{ color: "gray.600", bg: "gray.100" }}
                  >
                    <LuX />
                  </IconButton>
                </Dialog.CloseTrigger>
              </HStack>
            </Dialog.Header>

            <Dialog.Body p={5}>
              <VStack align="stretch" gap={5}>
                {/* アドバイス本文 */}
                <Text fontSize="sm" color="gray.600" lineHeight="tall">
                  {content.description}
                </Text>

                {/* 節約ポイントリスト */}
                <Box bg="blue.50" rounded="lg" p={4}>
                  <Text fontSize="xs" fontWeight="bold" color="blue.700" mb={2}>
                    💡 節約ポイント
                  </Text>
                  <List.Root gap={2}>
                    {content.tips.map((tip, i) => (
                      <List.Item key={i} fontSize="xs" color="gray.600">
                        <List.Indicator asChild color="blue.500">
                          <LuCheck />
                        </List.Indicator>
                        {tip}
                      </List.Item>
                    ))}
                  </List.Root>
                </Box>

                {/* 🔥 コンテキスト広告エリア */}
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="gray.400" mb={2}>
                    PR: おすすめサービス
                  </Text>

                  {/* 広告カード */}
                  <Box
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      // アフィリエイトリンクを開く
                      window.open(
                        content.affiliateUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    bg="white"
                    border="2px solid"
                    borderColor="blue.100"
                    rounded="xl"
                    p={4}
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: "blue.300",
                      shadow: "md",
                      transform: "translateY(-1px)",
                    }}
                  >
                    <HStack gap={3}>
                      {/* サムネイル */}
                      <Box
                        boxSize="56px"
                        bg="blue.50"
                        rounded="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        <Text fontSize="xs" fontWeight="900" color="blue.500">
                          AD
                        </Text>
                      </Box>

                      {/* テキスト */}
                      <VStack align="start" gap={1} flex={1}>
                        <Text
                          fontSize="sm"
                          fontWeight="bold"
                          color="gray.800"
                          lineClamp={1}
                        >
                          {content.adTitle}
                        </Text>
                        <Text fontSize="xs" color="gray.500" lineClamp={2}>
                          {content.adDescription}
                        </Text>
                      </VStack>
                    </HStack>

                    {/* CTA ボタン */}
                    <Button
                      size="sm"
                      w="full"
                      mt={3}
                      bgGradient="to-r"
                      gradientFrom="blue.500"
                      gradientTo="teal.400"
                      color="white"
                      fontWeight="bold"
                      _hover={{ opacity: 0.9 }}
                    >
                      {content.adCta}
                      <Icon ml={1}>
                        <LuExternalLink />
                      </Icon>
                    </Button>
                  </Box>
                </Box>
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

// 広告コンポーネント（ネイティブ風）
const AdSlotNative = () => (
  <Box py={2}>
    <Text fontSize="xs" color="gray.400" textAlign="center" mb={1}>
      スポンサーリンク
    </Text>
    <Box
      minH="100px"
      bg="gray.100"
      rounded="xl"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <GoogleAdsense
        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_NATIVE || "0000000001"}
        format="fluid"
        style={{ width: "100%", minHeight: "100px" }}
      />
    </Box>
  </Box>
);

export default function ResultDashboard({
  entryData,
  onBack,
  carModel,
  carOverrides,
}: Props) {
  // --- State (状態管理) ---
  // A. ローン関連（エントリー画面から引き継ぎ）
  const [vehiclePrice, setVehiclePrice] = useState(entryData.vehiclePrice);
  const [downPayment, setDownPayment] = useState(entryData.downPayment);
  const [interestRate, setInterestRate] = useState(entryData.interestRate);
  const [loanYears, setLoanYears] = useState(DEFAULT_INPUT.loanYears);
  const [bonusPayment, setBonusPayment] = useState(DEFAULT_INPUT.bonusPayment);

  // B. 走行・維持費（地域から初期値を設定、carOverridesがあれば優先）
  const regionDefaults = getRegionDefaults(entryData.region);
  const [region] = useState<RegionKey>(entryData.region);
  const [parkingFee, setParkingFee] = useState(regionDefaults.parkingFee);
  const [gasPrice, setGasPrice] = useState(regionDefaults.gasPrice);
  const [fuelEfficiency, setFuelEfficiency] = useState(
    carOverrides?.fuelEfficiency ?? DEFAULT_INPUT.fuelEfficiency
  );
  const [annualMileage, setAnnualMileage] = useState(
    DEFAULT_INPUT.annualMileage
  );

  // C. 税金・保険・メンテ（carOverridesがあれば優先）
  const [annualTax, setAnnualTax] = useState(
    carOverrides?.annualTax ?? DEFAULT_INPUT.annualTax
  );
  const [insuranceMonthly, setInsuranceMonthly] = useState(
    carOverrides?.insuranceMonthly ?? DEFAULT_INPUT.insuranceMonthly
  );
  const [shakenCost, setShakenCost] = useState(
    carOverrides?.shakenCost ?? DEFAULT_INPUT.shakenCost
  );
  const [maintenanceYearly, setMaintenanceYearly] = useState(
    carOverrides?.maintenanceYearly ?? DEFAULT_INPUT.maintenanceYearly
  );

  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<PresetKey | null>(null);
  const [selectedAdvice, setSelectedAdvice] = useState<AdviceContent | null>(
    null
  );

  // アドバイスダイアログ制御
  const handleOpenAdvice = (key: string) => {
    const content = BREAKDOWN_ADVICE[key];
    if (content) {
      setSelectedAdvice(content);
    }
  };

  const handleCloseAdvice = () => {
    setSelectedAdvice(null);
  };

  // --- 計算 ---
  const calcInput: CalcInput = useMemo(
    () => ({
      vehiclePrice,
      downPayment,
      interestRate,
      loanYears,
      bonusPayment,
      region,
      parkingFee,
      gasPrice,
      fuelEfficiency,
      annualMileage,
      annualTax,
      insuranceMonthly,
      shakenCost,
      maintenanceYearly,
    }),
    [
      vehiclePrice,
      downPayment,
      interestRate,
      loanYears,
      bonusPayment,
      region,
      parkingFee,
      gasPrice,
      fuelEfficiency,
      annualMileage,
      annualTax,
      insuranceMonthly,
      shakenCost,
      maintenanceYearly,
    ]
  );

  const result = useMemo(
    () => calculateTotalMonthlyCost(calcInput),
    [calcInput]
  );

  // --- プリセット適用 ---
  const applyPreset = (key: PresetKey) => {
    const preset = PRESETS[key];
    setFuelEfficiency(preset.fuelEfficiency);
    setAnnualTax(preset.annualTax);
    setShakenCost(preset.shakenCost);
    setMaintenanceYearly(preset.maintenanceYearly);
    setInsuranceMonthly(preset.insuranceMonthly);
    setSelectedPreset(key);
  };

  return (
    <Box minH="100vh" bg="gray.50" pb={20}>
      {/* CSSアニメーションの注入 */}
      <style>{fadeUpStyle}</style>

      {/* ヘッダーバー（アプリっぽさを出す・即座に表示） */}
      <Box
        bg="white"
        shadow="sm"
        py={{ base: 3, md: 4 }}
        mb={{ base: 4, md: 6 }}
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Container maxW="container.sm" px={{ base: 4, md: 6 }}>
          <Flex justify="space-between" align="center">
            <HStack gap={2}>
              <Box color="blue.500">
                {carModel ? (
                  <Text fontSize="xl">{carModel.emoji}</Text>
                ) : (
                  <LuCar />
                )}
              </Box>
              <Text fontWeight="bold" color="gray.800">
                {carModel ? `${carModel.name}の維持費` : "マイカーローン計算"}
              </Text>
            </HStack>
            <Button
              size="xs"
              variant="ghost"
              onClick={onBack}
              color="gray.500"
              _hover={{ color: "gray.700" }}
            >
              <LuArrowLeft />
              {carModel ? "車種一覧へ" : "条件入力へ"}
            </Button>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.sm" px={{ base: 4, md: 6 }}>
        <VStack gap={{ base: 4, md: 6 }} align="stretch">
          {/* 車種情報カード（車種別ページのみ表示）- 0.05秒遅れ */}
          {carModel && (
            <Box
              className="animate-fade-up"
              style={{ animationDelay: "0.05s" }}
            >
              <Card.Root bg="white" shadow="md" rounded="xl" overflow="hidden">
                <Box
                  bgGradient="to-r"
                  gradientFrom="blue.500"
                  gradientTo="teal.400"
                  p={4}
                >
                  <HStack justify="space-between">
                    <VStack align="start" gap={0}>
                      <Text fontSize="sm" color="whiteAlpha.800">
                        {carModel.maker}
                      </Text>
                      <Text fontSize="2xl" fontWeight="bold" color="white">
                        {carModel.name}
                      </Text>
                    </VStack>
                    <Text fontSize="4xl">{carModel.emoji}</Text>
                  </HStack>
                </Box>
                <Card.Body p={4}>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" color="gray.500">
                      {carModel.bodyType}
                    </Text>
                    <Badge
                      bg="blue.100"
                      color="blue.700"
                      px={2}
                      py={0.5}
                      rounded="full"
                      fontSize="xs"
                    >
                      {carModel.priceRange.min}〜{carModel.priceRange.max}万円
                    </Badge>
                  </HStack>
                  <VStack align="start" gap={1}>
                    {carModel.seo.features.map((feature, i) => (
                      <HStack key={i} gap={2} fontSize="xs" color="gray.600">
                        <LuCheck color="var(--chakra-colors-green-500)" />
                        <Text>{feature}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Card.Body>
              </Card.Root>
            </Box>
          )}

          {/* ===== 1. 結果カード（一番目立たせる）- 0.1秒遅れ ===== */}
          <Box className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <Card.Root
              bg="white"
              shadow="xl"
              rounded="2xl"
              border="none"
              overflow="hidden"
            >
              {/* グラデーションの装飾 */}
              <Box
                bgGradient="to-r"
                gradientFrom="blue.50"
                gradientTo="teal.50"
                p={{ base: 4, md: 6 }}
                textAlign="center"
              >
                <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>
                  月々のお支払い目安
                </Text>
                <Flex justify="center" align="baseline" gap={1} wrap="wrap">
                  <Text
                    fontSize={{ base: "4xl", md: "5xl" }}
                    fontWeight="900"
                    color="blue.600"
                    letterSpacing="tight"
                    lineHeight="1.1"
                  >
                    {result.total.toLocaleString()}
                  </Text>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                    color="gray.500"
                  >
                    円
                  </Text>
                </Flex>

                {/* バッジ：パステルカラー */}
                <HStack
                  justify="center"
                  mt={3}
                  gap={{ base: 2, md: 3 }}
                  flexWrap="wrap"
                >
                  <Badge
                    bg="blue.100"
                    color="blue.700"
                    px={{ base: 2, md: 3 }}
                    py={1}
                    rounded="full"
                    fontSize={{ base: "2xs", md: "xs" }}
                  >
                    ローン {result.loanTotal.toLocaleString()}円
                  </Badge>
                  <Badge
                    bg="orange.100"
                    color="orange.700"
                    px={{ base: 2, md: 3 }}
                    py={1}
                    rounded="full"
                    fontSize={{ base: "2xs", md: "xs" }}
                  >
                    維持費 {result.maintenanceTotal.toLocaleString()}円
                  </Badge>
                </HStack>
              </Box>

              <Card.Body p={{ base: 4, md: 6 }}>
                {/* カラーバー（彩度を調整） */}
                <Box mb={{ base: 3, md: 4 }}>
                  <Flex
                    gap={1}
                    h="12px"
                    rounded="full"
                    overflow="hidden"
                    bg="gray.100"
                  >
                    <Box
                      flex={
                        result.breakdown.loan + result.breakdown.bonusAverage
                      }
                      bg="blue.400"
                      transition="flex 0.3s"
                    />
                    <Box
                      flex={result.breakdown.gas}
                      bg="teal.400"
                      transition="flex 0.3s"
                    />
                    <Box
                      flex={result.breakdown.parking}
                      bg="orange.400"
                      transition="flex 0.3s"
                    />
                    <Box
                      flex={
                        result.breakdown.insurance +
                        result.breakdown.tax +
                        result.breakdown.shaken +
                        result.breakdown.maintenance
                      }
                      bg="gray.300"
                      transition="flex 0.3s"
                    />
                  </Flex>
                  <Flex justify="space-between" mt={1}>
                    <Text fontSize="xs" color="gray.500">
                      ローン
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      維持費
                    </Text>
                  </Flex>
                </Box>

                {/* 内訳詳細ボタン */}
                <Button
                  variant="outline"
                  size="sm"
                  w="full"
                  color="gray.600"
                  borderColor="gray.300"
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  _hover={{ bg: "gray.50" }}
                >
                  {showBreakdown ? "内訳を閉じる" : "内訳を詳しく見る"}
                  {showBreakdown ? <LuChevronUp /> : <LuChevronDown />}
                </Button>

                {showBreakdown && (
                  <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={{ base: 2, md: 3 }}
                    mt={{ base: 3, md: 4 }}
                  >
                    <BreakdownItem
                      icon={<LuWallet />}
                      label="ローン"
                      value={result.breakdown.loan}
                      color="blue.500"
                      adviceKey="loan"
                      onOpenAdvice={handleOpenAdvice}
                    />
                    <BreakdownItem
                      icon={<LuGift />}
                      label="ボーナス月割"
                      value={result.breakdown.bonusAverage}
                      color="blue.400"
                      adviceKey="bonus"
                      onOpenAdvice={handleOpenAdvice}
                    />
                    <BreakdownItem
                      icon={<LuFuel />}
                      label="ガソリン"
                      value={result.breakdown.gas}
                      color="teal.500"
                      adviceKey="gas"
                      onOpenAdvice={handleOpenAdvice}
                    />
                    <BreakdownItem
                      icon={<LuSquareParking />}
                      label="駐車場"
                      value={result.breakdown.parking}
                      color="orange.500"
                      adviceKey="parking"
                      onOpenAdvice={handleOpenAdvice}
                    />
                    <BreakdownItem
                      icon={<LuShield />}
                      label="保険"
                      value={result.breakdown.insurance}
                      color="green.500"
                      adviceKey="insurance"
                      onOpenAdvice={handleOpenAdvice}
                    />
                    <BreakdownItem
                      icon={<LuReceipt />}
                      label="税金+車検"
                      value={result.breakdown.tax + result.breakdown.shaken}
                      color="pink.500"
                      adviceKey="shaken"
                      onOpenAdvice={handleOpenAdvice}
                    />
                    <BreakdownItem
                      icon={<LuWrench />}
                      label="メンテ積立"
                      value={result.breakdown.maintenance}
                      color="purple.500"
                      adviceKey="maintenance"
                      onOpenAdvice={handleOpenAdvice}
                    />
                  </Grid>
                )}

                {/* 年間コスト */}
                <Box mt={4} p={3} bg="gray.50" rounded="lg" textAlign="center">
                  <Text fontSize="sm" color="gray.600">
                    年間の総支払い額:{" "}
                    <Text as="span" fontWeight="bold" color="gray.800">
                      {result.yearlyTotal.toLocaleString()}円
                    </Text>
                  </Text>
                </Box>
              </Card.Body>
            </Card.Root>
          </Box>

          {/* 🔥 広告スロット A（レクタングル）- 0.2秒遅れ */}
          <Box
            className="animate-fade-up"
            style={{ animationDelay: "0.2s" }}
            w="full"
            overflow="hidden"
          >
            <AdSlotLarge />
          </Box>

          {/* ===== 2. 基本設定 - 0.3秒遅れ ===== */}
          <Box className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Card.Root bg="white" shadow="md" rounded="xl">
              <Card.Header pb={2} px={6} pt={5}>
                <Heading size="sm" color="gray.700">
                  条件を調整する
                </Heading>
              </Card.Header>
              <Card.Body
                gap={{ base: 5, md: 6 }}
                px={{ base: 4, md: 6 }}
                pb={{ base: 5, md: 6 }}
              >
                {/* 車両価格スライダー */}
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <HStack gap={2}>
                      <LuCar color="var(--chakra-colors-blue-500)" />
                      <Text fontSize="sm" fontWeight="bold" color="gray.600">
                        車両価格
                      </Text>
                    </HStack>
                    <Text fontWeight="900" fontSize="xl" color="blue.600">
                      {vehiclePrice}
                      <Text as="span" fontSize="sm" color="gray.500" ml={1}>
                        万円
                      </Text>
                    </Text>
                  </HStack>
                  <Slider.Root
                    min={50}
                    max={1500}
                    step={10}
                    value={[vehiclePrice]}
                    onValueChange={(d) => setVehiclePrice(d.value[0])}
                    colorPalette="blue"
                  >
                    <Slider.Control>
                      <Slider.Track h="10px" bg="gray.100" rounded="full">
                        <Slider.Range />
                      </Slider.Track>
                      <Slider.Thumb
                        index={0}
                        boxSize={{ base: 7, md: 6 }}
                        border="3px solid"
                        borderColor="white"
                        shadow="md"
                      />
                    </Slider.Control>
                  </Slider.Root>
                </Box>

                {/* 頭金スライダー */}
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <HStack gap={2}>
                      <LuWallet color="var(--chakra-colors-green-500)" />
                      <Text fontSize="sm" fontWeight="bold" color="gray.600">
                        頭金
                      </Text>
                    </HStack>
                    <Text fontWeight="900" fontSize="xl" color="green.600">
                      {downPayment}
                      <Text as="span" fontSize="sm" color="gray.500" ml={1}>
                        万円
                      </Text>
                    </Text>
                  </HStack>
                  <Slider.Root
                    min={0}
                    max={vehiclePrice}
                    step={10}
                    value={[downPayment]}
                    onValueChange={(d) => setDownPayment(d.value[0])}
                    colorPalette="green"
                  >
                    <Slider.Control>
                      <Slider.Track h="10px" bg="gray.100" rounded="full">
                        <Slider.Range />
                      </Slider.Track>
                      <Slider.Thumb
                        index={0}
                        boxSize={{ base: 7, md: 6 }}
                        border="3px solid"
                        borderColor="white"
                        shadow="md"
                      />
                    </Slider.Control>
                  </Slider.Root>
                </Box>
              </Card.Body>
            </Card.Root>
          </Box>

          {/* ===== 3. 車種プリセット - 0.4秒遅れ ===== */}
          <Box className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Box>
              <Text
                fontSize="sm"
                fontWeight="bold"
                color="gray.600"
                mb={3}
                ml={1}
              >
                車種のタイプで維持費を自動入力
              </Text>
              <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 2, md: 3 }}>
                {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
                  <PresetCard
                    key={key}
                    emoji={PRESETS[key].emoji}
                    label={PRESETS[key].label}
                    isSelected={selectedPreset === key}
                    onClick={() => applyPreset(key)}
                  />
                ))}
              </SimpleGrid>
              {selectedPreset && (
                <Text fontSize="xs" color="gray.500" mt={2} textAlign="center">
                  {PRESETS[selectedPreset].description}
                </Text>
              )}
            </Box>
          </Box>

          {/* 🔥 広告スロット B（ネイティブ風）- 0.5秒遅れ */}
          <Box
            className="animate-fade-up"
            style={{ animationDelay: "0.5s" }}
            w="full"
            overflow="hidden"
          >
            <AdSlotNative />
          </Box>

          {/* ===== 4. 詳細設定 - 0.6秒遅れ ===== */}
          <Box className="animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <Collapsible.Root
              open={isOpen}
              onOpenChange={(d) => setIsOpen(d.open)}
            >
              <Collapsible.Trigger asChild>
                <Button
                  variant="outline"
                  w="full"
                  color="gray.600"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.50" }}
                  justifyContent="space-between"
                >
                  <HStack>
                    <LuWrench />
                    <Text>詳細な条件を設定</Text>
                  </HStack>
                  {isOpen ? <LuChevronUp /> : <LuChevronDown />}
                </Button>
              </Collapsible.Trigger>

              <Collapsible.Content>
                <Card.Root mt={4} bg="white" shadow="sm" rounded="xl">
                  <Card.Body gap={{ base: 4, md: 6 }} p={{ base: 4, md: 6 }}>
                    {/* A. ローン詳細 */}
                    <Box>
                      <Text
                        fontSize="xs"
                        color="blue.600"
                        fontWeight="bold"
                        mb={3}
                      >
                        ローン設定
                      </Text>
                      <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
                        <ModernInput
                          icon={<LuPercent />}
                          label="金利 (%)"
                          value={interestRate}
                          onChange={(v) => setInterestRate(v)}
                          step={0.1}
                        />
                        <ModernInput
                          icon={<LuCalendar />}
                          label="返済期間 (年)"
                          value={loanYears}
                          onChange={(v) => setLoanYears(v)}
                        />
                        <ModernInput
                          icon={<LuGift />}
                          label="ボーナス払い (万円/回)"
                          value={bonusPayment}
                          onChange={(v) => setBonusPayment(v)}
                        />
                      </SimpleGrid>
                    </Box>

                    {/* B. 走行・燃料 */}
                    <Box>
                      <Text
                        fontSize="xs"
                        color="teal.600"
                        fontWeight="bold"
                        mb={3}
                      >
                        走行コスト
                      </Text>
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                        <ModernInput
                          icon={<LuSquareParking />}
                          label="駐車場 (円/月)"
                          value={parkingFee}
                          onChange={(v) => setParkingFee(v)}
                        />
                        <ModernInput
                          icon={<LuFuel />}
                          label="ガソリン単価 (円/L)"
                          value={gasPrice}
                          onChange={(v) => setGasPrice(v)}
                        />
                        <ModernInput
                          icon={<LuGauge />}
                          label="燃費 (km/L)"
                          value={fuelEfficiency}
                          onChange={(v) => setFuelEfficiency(v)}
                          step={0.1}
                        />
                        <ModernInput
                          icon={<LuCar />}
                          label="年間走行距離 (km)"
                          value={annualMileage}
                          onChange={(v) => setAnnualMileage(v)}
                          step={1000}
                        />
                      </SimpleGrid>
                    </Box>

                    {/* C. 税金・保険・メンテ */}
                    <Box>
                      <Text
                        fontSize="xs"
                        color="orange.600"
                        fontWeight="bold"
                        mb={3}
                      >
                        税金・保険・メンテナンス
                      </Text>
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                        <ModernInput
                          icon={<LuReceipt />}
                          label="自動車税 (円/年)"
                          value={annualTax}
                          onChange={(v) => setAnnualTax(v)}
                        />
                        <ModernInput
                          icon={<LuShield />}
                          label="任意保険 (円/月)"
                          value={insuranceMonthly}
                          onChange={(v) => setInsuranceMonthly(v)}
                        />
                        <ModernInput
                          icon={<LuReceipt />}
                          label="車検 (円/2年)"
                          value={shakenCost}
                          onChange={(v) => setShakenCost(v)}
                        />
                        <ModernInput
                          icon={<LuWrench />}
                          label="メンテ積立 (円/年)"
                          value={maintenanceYearly}
                          onChange={(v) => setMaintenanceYearly(v)}
                        />
                      </SimpleGrid>
                    </Box>
                  </Card.Body>
                </Card.Root>
              </Collapsible.Content>
            </Collapsible.Root>
          </Box>

          {/* 地域情報 - 0.7秒遅れ */}
          <Box className="animate-fade-up" style={{ animationDelay: "0.7s" }}>
            <Text textAlign="center" fontSize="xs" color="gray.500">
              選択地域: {REGIONS[region].name}
            </Text>

            {/* フッター */}
            <Text textAlign="center" fontSize="xs" color="gray.500">
              ※ 計算結果はあくまで目安です。実際の費用は条件により異なります。
            </Text>
          </Box>
        </VStack>
      </Container>

      {/* アドバイスダイアログ */}
      <AdviceDialog
        content={selectedAdvice}
        isOpen={!!selectedAdvice}
        onClose={handleCloseAdvice}
      />
    </Box>
  );
}

// ===== コンポーネント =====

// プリセットカード
const PresetCard = ({
  emoji,
  label,
  isSelected,
  onClick,
}: {
  emoji: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <Box
    as="button"
    onClick={onClick}
    w="100%"
    h={{ base: "70px", md: "80px" }}
    minH="44px"
    bg={isSelected ? "blue.50" : "white"}
    border={isSelected ? "2px solid" : "1px solid"}
    borderColor={isSelected ? "blue.400" : "gray.200"}
    borderRadius="xl"
    transition="all 0.2s"
    _hover={{
      transform: "translateY(-2px)",
      shadow: "md",
      borderColor: isSelected ? "blue.400" : "gray.300",
    }}
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    gap={1}
    shadow="sm"
  >
    <Text fontSize={{ base: "xl", md: "2xl" }}>{emoji}</Text>
    <Text
      fontSize="2xs"
      fontWeight="bold"
      color={isSelected ? "blue.600" : "gray.600"}
    >
      {label}
    </Text>
  </Box>
);

// モダン入力フィールド
const ModernInput = ({
  icon,
  label,
  value,
  onChange,
  step = 1,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) => (
  <Box
    bg="gray.50"
    borderRadius="lg"
    px={3}
    py={2}
    transition="all 0.2s"
    border="1px solid"
    borderColor="gray.200"
    _focusWithin={{ bg: "white", borderColor: "blue.400" }}
  >
    <HStack gap={1} mb={1}>
      <Box color="gray.500" fontSize="xs">
        {icon}
      </Box>
      <Text fontSize="xs" color="gray.500" fontWeight="bold">
        {label}
      </Text>
    </HStack>
    <SmartInput
      inputMode="decimal"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      step={step}
      fontSize={{ base: "md", md: "lg" }}
      textAlign="left"
    />
  </Box>
);

// 内訳アイテム（詳しくボタン付き）
const BreakdownItem = ({
  icon,
  label,
  value,
  color,
  adviceKey,
  onOpenAdvice,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  adviceKey?: string;
  onOpenAdvice?: (key: string) => void;
}) => (
  <HStack
    justify="space-between"
    bg="gray.50"
    px={3}
    py={2}
    rounded="lg"
    fontSize="xs"
  >
    <HStack gap={1} color={color}>
      {icon}
      <Text color="gray.600">{label}</Text>
      {/* 詳しくボタン */}
      {adviceKey && onOpenAdvice && (
        <IconButton
          aria-label="詳しく見る"
          variant="ghost"
          size="2xs"
          color="gray.400"
          minW="auto"
          h="auto"
          p={0.5}
          rounded="full"
          _hover={{ color: "blue.500", bg: "blue.50" }}
          onClick={(e) => {
            e.stopPropagation();
            onOpenAdvice(adviceKey);
          }}
        >
          <LuInfo size={12} />
        </IconButton>
      )}
    </HStack>
    <Text fontWeight="bold" color="gray.800">
      ¥{value.toLocaleString()}
    </Text>
  </HStack>
);
