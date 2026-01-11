"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Card,
  Collapsible,
  HStack,
  createListCollection,
  Icon,
} from "@chakra-ui/react";
import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import {
  LuArrowRight,
  LuChevronDown,
  LuChevronUp,
  LuPercent,
  LuCalculator,
  LuMapPin,
  LuWallet,
} from "react-icons/lu";
import { REGION_OPTIONS, type RegionKey } from "@/data/regions";
import { type EntryInput, DEFAULT_ENTRY_INPUT } from "@/lib/calculate";
import SeoContentSection from "./SeoContentSection";
import CalculationLoader from "./CalculationLoader";

type Props = {
  onStart: (data: EntryInput) => void;
};

export default function EntryScreen({ onStart }: Props) {
  const [vehiclePrice, setVehiclePrice] = useState(
    DEFAULT_ENTRY_INPUT.vehiclePrice
  );
  const [downPayment, setDownPayment] = useState(
    DEFAULT_ENTRY_INPUT.downPayment
  );
  const [region, setRegion] = useState<RegionKey>(DEFAULT_ENTRY_INPUT.region);
  const [interestRate, setInterestRate] = useState(
    DEFAULT_ENTRY_INPUT.interestRate
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const regionCollection = createListCollection({
    items: REGION_OPTIONS,
  });

  const handleStart = () => {
    // 1. ローダーを表示
    setIsCalculating(true);

    // 2. あえて2.5秒待つ (Labor Illusionの演出)
    setTimeout(() => {
      // 3. データ受け渡し & 画面遷移を実行
      onStart({
        vehiclePrice,
        downPayment,
        region,
        interestRate,
      });
    }, 2500);
  };

  return (
    <Box minH="100vh" bg="gray.50" pt={{ base: 8, md: 12 }} pb={20}>
      {/* 計算中ローダー */}
      {isCalculating && <CalculationLoader />}

      <Container maxW="container.sm" px={{ base: 4, md: 6 }}>
        <VStack gap={8} align="stretch">
          {/* ヘッダー */}
          <VStack textAlign="center" gap={4}>
            <Box
              p={4}
              bg="blue.50"
              color="blue.600"
              rounded="2xl"
              fontSize="3xl"
              shadow="sm"
            >
              <LuCalculator />
            </Box>
            <VStack gap={1}>
              <Heading
                size="xl"
                color="gray.800"
                fontWeight="900"
                letterSpacing="tight"
              >
                マイカーローン計算
              </Heading>
              <Text
                color="gray.500"
                fontSize="sm"
                fontWeight="medium"
                lineHeight="tall"
                textAlign="center"
              >
                維持費・税金・保険料まで含めた
                <br />
                <Text as="span" color="blue.600" fontWeight="bold">
                  「リアルな月々の出費」
                </Text>
                をチェックしましょう
              </Text>
            </VStack>
          </VStack>

          {/* 入力フォームカード */}
          <Card.Root
            bg="white"
            shadow="xl"
            rounded="2xl"
            border="none"
            overflow="hidden"
          >
            {/* 装飾ライン */}
            <Box
              h="6px"
              bgGradient="to-r"
              gradientFrom="blue.500"
              gradientTo="cyan.400"
            />

            <Card.Body gap={8} p={{ base: 6, md: 8 }}>
              {/* 1. 車両価格 (メイン) */}
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={3}>
                  車両価格（税込）
                </Text>
                <HStack
                  bg="gray.50"
                  rounded="xl"
                  border="1px solid"
                  borderColor="gray.200"
                  px={4}
                  py={2}
                  transition="all 0.2s"
                  _focusWithin={{
                    ring: "2px",
                    ringColor: "blue.100",
                    borderColor: "blue.400",
                    bg: "white",
                  }}
                >
                  <Input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    variant="flushed"
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="900"
                    textAlign="center"
                    border="none"
                    p={0}
                    color="gray.800"
                    _focus={{ outline: "none" }}
                    placeholder="0"
                  />
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="gray.400"
                    whiteSpace="nowrap"
                  >
                    万円
                  </Text>
                </HStack>
              </Box>

              {/* 2. 頭金 (縦積み) */}
              <Box>
                <HStack mb={2} color="gray.500">
                  <LuWallet />
                  <Text fontSize="sm" fontWeight="bold" color="gray.700">
                    頭金
                  </Text>
                </HStack>
                <HStack
                  bg="white"
                  rounded="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  px={4}
                  h="56px"
                  _focusWithin={{
                    borderColor: "blue.400",
                    ring: "2px",
                    ringColor: "blue.100",
                  }}
                >
                  <Input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    variant="flushed"
                    border="none"
                    fontSize="xl"
                    fontWeight="bold"
                    color="gray.800"
                    placeholder="0"
                    _focus={{ outline: "none" }}
                  />
                  <Text color="gray.400" fontWeight="bold">
                    万円
                  </Text>
                </HStack>
              </Box>

              {/* 3. 地域 (縦積み) */}
              <Box>
                <HStack mb={2} color="gray.500">
                  <LuMapPin />
                  <Text fontSize="sm" fontWeight="bold" color="gray.700">
                    お住まいの地域
                  </Text>
                </HStack>
                <SelectRoot
                  collection={regionCollection}
                  value={[region]}
                  onValueChange={(e) => setRegion(e.value[0] as RegionKey)}
                  size="lg"
                >
                  <SelectTrigger
                    h="56px"
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    rounded="lg"
                    px={4}
                    _hover={{ borderColor: "gray.300" }}
                  >
                    <SelectValueText placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGION_OPTIONS.map((option) => (
                      <SelectItem key={option.value} item={option}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
                <Text fontSize="xs" color="gray.400" mt={1.5} ml={1}>
                  ※ 地域のガソリン代・駐車場代の目安を自動設定します
                </Text>
              </Box>

              {/* 詳細設定 (金利) */}
              <Collapsible.Root
                open={showAdvanced}
                onOpenChange={(d) => setShowAdvanced(d.open)}
              >
                <Collapsible.Trigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    w="full"
                    color="gray.500"
                    fontWeight="normal"
                    _hover={{ bg: "gray.50", color: "gray.800" }}
                  >
                    {showAdvanced ? "詳細設定を閉じる" : "金利を調整する"}
                    {showAdvanced ? <LuChevronUp /> : <LuChevronDown />}
                  </Button>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <Box
                    mt={4}
                    p={4}
                    bg="gray.50"
                    rounded="xl"
                    border="1px dashed"
                    borderColor="gray.300"
                  >
                    <HStack gap={2} mb={2}>
                      <LuPercent color="var(--chakra-colors-gray-400)" />
                      <Text fontSize="sm" color="gray.600" fontWeight="bold">
                        金利（実質年率）
                      </Text>
                    </HStack>
                    <HStack
                      bg="white"
                      rounded="lg"
                      border="1px solid"
                      borderColor="gray.200"
                      px={3}
                      h="48px"
                    >
                      <Input
                        type="number"
                        inputMode="decimal"
                        step={0.1}
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(Number(e.target.value))
                        }
                        variant="flushed"
                        border="none"
                        fontWeight="bold"
                        fontSize="lg"
                        _focus={{ outline: "none" }}
                      />
                      <Text color="gray.400" fontWeight="bold">
                        %
                      </Text>
                    </HStack>
                    <Text fontSize="xs" color="gray.400" mt={2}>
                      ※ 銀行系: 1〜2% / ディーラー: 4〜8% が目安
                    </Text>
                  </Box>
                </Collapsible.Content>
              </Collapsible.Root>

              {/* CTAボタン */}
              <Button
                size="xl"
                w="full"
                h="64px"
                fontSize="lg"
                fontWeight="bold"
                onClick={handleStart}
                bgGradient="to-r"
                gradientFrom="blue.600"
                gradientTo="blue.400"
                color="white"
                rounded="xl"
                shadow="lg"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "xl",
                  opacity: 0.95,
                }}
                _active={{
                  transform: "scale(0.98)",
                }}
                transition="all 0.2s"
              >
                シミュレーション開始
                <Icon ml={2}>
                  <LuArrowRight />
                </Icon>
              </Button>
            </Card.Body>
          </Card.Root>

          {/* 広告エリア */}
          <Box textAlign="center" py={4}>
            <Text fontSize="xs" color="gray.300" mb={2}>
              SPONSORED
            </Text>
            <Box
              h="100px"
              bg="gray.100"
              rounded="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="gray.400"
              fontSize="sm"
            >
              [ 広告エリア ]
            </Box>
          </Box>

          {/* SEOコンテンツ（アコーディオン化） */}
          <SeoContentSection />
        </VStack>
      </Container>
    </Box>
  );
}
