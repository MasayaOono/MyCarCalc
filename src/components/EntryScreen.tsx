"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  SimpleGrid,
  Card,
  Collapsible,
  HStack,
  createListCollection,
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
} from "react-icons/lu";
import { REGION_OPTIONS, type RegionKey } from "@/data/regions";
import { type EntryInput, DEFAULT_ENTRY_INPUT } from "@/lib/calculate";
import SeoContentSection from "./SeoContentSection";

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

  const regionCollection = createListCollection({
    items: REGION_OPTIONS,
  });

  const handleStart = () => {
    onStart({
      vehiclePrice,
      downPayment,
      region,
      interestRate,
    });
  };

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.sm" py={12}>
        <VStack gap={6} align="stretch">
          {/* ヘッダー：親しみやすいアイコンと日本語タイトル */}
          <VStack textAlign="center" mb={2}>
            <Box
              p={3}
              bg="blue.100"
              color="blue.600"
              rounded="full"
              fontSize="2xl"
            >
              <LuCalculator />
            </Box>
            <Heading size="xl" color="gray.800" fontWeight="800">
              マイカーローン計算
            </Heading>
            <Text color="gray.500" fontSize="sm" lineHeight="tall">
              維持費・税金・保険料まで含めた
              <br />
              <Text as="span" color="blue.600" fontWeight="bold">
                「リアルな月々の出費」
              </Text>
              をチェックしましょう
            </Text>
          </VStack>

          {/* 入力カード：白背景にしっかりした影 */}
          <Card.Root
            bg="white"
            shadow="lg"
            rounded="2xl"
            border="none"
            overflow="hidden"
          >
            {/* 上部にアクセントカラーのライン */}
            <Box
              h="6px"
              bgGradient="to-r"
              gradientFrom="blue.400"
              gradientTo="teal.400"
            />

            <Card.Body gap={8} p={{ base: 6, md: 8 }}>
              {/* 1. 車両価格 (一番目立たせる) */}
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>
                  車両価格（税込）
                </Text>
                <HStack>
                  <Input
                    type="number"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    size="xl"
                    fontSize="3xl"
                    fontWeight="bold"
                    textAlign="center"
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{
                      bg: "white",
                      borderColor: "blue.400",
                      ring: "2px",
                      ringColor: "blue.100",
                    }}
                    rounded="xl"
                    py={6}
                    color="gray.800"
                  />
                  <Text fontSize="lg" fontWeight="bold" color="gray.500">
                    万円
                  </Text>
                </HStack>
              </Box>

              {/* 2. 頭金 & 地域 (2カラム) */}
              <SimpleGrid columns={[1, 2]} gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>
                    頭金
                  </Text>
                  <HStack>
                    <Input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      size="lg"
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.200"
                      _focus={{
                        bg: "white",
                        borderColor: "blue.400",
                        ring: "2px",
                        ringColor: "blue.100",
                      }}
                      rounded="lg"
                      fontWeight="bold"
                      color="gray.800"
                    />
                    <Text fontWeight="bold" color="gray.500">
                      万円
                    </Text>
                  </HStack>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>
                    お住まいの地域
                  </Text>
                  <SelectRoot
                    collection={regionCollection}
                    value={[region]}
                    onValueChange={(e) => setRegion(e.value[0] as RegionKey)}
                    size="lg"
                  >
                    <SelectTrigger
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.200"
                      rounded="lg"
                      _hover={{ borderColor: "gray.300" }}
                      color="gray.800"
                    >
                      <SelectValueText placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent bg="white" borderColor="gray.200">
                      {REGION_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          item={option}
                          bg="white"
                          _hover={{ bg: "gray.50" }}
                          color="gray.800"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Box>
              </SimpleGrid>

              {/* 詳細設定（金利など） */}
              <Collapsible.Root
                open={showAdvanced}
                onOpenChange={(d) => setShowAdvanced(d.open)}
              >
                <Collapsible.Trigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    color="gray.500"
                    w="full"
                    justifyContent="center"
                    _hover={{ color: "gray.700", bg: "gray.100" }}
                  >
                    {showAdvanced ? "詳細を閉じる" : "金利を変更する"}
                    {showAdvanced ? <LuChevronUp /> : <LuChevronDown />}
                  </Button>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <Box
                    mt={3}
                    p={4}
                    bg="gray.50"
                    rounded="lg"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <HStack gap={2} mb={2}>
                      <LuPercent color="var(--chakra-colors-gray-500)" />
                      <Text fontSize="sm" color="gray.600" fontWeight="bold">
                        金利（実質年率）
                      </Text>
                    </HStack>
                    <HStack>
                      <Input
                        type="number"
                        step={0.1}
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(Number(e.target.value))
                        }
                        bg="white"
                        border="1px solid"
                        borderColor="gray.200"
                        fontWeight="bold"
                        color="gray.800"
                        _focus={{
                          borderColor: "blue.400",
                          ring: "2px",
                          ringColor: "blue.100",
                        }}
                      />
                      <Text fontWeight="bold" color="gray.500">
                        %
                      </Text>
                    </HStack>
                    <Text fontSize="xs" color="gray.500" mt={2}>
                      ※ 銀行系: 1〜2% / ディーラー: 4〜8% が目安
                    </Text>
                  </Box>
                </Collapsible.Content>
              </Collapsible.Root>

              {/* CTAボタン */}
              <Button
                size="xl"
                w="full"
                mt={2}
                py={7}
                fontSize="md"
                fontWeight="bold"
                onClick={handleStart}
                bgGradient="to-r"
                gradientFrom="blue.500"
                gradientTo="teal.400"
                color="white"
                rounded="xl"
                _hover={{
                  opacity: 0.9,
                  transform: "translateY(-1px)",
                  shadow: "md",
                }}
                transition="all 0.2s"
              >
                計算結果を見る
                <LuArrowRight />
              </Button>
            </Card.Body>
          </Card.Root>

          {/* 広告エリア：背景に馴染ませる */}
          <Box textAlign="center">
            <Text fontSize="xs" color="gray.400" mb={1}>
              スポンサーリンク
            </Text>
            <Box
              h="100px"
              bg="gray.200"
              rounded="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="gray.500"
              fontSize="sm"
            >
              [ 広告エリア ]
            </Box>
          </Box>

          {/* フッター */}
          <Text textAlign="center" fontSize="xs" color="gray.500">
            ※ 計算結果はあくまで目安です。実際の費用は条件により異なります。
          </Text>
        </VStack>
      </Container>

      {/* SEOコンテンツセクション */}
      <SeoContentSection />
    </Box>
  );
}
