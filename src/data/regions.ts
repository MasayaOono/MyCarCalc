// 地域データ（都道府県別駐車場代係数）
// 駐車場代は地域差が大きいため、エントリー画面で選択させてデフォルト値を設定

export type RegionData = {
  name: string;
  parkingFee: number; // 円/月（平均的な相場）
  gasPrice: number; // 円/L（地域差は小さいが一応）
};

// 地方区分
export type RegionKey =
  | "tokyo"
  | "osaka"
  | "nagoya"
  | "metropolitan"
  | "urban"
  | "suburban"
  | "rural";

export const REGIONS: Record<RegionKey, RegionData> = {
  tokyo: {
    name: "東京23区",
    parkingFee: 30000,
    gasPrice: 180,
  },
  osaka: {
    name: "大阪市内",
    parkingFee: 25000,
    gasPrice: 175,
  },
  nagoya: {
    name: "名古屋市内",
    parkingFee: 18000,
    gasPrice: 170,
  },
  metropolitan: {
    name: "首都圏（23区外）",
    parkingFee: 15000,
    gasPrice: 175,
  },
  urban: {
    name: "地方都市",
    parkingFee: 10000,
    gasPrice: 170,
  },
  suburban: {
    name: "郊外・住宅地",
    parkingFee: 6000,
    gasPrice: 168,
  },
  rural: {
    name: "地方・田舎",
    parkingFee: 3000,
    gasPrice: 165,
  },
};

// デフォルト地域
export const DEFAULT_REGION: RegionKey = "urban";

// 地域リスト（Select用）
export const REGION_OPTIONS = Object.entries(REGIONS).map(([key, data]) => ({
  value: key as RegionKey,
  label: `${data.name}（駐車場 約¥${data.parkingFee.toLocaleString()}/月）`,
}));
