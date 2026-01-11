"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  Separator,
} from "@chakra-ui/react";
import {
  LuPercent,
  LuCar,
  LuCalculator,
  LuPiggyBank,
  LuShield,
  LuFuel,
} from "react-icons/lu";

// SEO用のコンテンツセクション（フッター付近に配置）
export default function SeoContentSection() {
  return (
    <Box bg="gray.100" py={12} mt={8}>
      <Container maxW="container.md">
        <VStack gap={10} align="stretch">
          {/* セクション1: マイカーローンの金利相場 */}
          <Box>
            <Heading
              as="h2"
              size="md"
              color="gray.800"
              mb={4}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <LuPercent />
              マイカーローンの金利相場について
            </Heading>
            <Card.Root bg="white" p={5} rounded="xl" shadow="sm">
              <Text fontSize="sm" color="gray.600" lineHeight="tall">
                マイカーローンの金利は、銀行系とディーラー系で大きく異なります。
                <Text as="span" fontWeight="bold" color="gray.800">
                  銀行系マイカーローン
                </Text>
                は年1.5%〜3.5%程度が相場で、審査は厳しめですが金利が低いのが特徴です。
                一方、
                <Text as="span" fontWeight="bold" color="gray.800">
                  ディーラーローン（残価設定含む）
                </Text>
                は年3.5%〜8%程度と高めですが、その場で審査が完了するメリットがあります。
                金利が1%違うだけで、300万円のローンなら総支払額が10万円以上変わることも。
                当シミュレーターでは、金利を自由に設定して比較検討できます。
              </Text>
            </Card.Root>
          </Box>

          <Separator />

          {/* セクション2: 維持費に含まれる項目 */}
          <Box>
            <Heading
              as="h2"
              size="md"
              color="gray.800"
              mb={4}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <LuCalculator />
              維持費に含まれる項目
            </Heading>
            <SimpleGrid columns={[1, 2]} gap={4}>
              <Card.Root bg="white" p={4} rounded="lg" shadow="sm">
                <VStack align="start" gap={2}>
                  <Text fontWeight="bold" color="blue.600" fontSize="sm">
                    <LuFuel style={{ display: "inline", marginRight: "6px" }} />
                    ガソリン代
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    年間走行距離 ÷ 燃費 × ガソリン単価で算出。
                    地域や走行環境で大きく変動します。
                  </Text>
                </VStack>
              </Card.Root>

              <Card.Root bg="white" p={4} rounded="lg" shadow="sm">
                <VStack align="start" gap={2}>
                  <Text fontWeight="bold" color="orange.600" fontSize="sm">
                    🅿️ 駐車場代
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    都心部は月2〜5万円、郊外は5千〜1万円が相場。
                    月極駐車場の有無で維持費が大きく変わります。
                  </Text>
                </VStack>
              </Card.Root>

              <Card.Root bg="white" p={4} rounded="lg" shadow="sm">
                <VStack align="start" gap={2}>
                  <Text fontWeight="bold" color="green.600" fontSize="sm">
                    <LuShield
                      style={{ display: "inline", marginRight: "6px" }}
                    />
                    任意保険
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    年齢・等級・車両保険の有無で変動。
                    20代は月1万円超、30代以降は5千円〜が目安。
                  </Text>
                </VStack>
              </Card.Root>

              <Card.Root bg="white" p={4} rounded="lg" shadow="sm">
                <VStack align="start" gap={2}>
                  <Text fontWeight="bold" color="pink.600" fontSize="sm">
                    📋 自動車税・車検
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    自動車税は排気量で決定（軽は10,800円/年）。
                    車検は2年ごとに6〜15万円程度。
                  </Text>
                </VStack>
              </Card.Root>
            </SimpleGrid>
          </Box>

          <Separator />

          {/* セクション3: 年収別の車選びの目安 */}
          <Box>
            <Heading
              as="h2"
              size="md"
              color="gray.800"
              mb={4}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <LuPiggyBank />
              年収別の車選びの目安
            </Heading>
            <Card.Root bg="white" p={5} rounded="xl" shadow="sm">
              <Text fontSize="sm" color="gray.600" lineHeight="tall" mb={4}>
                一般的に、
                <Text as="span" fontWeight="bold" color="gray.800">
                  「車両価格は年収の半分まで」
                </Text>
                が無理のない目安とされています。ただし、これはローンや維持費を考慮していない単純な目安です。
              </Text>
              <SimpleGrid columns={[1, 3]} gap={3}>
                <Box bg="blue.50" p={3} rounded="lg" textAlign="center">
                  <Text fontSize="xs" color="gray.500">
                    年収300万円
                  </Text>
                  <Text fontWeight="bold" color="blue.600">
                    〜150万円
                  </Text>
                  <Text fontSize="2xs" color="gray.500">
                    軽自動車・中古車
                  </Text>
                </Box>
                <Box bg="blue.50" p={3} rounded="lg" textAlign="center">
                  <Text fontSize="xs" color="gray.500">
                    年収500万円
                  </Text>
                  <Text fontWeight="bold" color="blue.600">
                    〜250万円
                  </Text>
                  <Text fontSize="2xs" color="gray.500">
                    コンパクトカー
                  </Text>
                </Box>
                <Box bg="blue.50" p={3} rounded="lg" textAlign="center">
                  <Text fontSize="xs" color="gray.500">
                    年収700万円
                  </Text>
                  <Text fontWeight="bold" color="blue.600">
                    〜350万円
                  </Text>
                  <Text fontSize="2xs" color="gray.500">
                    SUV・ミニバン
                  </Text>
                </Box>
              </SimpleGrid>
              <Text fontSize="xs" color="gray.500" mt={4}>
                ※
                維持費を含めた月々の支出が手取りの15%以内に収まるのが理想的です。
                当シミュレーターで維持費込みの総額を確認しましょう。
              </Text>
            </Card.Root>
          </Box>

          <Separator />

          {/* セクション4: このシミュレーターの特徴 */}
          <Box>
            <Heading
              as="h2"
              size="md"
              color="gray.800"
              mb={4}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <LuCar />
              MY CAR CALCの特徴
            </Heading>
            <Card.Root bg="white" p={5} rounded="xl" shadow="sm">
              <VStack align="start" gap={3}>
                <Text fontSize="sm" color="gray.600" lineHeight="tall">
                  銀行やディーラーの公式サイトにある計算機は、
                  <Text as="span" fontWeight="bold" color="red.500">
                    ローン返済額のみ
                  </Text>
                  を表示するものがほとんど。しかし実際の出費は、それだけではありません。
                </Text>
                <Text fontSize="sm" color="gray.600" lineHeight="tall">
                  MY CAR CALCは、ローン返済額に加えて
                  <Text as="span" fontWeight="bold" color="blue.600">
                    「ガソリン代」「駐車場代」「任意保険」「自動車税」「車検代」「メンテナンス費用」
                  </Text>
                  まで含めた
                  <Text as="span" fontWeight="bold" color="gray.800">
                    「月々の本当の出費」
                  </Text>
                  を計算できる唯一のシミュレーターです。
                </Text>
                <Text fontSize="sm" color="gray.600" lineHeight="tall">
                  車を買う前に、維持できるかどうかを確認しましょう。
                </Text>
              </VStack>
            </Card.Root>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
