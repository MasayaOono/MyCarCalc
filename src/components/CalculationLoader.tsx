"use client";

import { Box, VStack, Text, Icon, Progress, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuCar, LuCalculator, LuDatabase, LuCircleCheck } from "react-icons/lu";

// ローディング中のメッセージ手順
const STEPS = [
  { icon: LuCalculator, text: "入力データを解析中..." },
  { icon: LuDatabase, text: "地域ごとの維持費を照合中..." },
  { icon: LuCar, text: "税金・保険料を算出中..." },
  { icon: LuCircleCheck, text: "シミュレーション完了！" },
];

export default function CalculationLoader() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 2.5秒（2500ms）で100%にするタイマー制御
    const totalDuration = 2500;
    const intervalTime = 50;
    const stepsCount = totalDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min((currentStep / stepsCount) * 100, 100);
      setProgress(nextProgress);

      // 進捗に合わせてメッセージを切り替える
      if (nextProgress < 30) setStepIndex(0);
      else if (nextProgress < 60) setStepIndex(1);
      else if (nextProgress < 90) setStepIndex(2);
      else setStepIndex(3);

      if (currentStep >= stepsCount) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = STEPS[stepIndex].icon;

  return (
    <Box
      position="fixed"
      inset="0"
      zIndex="9999"
      bg="blackAlpha.800"
      backdropFilter="blur(12px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack gap={6} w="full" maxW="320px" px={6}>
        {/* アイコンアニメーション */}
        <Box position="relative">
          {/* 後ろで回るリング */}
          <Box
            position="absolute"
            top="-20%"
            left="-20%"
            w="140%"
            h="140%"
            border="2px solid"
            borderColor="blue.500"
            borderTopColor="transparent"
            borderLeftColor="transparent"
            rounded="full"
            animation="spin 1s linear infinite"
            opacity={0.5}
          />
          <Box
            p={6}
            bg="white"
            rounded="full"
            shadow="0 0 40px rgba(66, 153, 225, 0.6)"
            animation="pulse 1.5s ease-in-out infinite"
          >
            <Icon fontSize="4xl" color="blue.600">
              <CurrentIcon />
            </Icon>
          </Box>
        </Box>

        {/* テキストとプログレスバー */}
        <VStack w="full" gap={2}>
          <Text
            color="white"
            fontWeight="bold"
            fontSize="lg"
            letterSpacing="wider"
            animation="fadeIn 0.3s ease-in-out"
            key={stepIndex}
          >
            {STEPS[stepIndex].text}
          </Text>

          <Progress.Root
            value={progress}
            size="sm"
            w="full"
            colorPalette="blue"
            rounded="full"
          >
            <Progress.Track bg="whiteAlpha.300" rounded="full">
              <Progress.Range rounded="full" />
            </Progress.Track>
          </Progress.Root>

          <Flex w="full" justify="flex-end">
            <Text
              color="blue.300"
              fontSize="xs"
              fontFamily="mono"
              fontWeight="bold"
            >
              {Math.round(progress)}%
            </Text>
          </Flex>
        </VStack>
      </VStack>

      {/* CSSアニメーション定義 */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(66, 153, 225, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(66, 153, 225, 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}
