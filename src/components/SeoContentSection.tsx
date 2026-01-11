"use client";

import { Box, Heading, Text, VStack, Icon, Accordion } from "@chakra-ui/react";
import { LuCircleHelp, LuBookOpen } from "react-icons/lu";

// FAQ形式のSEOコンテンツセクション（アコーディオン）
export default function SeoContentSection() {
  const faqItems = [
    {
      value: "item-1",
      question: "維持費には何が含まれますか？",
      answer: `車の維持費には、ガソリン代・駐車場代だけでなく、毎年かかる「自動車税」、2年に1回の「車検費用」、加入が推奨される「任意保険料」、そしてオイル交換などの「メンテナンス費用」が含まれます。

多くのローン計算機ではこれらが除外されていますが、当サイトではこれらを合算した「リアルな月額」を算出します。`,
    },
    {
      value: "item-2",
      question: "頭金はいくら入れればいい？",
      answer: `一般的には車両価格の10%〜20%が目安と言われています。頭金を入れることで借入額が減り、月々の返済額を抑えることができます。

また、ローンの審査も通りやすくなる傾向があります。無理のない範囲で設定しましょう。`,
    },
    {
      value: "item-3",
      question: "銀行ローンとディーラーローンの違いは？",
      answer: `【銀行系ローン】は金利が低い（1〜2%台）のが特徴ですが、審査が比較的厳しく、手続きに時間がかかることがあります。

【ディーラーローン】は車購入と同時に手続きでき審査も早いですが、金利が高め（4〜8%）に設定されていることが多いです。総支払額で数万円〜数十万円の差が出ることもあります。`,
    },
    {
      value: "item-4",
      question: "年間走行距離の目安は？",
      answer: `通勤に使う場合は年間8,000〜12,000km、休日のみの使用なら年間3,000〜5,000kmが目安です。

走行距離が多いほどガソリン代やメンテナンス費用が増えるため、購入前に想定しておくことが重要です。`,
    },
    {
      value: "item-5",
      question: "軽自動車と普通車、維持費はどれくらい違う？",
      answer: `軽自動車は自動車税が年間10,800円と普通車（25,000円〜）に比べて格安です。また、車検費用や保険料も安くなる傾向があります。

年間の維持費で比較すると、軽自動車は普通車より10〜20万円程度安くなることが多いです。`,
    },
  ];

  return (
    <Box as="section" py={8}>
      <VStack gap={6} align="stretch">
        {/* セクション見出し */}
        <VStack align="center" gap={2} mb={2}>
          <Icon color="blue.500" fontSize="2xl">
            <LuBookOpen />
          </Icon>
          <Heading size="md" color="gray.700" textAlign="center">
            マイカーローンの基礎知識
          </Heading>
          <Text fontSize="xs" color="gray.500">
            知っておきたいお金の話
          </Text>
        </VStack>

        {/* アコーディオン (FAQスタイル) */}
        <Accordion.Root collapsible variant="plain">
          {faqItems.map((item) => (
            <Accordion.Item
              key={item.value}
              value={item.value}
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              <Accordion.ItemTrigger
                py={4}
                px={2}
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
              >
                <Text
                  fontWeight="bold"
                  color="gray.700"
                  fontSize="sm"
                  flex={1}
                  textAlign="left"
                >
                  Q. {item.question}
                </Text>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pb={4} px={2}>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  lineHeight="tall"
                  whiteSpace="pre-line"
                >
                  {item.answer}
                </Text>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {/* 補足 */}
        <Box
          bg="blue.50"
          p={4}
          rounded="lg"
          border="1px solid"
          borderColor="blue.100"
        >
          <Text fontSize="xs" color="blue.800" lineHeight="relaxed">
            <Icon display="inline" mr={1}>
              <LuCircleHelp />
            </Icon>
            このシミュレーターは、ボーナス払いや残価設定型ローンの詳細な金利変動には対応していません。あくまで目安としてご利用ください。
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
