"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ResultDashboard from "@/components/ResultDashboard";
import { type EntryInput, DEFAULT_ENTRY_INPUT } from "@/lib/calculate";
import { type RegionKey, DEFAULT_REGION } from "@/data/regions";

export default function ResultClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // クエリパラメータからデータを取得
  const entryData: EntryInput = {
    vehiclePrice:
      Number(searchParams.get("vehiclePrice")) ||
      DEFAULT_ENTRY_INPUT.vehiclePrice,
    downPayment:
      Number(searchParams.get("downPayment")) ||
      DEFAULT_ENTRY_INPUT.downPayment,
    region: (searchParams.get("region") as RegionKey) || DEFAULT_REGION,
    interestRate:
      Number(searchParams.get("interestRate")) ||
      DEFAULT_ENTRY_INPUT.interestRate,
  };

  const handleBack = () => {
    router.push("/");
  };

  return <ResultDashboard entryData={entryData} onBack={handleBack} />;
}
