import type { Metadata } from "next";
import { Box, Container, Heading, Text, VStack, List } from "@chakra-ui/react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | マイカーローン計算",
  description:
    "マイカーローン計算のプライバシーポリシー・個人情報の取り扱いについて",
};

export default function PrivacyPage() {
  return (
    <Box minH="100vh" bg="gray.50" py={{ base: 6, md: 12 }}>
      <Container maxW="container.md" px={{ base: 4, md: 6 }}>
        <VStack gap={8} align="stretch">
          {/* ヘッダー */}
          <Box textAlign="center">
            <Heading size={{ base: "lg", md: "xl" }} color="gray.800" mb={2}>
              プライバシーポリシー
            </Heading>
            <Text fontSize="sm" color="gray.500">
              最終更新日: 2026年1月11日
            </Text>
          </Box>

          {/* 本文 */}
          <Box bg="white" rounded="xl" shadow="md" p={{ base: 5, md: 8 }}>
            <VStack gap={6} align="stretch">
              {/* 1. 運営者情報 */}
              <Box>
                <Heading size="sm" color="gray.700" mb={2}>
                  1. 運営者情報
                </Heading>
                <Text fontSize="sm" color="gray.600" lineHeight="tall">
                  当サイト「マイカーローン計算」（以下「当サイト」）は、
                  車のローンおよび維持費の計算シミュレーションサービスを提供しています。
                </Text>
              </Box>

              {/* 2. 個人情報の収集 */}
              <Box>
                <Heading size="sm" color="gray.700" mb={2}>
                  2. 個人情報の収集について
                </Heading>
                <Text fontSize="sm" color="gray.600" lineHeight="tall">
                  当サイトでは、シミュレーションに入力されたデータ（車両価格、頭金、地域等）を
                  サーバーに保存することはありません。すべての計算処理はお客様のブラウザ上で完結します。
                </Text>
              </Box>

              {/* 3. Cookie */}
              <Box>
                <Heading size="sm" color="gray.700" mb={2}>
                  3. Cookie（クッキー）の使用について
                </Heading>
                <Text fontSize="sm" color="gray.600" lineHeight="tall" mb={2}>
                  当サイトでは、以下の目的でCookieを使用しています：
                </Text>
                <List.Root gap={1} ps={4}>
                  <List.Item fontSize="sm" color="gray.600">
                    アクセス解析（Google Analytics）
                  </List.Item>
                  <List.Item fontSize="sm" color="gray.600">
                    広告配信（Google AdSense）
                  </List.Item>
                </List.Root>
              </Box>

              {/* 4. 広告について */}
              <Box>
                <Heading size="sm" color="gray.700" mb={2}>
                  4. 広告について
                </Heading>
                <Text fontSize="sm" color="gray.600" lineHeight="tall" mb={2}>
                  当サイトでは、第三者配信の広告サービス「Google
                  AdSense」を利用しています。
                  広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
                </Text>
                <Text fontSize="sm" color="gray.600" lineHeight="tall">
                  Google AdSenseの詳細については、
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--chakra-colors-blue-500)",
                      textDecoration: "underline",
                    }}
                  >
                    Googleの広告ポリシー
                  </a>
                  をご確認ください。
                </Text>
              </Box>

              {/* 5. アクセス解析 */}
              <Box>
                <Heading size="sm" color="gray.700" mb={2}>
                  5. アクセス解析について
                </Heading>
                <Text fontSize="sm" color="gray.600" lineHeight="tall">
                  当サイトでは、Googleによるアクセス解析ツール「Google
                  Analytics」を利用しています。 このGoogle
                  Analyticsはトラフィックデータの収集のためにCookieを使用しています。
                  このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
                </Text>
              </Box>

              {/* 6. アフィリエイト */}
              <Box>
                <Heading size="sm" color="gray.700" mb={2}>
                  6. アフィリエイトプログラムについて
                </Heading>
                <Text fontSize="sm" color="gray.600" lineHeight="tall">
                  当サイトは、各種アフィリエイトプログラムに参加しています。
                  当サイト経由でサービスへの申込みや商品の購入があった場合、
                  当サイトに紹介料が支払われることがあります。
                </Text>
              </Box>

              {/* 7. 免責事項 */}
              <Box>
                <Heading size="sm" color="gray.700" mb={2}>
                  7. 免責事項
                </Heading>
                <Text fontSize="sm" color="gray.600" lineHeight="tall">
                  当サイトで提供するシミュレーション結果はあくまで目安であり、
                  実際のローン条件や維持費は各金融機関・保険会社・販売店等の条件により異なります。
                  当サイトの情報を利用したことによる損害について、当サイトは一切の責任を負いません。
                </Text>
              </Box>

              {/* 8. お問い合わせ */}
              <Box>
                <Heading size="sm" color="gray.700" mb={2}>
                  8. お問い合わせ
                </Heading>
                <Text fontSize="sm" color="gray.600" lineHeight="tall">
                  本ポリシーに関するお問い合わせは、サイト内のお問い合わせフォームよりご連絡ください。
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* トップに戻る */}
          <Box textAlign="center">
            <Link href="/">
              <Text
                as="span"
                color="blue.500"
                fontSize="sm"
                _hover={{ textDecoration: "underline" }}
              >
                ← トップページに戻る
              </Text>
            </Link>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
