// 月々の維持費計算ロジック
// 元利均等返済（PMT公式）を使用

import { REGIONS, type RegionKey, DEFAULT_REGION } from "@/data/regions";

export type CalcInput = {
  // A. ローン関連
  vehiclePrice: number; // 万円
  downPayment: number; // 万円
  interestRate: number; // %
  loanYears: number; // 年
  bonusPayment: number; // 万円 (1回あたり。年2回想定)

  // B. 走行・維持費
  region: RegionKey; // 地域（駐車場代・ガソリン代に影響）
  parkingFee: number; // 円/月（ユーザー上書き可能）
  gasPrice: number; // 円/L（ユーザー上書き可能）
  fuelEfficiency: number; // km/L
  annualMileage: number; // km/年

  // C. 税金・保険・メンテ
  annualTax: number; // 円/年 (自動車税)
  insuranceMonthly: number; // 円/月 (任意保険)
  shakenCost: number; // 円/2年 (車検)
  maintenanceYearly: number; // 円/年 (メンテ積立)
};

export type CalcBreakdown = {
  loan: number; // 月々ローン
  bonusAverage: number; // ボーナス月割
  gas: number; // ガソリン
  parking: number; // 駐車場
  insurance: number; // 保険
  tax: number; // 税金月割
  shaken: number; // 車検月割
  maintenance: number; // メンテ積立月割
};

export type CalcResult = {
  total: number;
  loanTotal: number; // ローン関連合計
  maintenanceTotal: number; // 維持費合計
  breakdown: CalcBreakdown;
  gunplaCount: string; // HGガンプラ換算
  yearlyTotal: number; // 年間総額
  maintenanceRatio: number; // 維持費比率
};

export const calculateTotalMonthlyCost = (input: CalcInput): CalcResult => {
  // --- 1. ローン計算 (元利均等) ---
  const totalPrincipal = Math.max(
    0,
    (input.vehiclePrice - input.downPayment) * 10000
  ); // 借入元本(円)
  const monthlyRate = input.interestRate / 100 / 12;
  const numPayments = input.loanYears * 12;
  const bonusPayments = input.loanYears * 2; // ボーナス回数（年2回）

  // ボーナス払い総額（1回あたり × 回数）
  // ただし借入総額を超えないようにする
  const requestedBonusTotal = input.bonusPayment * 10000 * bonusPayments;
  const bonusPrincipal = Math.min(requestedBonusTotal, totalPrincipal * 0.5); // 最大50%まで
  const regularPrincipal = totalPrincipal - bonusPrincipal;

  // PMT計算関数
  const calcPMT = (
    principal: number,
    rate: number,
    periods: number
  ): number => {
    if (principal <= 0 || periods <= 0) return 0;
    if (rate === 0) return principal / periods;
    return (
      (principal * rate * Math.pow(1 + rate, periods)) /
      (Math.pow(1 + rate, periods) - 1)
    );
  };

  // 通常の月々返済（毎月返済分の元本に対して）
  const monthlyLoanPayment = calcPMT(
    regularPrincipal,
    monthlyRate,
    numPayments
  );

  // ボーナス払い（ボーナス返済分の元本に対して、半年ごとの返済）
  // 半年利 = (1 + 月利)^6 - 1（複利計算）
  const semiAnnualRate = monthlyRate > 0 ? Math.pow(1 + monthlyRate, 6) - 1 : 0;
  const bonusPaymentAmount = calcPMT(
    bonusPrincipal,
    semiAnnualRate,
    bonusPayments
  );

  // ボーナス払いを月割り平均化（年2回 ÷ 12ヶ月）
  const bonusMonthlyAverage = (bonusPaymentAmount * 2) / 12;

  // --- 2. ガソリン代計算 ---
  // 年間走行距離 ÷ 燃費 × ガソリン単価 ÷ 12ヶ月
  const monthlyGas =
    input.fuelEfficiency > 0
      ? ((input.annualMileage / input.fuelEfficiency) * input.gasPrice) / 12
      : 0;

  // --- 3. 税金・車検の月割り ---
  const monthlyTax = input.annualTax / 12;
  const monthlyShaken = input.shakenCost / 24; // 2年に1回
  const monthlyMaintenance = input.maintenanceYearly / 12;

  // --- 内訳オブジェクト ---
  const breakdown: CalcBreakdown = {
    loan: Math.round(monthlyLoanPayment),
    bonusAverage: Math.round(bonusMonthlyAverage),
    gas: Math.round(monthlyGas),
    parking: input.parkingFee,
    insurance: input.insuranceMonthly,
    tax: Math.round(monthlyTax),
    shaken: Math.round(monthlyShaken),
    maintenance: Math.round(monthlyMaintenance),
  };

  // --- 合計計算 ---
  const loanTotal = breakdown.loan + breakdown.bonusAverage;
  const maintenanceTotal =
    breakdown.gas +
    breakdown.parking +
    breakdown.insurance +
    breakdown.tax +
    breakdown.shaken +
    breakdown.maintenance;
  const total = loanTotal + maintenanceTotal;

  // 維持費比率
  const maintenanceRatio = total > 0 ? (maintenanceTotal / total) * 100 : 0;

  return {
    total,
    loanTotal,
    maintenanceTotal,
    breakdown,
    gunplaCount: (total / 2500).toFixed(1),
    yearlyTotal: total * 12,
    maintenanceRatio,
  };
};

// 地域からデフォルト値を取得するヘルパー
export const getRegionDefaults = (regionKey: RegionKey) => {
  const region = REGIONS[regionKey];
  return {
    parkingFee: region.parkingFee,
    gasPrice: region.gasPrice,
  };
};

// デフォルト入力値
export const DEFAULT_INPUT: CalcInput = {
  vehiclePrice: 300,
  downPayment: 0,
  interestRate: 3.0,
  loanYears: 5,
  bonusPayment: 0,
  region: DEFAULT_REGION,
  parkingFee: REGIONS[DEFAULT_REGION].parkingFee,
  gasPrice: REGIONS[DEFAULT_REGION].gasPrice,
  fuelEfficiency: 12,
  annualMileage: 8000,
  annualTax: 36000,
  insuranceMonthly: 8000,
  shakenCost: 100000,
  maintenanceYearly: 30000,
};

// エントリー画面用の初期入力値（シンプル版）
export type EntryInput = {
  vehiclePrice: number;
  downPayment: number;
  region: RegionKey;
  interestRate: number;
};

export const DEFAULT_ENTRY_INPUT: EntryInput = {
  vehiclePrice: 300,
  downPayment: 0,
  region: DEFAULT_REGION,
  interestRate: 3.0,
};

// エントリー入力からフル入力への変換
export const entryToFullInput = (
  entry: EntryInput,
  presetKey?: string
): CalcInput => {
  const regionDefaults = getRegionDefaults(entry.region);

  return {
    ...DEFAULT_INPUT,
    vehiclePrice: entry.vehiclePrice,
    downPayment: entry.downPayment,
    region: entry.region,
    interestRate: entry.interestRate,
    parkingFee: regionDefaults.parkingFee,
    gasPrice: regionDefaults.gasPrice,
  };
};
