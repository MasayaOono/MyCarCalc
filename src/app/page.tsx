"use client";

import { useRouter } from "next/navigation";
import EntryScreen from "@/components/EntryScreen";
import { type EntryInput } from "@/lib/calculate";

export default function Home() {
  const router = useRouter();

  const handleStart = (data: EntryInput) => {
    // クエリパラメータでデータを渡して結果ページへ遷移
    const params = new URLSearchParams({
      vehiclePrice: String(data.vehiclePrice),
      downPayment: String(data.downPayment),
      region: data.region,
      interestRate: String(data.interestRate),
    });
    router.push(`/result?${params.toString()}`);
  };

  return <EntryScreen onStart={handleStart} />;
}
