// 車種プリセットデータ
// ユーザーがワンタップで主要な維持費パラメータを自動入力できるようにする

export type CarPreset = {
  label: string;
  emoji: string;
  fuelEfficiency: number; // km/L (実燃費想定)
  annualTax: number; // 円/年 (自動車税)
  shakenCost: number; // 円/2年 (車検費用)
  maintenanceYearly: number; // 円/年 (メンテ積立)
  insuranceMonthly: number; // 円/月 (任意保険目安)
  description: string; // 説明テキスト
};

export const PRESETS: Record<string, CarPreset> = {
  keicar: {
    label: "軽自動車",
    emoji: "🚗",
    fuelEfficiency: 18,
    annualTax: 10800,
    shakenCost: 70000,
    maintenanceYearly: 20000,
    insuranceMonthly: 5000,
    description: "N-BOX, タント, ワゴンR など",
  },
  compact: {
    label: "コンパクト",
    emoji: "🚙",
    fuelEfficiency: 15,
    annualTax: 30500,
    shakenCost: 90000,
    maintenanceYearly: 25000,
    insuranceMonthly: 6500,
    description: "ヤリス, フィット, ノート など",
  },
  suv: {
    label: "SUV",
    emoji: "🛻",
    fuelEfficiency: 10,
    annualTax: 36000,
    shakenCost: 120000,
    maintenanceYearly: 40000,
    insuranceMonthly: 8000,
    description: "ハリアー, CX-5, RAV4 など",
  },
  sport: {
    label: "スポーツ",
    emoji: "🏎️",
    fuelEfficiency: 8,
    annualTax: 45000,
    shakenCost: 130000,
    maintenanceYearly: 60000,
    insuranceMonthly: 12000,
    description: "GR86, ロードスター, シビック など",
  },
};

export type PresetKey = keyof typeof PRESETS;
