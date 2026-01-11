"use client";

import { useRouter } from "next/navigation";
import ResultDashboard from "@/components/ResultDashboard";
import { type EntryInput } from "@/lib/calculate";
import { DEFAULT_REGION } from "@/data/regions";
import { type CarModel } from "@/data/car-models";

type Props = {
  car: CarModel;
};

export default function SimulationClientPage({ car }: Props) {
  const router = useRouter();

  // 車種データから初期値を生成
  const entryData: EntryInput = {
    vehiclePrice: car.priceRange.popular,
    downPayment: Math.round(car.priceRange.popular * 0.1), // 10%頭金
    region: DEFAULT_REGION,
    interestRate: 2.5,
  };

  // 車種固有の維持費データをオーバーライドとして渡す
  const carOverrides = {
    fuelEfficiency: car.specs.fuelEfficiency,
    annualTax: car.costs.annualTax,
    shakenCost: car.costs.shakenCost,
    maintenanceYearly: car.costs.maintenanceYearly,
    insuranceMonthly: car.costs.insuranceMonthly,
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <ResultDashboard
      entryData={entryData}
      onBack={handleBack}
      carModel={car}
      carOverrides={carOverrides}
    />
  );
}
