// 車種別データベース（プログラマティックSEO用）
// 各車種の専用LPを生成し、「車種名 維持費」で検索上位を狙う

import type { RegionKey } from "./regions";

export type CarModel = {
  // 基本情報
  id: string; // URLスラッグ (例: "n-box", "harrier")
  name: string; // 正式名称 (例: "N-BOX")
  maker: string; // メーカー名
  category:
    | "kei"
    | "compact"
    | "sedan"
    | "suv"
    | "minivan"
    | "sport"
    | "luxury";
  bodyType: string; // ボディタイプ表示用
  emoji: string;

  // 価格帯
  priceRange: {
    min: number; // 最低価格（万円）
    max: number; // 最高価格（万円）
    popular: number; // 人気グレード価格帯（万円）
  };

  // 維持費パラメータ
  specs: {
    displacement: number; // 排気量 (cc) - 税金計算用
    fuelEfficiency: number; // 燃費 (km/L) - 実燃費想定
    fuelType: "regular" | "premium" | "diesel" | "hybrid" | "ev";
  };

  // コスト
  costs: {
    annualTax: number; // 自動車税 (円/年)
    shakenCost: number; // 車検費用 (円/2年)
    maintenanceYearly: number; // メンテナンス積立 (円/年)
    insuranceMonthly: number; // 任意保険目安 (円/月)
  };

  // SEO用テキスト
  seo: {
    title: string; // ページタイトル用
    description: string; // meta description
    features: string[]; // 特徴リスト
    targetUser: string; // ターゲットユーザー説明
  };
};

// ===== 軽自動車 =====
const keiCars: CarModel[] = [
  {
    id: "n-box",
    name: "N-BOX",
    maker: "ホンダ",
    category: "kei",
    bodyType: "軽スーパーハイトワゴン",
    emoji: "🚗",
    priceRange: { min: 165, max: 230, popular: 185 },
    specs: { displacement: 660, fuelEfficiency: 19, fuelType: "regular" },
    costs: {
      annualTax: 10800,
      shakenCost: 65000,
      maintenanceYearly: 18000,
      insuranceMonthly: 4500,
    },
    seo: {
      title: "N-BOXの維持費シミュレーション",
      description:
        "ホンダN-BOXの月々の維持費を徹底計算。ローン返済額から税金、保険、ガソリン代まで含めたリアルな総額がわかります。",
      features: [
        "軽自動車販売台数No.1の人気車種",
        "広い室内空間と使い勝手の良さ",
        "Honda SENSINGによる安全性能",
      ],
      targetUser: "ファミリーや日常の足として軽自動車を検討している方",
    },
  },
  {
    id: "tanto",
    name: "タント",
    maker: "ダイハツ",
    category: "kei",
    bodyType: "軽スーパーハイトワゴン",
    emoji: "🚗",
    priceRange: { min: 150, max: 210, popular: 170 },
    specs: { displacement: 660, fuelEfficiency: 18, fuelType: "regular" },
    costs: {
      annualTax: 10800,
      shakenCost: 65000,
      maintenanceYearly: 18000,
      insuranceMonthly: 4500,
    },
    seo: {
      title: "タントの維持費シミュレーション",
      description:
        "ダイハツ・タントの維持費を月額換算でシミュレーション。ミラクルオープンドア搭載の人気軽自動車のリアルなランニングコストを計算。",
      features: [
        "ミラクルオープンドアで乗り降りラクラク",
        "子育て世代に人気の広々空間",
        "スマートアシスト搭載で安心",
      ],
      targetUser: "小さなお子様がいるファミリーや高齢者のいる世帯",
    },
  },
  {
    id: "wagon-r",
    name: "ワゴンR",
    maker: "スズキ",
    category: "kei",
    bodyType: "軽ハイトワゴン",
    emoji: "🚗",
    priceRange: { min: 130, max: 185, popular: 155 },
    specs: { displacement: 660, fuelEfficiency: 22, fuelType: "hybrid" },
    costs: {
      annualTax: 10800,
      shakenCost: 60000,
      maintenanceYearly: 15000,
      insuranceMonthly: 4000,
    },
    seo: {
      title: "ワゴンRの維持費シミュレーション",
      description:
        "スズキ・ワゴンRの月々の維持費を計算。マイルドハイブリッド搭載で燃費に優れた軽自動車のトータルコストをシミュレーション。",
      features: [
        "マイルドハイブリッドで低燃費",
        "軽ワゴンの定番ベストセラー",
        "コストパフォーマンスに優れた一台",
      ],
      targetUser: "燃費を重視する方、通勤・通学用の車を探している方",
    },
  },
  {
    id: "hustler",
    name: "ハスラー",
    maker: "スズキ",
    category: "kei",
    bodyType: "軽クロスオーバーSUV",
    emoji: "🚙",
    priceRange: { min: 140, max: 195, popular: 165 },
    specs: { displacement: 660, fuelEfficiency: 20, fuelType: "hybrid" },
    costs: {
      annualTax: 10800,
      shakenCost: 65000,
      maintenanceYearly: 18000,
      insuranceMonthly: 4500,
    },
    seo: {
      title: "ハスラーの維持費シミュレーション",
      description:
        "スズキ・ハスラーの維持費をリアルに計算。アウトドアにも使える軽SUVの月々のコストがわかります。",
      features: [
        "遊び心あるデザインで人気",
        "軽自動車ながらSUVスタイル",
        "アウトドアやレジャーに最適",
      ],
      targetUser: "アウトドア好き、個性的なデザインの軽自動車を探している方",
    },
  },
  {
    id: "jimny",
    name: "ジムニー",
    maker: "スズキ",
    category: "kei",
    bodyType: "軽クロカンSUV",
    emoji: "🛻",
    priceRange: { min: 165, max: 205, popular: 185 },
    specs: { displacement: 660, fuelEfficiency: 14, fuelType: "regular" },
    costs: {
      annualTax: 10800,
      shakenCost: 70000,
      maintenanceYearly: 25000,
      insuranceMonthly: 5000,
    },
    seo: {
      title: "ジムニーの維持費シミュレーション",
      description:
        "スズキ・ジムニーの維持費を徹底計算。本格クロカン性能を持つ軽自動車の実際のランニングコストをシミュレーション。",
      features: [
        "本格クロカン性能を軽自動車で実現",
        "世界中で愛されるロングセラー",
        "リセールバリューが非常に高い",
      ],
      targetUser: "オフロード走行や山道を走る方、趣味性の高い車を求める方",
    },
  },
];

// ===== コンパクトカー =====
const compactCars: CarModel[] = [
  {
    id: "yaris",
    name: "ヤリス",
    maker: "トヨタ",
    category: "compact",
    bodyType: "コンパクトハッチバック",
    emoji: "🚙",
    priceRange: { min: 150, max: 260, popular: 200 },
    specs: { displacement: 1500, fuelEfficiency: 21, fuelType: "hybrid" },
    costs: {
      annualTax: 30500,
      shakenCost: 80000,
      maintenanceYearly: 22000,
      insuranceMonthly: 5500,
    },
    seo: {
      title: "ヤリスの維持費シミュレーション",
      description:
        "トヨタ・ヤリスの月々の維持費を計算。世界基準の低燃費コンパクトカーのリアルなランニングコストがわかります。",
      features: [
        "世界トップクラスの低燃費",
        "コンパクトながら上質な乗り心地",
        "Toyota Safety Sense搭載",
      ],
      targetUser: "燃費を重視する方、普通車でコンパクトな車を探している方",
    },
  },
  {
    id: "fit",
    name: "フィット",
    maker: "ホンダ",
    category: "compact",
    bodyType: "コンパクトハッチバック",
    emoji: "🚙",
    priceRange: { min: 160, max: 290, popular: 220 },
    specs: { displacement: 1500, fuelEfficiency: 20, fuelType: "hybrid" },
    costs: {
      annualTax: 30500,
      shakenCost: 85000,
      maintenanceYearly: 22000,
      insuranceMonthly: 5500,
    },
    seo: {
      title: "フィットの維持費シミュレーション",
      description:
        "ホンダ・フィットの維持費を月額換算でシミュレーション。広い室内と優れた燃費を両立したコンパクトカーのトータルコスト。",
      features: [
        "クラストップレベルの室内空間",
        "e:HEVによる優れた燃費性能",
        "心地よい視界と乗り心地",
      ],
      targetUser: "室内の広さと燃費を両立したい方",
    },
  },
  {
    id: "note",
    name: "ノート",
    maker: "日産",
    category: "compact",
    bodyType: "コンパクトハッチバック",
    emoji: "🚙",
    priceRange: { min: 230, max: 300, popular: 260 },
    specs: { displacement: 1200, fuelEfficiency: 23, fuelType: "hybrid" },
    costs: {
      annualTax: 30500,
      shakenCost: 85000,
      maintenanceYearly: 22000,
      insuranceMonthly: 5500,
    },
    seo: {
      title: "ノートの維持費シミュレーション",
      description:
        "日産・ノートの月々の維持費を徹底計算。e-POWER搭載で電気自動車のような走りを楽しめるコンパクトカーのリアルコスト。",
      features: [
        "e-POWERによる力強くスムーズな走り",
        "ワンペダル走行で快適ドライブ",
        "先進の安全装備プロパイロット",
      ],
      targetUser: "電気自動車の走りを体験したい方、先進技術に興味がある方",
    },
  },
  {
    id: "aqua",
    name: "アクア",
    maker: "トヨタ",
    category: "compact",
    bodyType: "コンパクトハイブリッド",
    emoji: "🚙",
    priceRange: { min: 200, max: 280, popular: 240 },
    specs: { displacement: 1500, fuelEfficiency: 29, fuelType: "hybrid" },
    costs: {
      annualTax: 30500,
      shakenCost: 80000,
      maintenanceYearly: 20000,
      insuranceMonthly: 5000,
    },
    seo: {
      title: "アクアの維持費シミュレーション",
      description:
        "トヨタ・アクアの維持費をリアルに計算。圧倒的な低燃費を誇るハイブリッド専用車の月々のランニングコスト。",
      features: [
        "世界最高レベルの燃費性能",
        "ハイブリッド専用設計",
        "バイポーラ型ニッケル水素電池搭載",
      ],
      targetUser: "とにかく燃費を重視する方、環境に配慮した車選びをしたい方",
    },
  },
  {
    id: "swift",
    name: "スイフト",
    maker: "スズキ",
    category: "compact",
    bodyType: "コンパクトハッチバック",
    emoji: "🚙",
    priceRange: { min: 175, max: 235, popular: 200 },
    specs: { displacement: 1200, fuelEfficiency: 21, fuelType: "hybrid" },
    costs: {
      annualTax: 25000,
      shakenCost: 75000,
      maintenanceYearly: 20000,
      insuranceMonthly: 5000,
    },
    seo: {
      title: "スイフトの維持費シミュレーション",
      description:
        "スズキ・スイフトの月々の維持費を計算。軽量ボディによる軽快な走りとコストパフォーマンスに優れたコンパクトカー。",
      features: [
        "軽量高剛性プラットフォーム",
        "走りの楽しさを追求した設計",
        "手頃な価格と維持費",
      ],
      targetUser: "走りを楽しみたい方、コスパ重視の方",
    },
  },
];

// ===== SUV =====
const suvCars: CarModel[] = [
  {
    id: "harrier",
    name: "ハリアー",
    maker: "トヨタ",
    category: "suv",
    bodyType: "ミドルサイズSUV",
    emoji: "🛻",
    priceRange: { min: 310, max: 500, popular: 400 },
    specs: { displacement: 2500, fuelEfficiency: 15, fuelType: "hybrid" },
    costs: {
      annualTax: 43500,
      shakenCost: 120000,
      maintenanceYearly: 35000,
      insuranceMonthly: 8000,
    },
    seo: {
      title: "ハリアーの維持費シミュレーション",
      description:
        "トヨタ・ハリアーの月々の維持費を徹底計算。高級感と実用性を兼ね備えた人気SUVのリアルなランニングコスト。",
      features: [
        "都会派SUVの代表格",
        "上質なインテリアと静粛性",
        "ハイブリッドで燃費も優秀",
      ],
      targetUser: "上質なSUVを求める方、ファミリーでゆとりある車を探している方",
    },
  },
  {
    id: "rav4",
    name: "RAV4",
    maker: "トヨタ",
    category: "suv",
    bodyType: "ミドルサイズSUV",
    emoji: "🛻",
    priceRange: { min: 295, max: 450, popular: 380 },
    specs: { displacement: 2500, fuelEfficiency: 15, fuelType: "hybrid" },
    costs: {
      annualTax: 43500,
      shakenCost: 115000,
      maintenanceYearly: 35000,
      insuranceMonthly: 7500,
    },
    seo: {
      title: "RAV4の維持費シミュレーション",
      description:
        "トヨタ・RAV4の維持費を月額換算で計算。アウトドアにも強いミドルサイズSUVのトータルコストをシミュレーション。",
      features: [
        "オンロードもオフロードも得意",
        "E-Fourで悪路走破性も確保",
        "PHEVモデルも選べる",
      ],
      targetUser: "アウトドア好き、キャンプや車中泊を楽しみたい方",
    },
  },
  {
    id: "cx-5",
    name: "CX-5",
    maker: "マツダ",
    category: "suv",
    bodyType: "ミドルサイズSUV",
    emoji: "🛻",
    priceRange: { min: 290, max: 410, popular: 350 },
    specs: { displacement: 2200, fuelEfficiency: 14, fuelType: "diesel" },
    costs: {
      annualTax: 43500,
      shakenCost: 110000,
      maintenanceYearly: 32000,
      insuranceMonthly: 7000,
    },
    seo: {
      title: "CX-5の維持費シミュレーション",
      description:
        "マツダ・CX-5の月々の維持費を計算。美しいデザインとディーゼルエンジンの経済性を両立したSUVのリアルコスト。",
      features: [
        "魂動デザインによる美しいスタイリング",
        "SKYACTIVテクノロジー",
        "ディーゼルは軽油で経済的",
      ],
      targetUser: "デザインにこだわる方、走りを楽しみたいSUVユーザー",
    },
  },
  {
    id: "vezel",
    name: "ヴェゼル",
    maker: "ホンダ",
    category: "suv",
    bodyType: "コンパクトSUV",
    emoji: "🛻",
    priceRange: { min: 265, max: 350, popular: 300 },
    specs: { displacement: 1500, fuelEfficiency: 17, fuelType: "hybrid" },
    costs: {
      annualTax: 30500,
      shakenCost: 95000,
      maintenanceYearly: 28000,
      insuranceMonthly: 6500,
    },
    seo: {
      title: "ヴェゼルの維持費シミュレーション",
      description:
        "ホンダ・ヴェゼルの維持費をリアルに計算。コンパクトながら広い室内のSUVの月々のランニングコスト。",
      features: [
        "コンパクトSUVの人気モデル",
        "e:HEVで低燃費",
        "後席の広さがクラストップ",
      ],
      targetUser: "扱いやすいサイズのSUVを探している方",
    },
  },
  {
    id: "forester",
    name: "フォレスター",
    maker: "スバル",
    category: "suv",
    bodyType: "ミドルサイズSUV",
    emoji: "🛻",
    priceRange: { min: 310, max: 380, popular: 340 },
    specs: { displacement: 2000, fuelEfficiency: 13, fuelType: "regular" },
    costs: {
      annualTax: 36000,
      shakenCost: 110000,
      maintenanceYearly: 35000,
      insuranceMonthly: 7000,
    },
    seo: {
      title: "フォレスターの維持費シミュレーション",
      description:
        "スバル・フォレスターの月々の維持費を計算。シンメトリカルAWDによる安定した走行性能を持つSUVのトータルコスト。",
      features: [
        "シンメトリカルAWDで安定した走り",
        "アイサイトによる高い安全性",
        "悪路走破性に優れる",
      ],
      targetUser: "雪国在住の方、安全性を重視する方",
    },
  },
  {
    id: "landcruiser-250",
    name: "ランドクルーザー250",
    maker: "トヨタ",
    category: "suv",
    bodyType: "大型クロカンSUV",
    emoji: "🛻",
    priceRange: { min: 520, max: 800, popular: 650 },
    specs: { displacement: 2700, fuelEfficiency: 9, fuelType: "diesel" },
    costs: {
      annualTax: 50000,
      shakenCost: 150000,
      maintenanceYearly: 50000,
      insuranceMonthly: 10000,
    },
    seo: {
      title: "ランドクルーザー250の維持費シミュレーション",
      description:
        "トヨタ・ランドクルーザー250の月々の維持費を徹底計算。世界が認める最強クロカンのリアルなランニングコスト。",
      features: [
        "世界最高峰の悪路走破性",
        "圧倒的な耐久性と信頼性",
        "リセールバリューが非常に高い",
      ],
      targetUser: "本格クロカンを求める方、資産価値を重視する方",
    },
  },
];

// ===== ミニバン =====
const minivanCars: CarModel[] = [
  {
    id: "sienta",
    name: "シエンタ",
    maker: "トヨタ",
    category: "minivan",
    bodyType: "コンパクトミニバン",
    emoji: "🚐",
    priceRange: { min: 200, max: 315, popular: 265 },
    specs: { displacement: 1500, fuelEfficiency: 22, fuelType: "hybrid" },
    costs: {
      annualTax: 30500,
      shakenCost: 90000,
      maintenanceYearly: 25000,
      insuranceMonthly: 6000,
    },
    seo: {
      title: "シエンタの維持費シミュレーション",
      description:
        "トヨタ・シエンタの月々の維持費を計算。5ナンバーで扱いやすい7人乗りミニバンのリアルなランニングコスト。",
      features: [
        "5ナンバーサイズで取り回しやすい",
        "スライドドアで乗降が楽",
        "ハイブリッドで低燃費",
      ],
      targetUser: "子育てファミリー、コンパクトなミニバンを探している方",
    },
  },
  {
    id: "freed",
    name: "フリード",
    maker: "ホンダ",
    category: "minivan",
    bodyType: "コンパクトミニバン",
    emoji: "🚐",
    priceRange: { min: 235, max: 340, popular: 280 },
    specs: { displacement: 1500, fuelEfficiency: 20, fuelType: "hybrid" },
    costs: {
      annualTax: 30500,
      shakenCost: 90000,
      maintenanceYearly: 25000,
      insuranceMonthly: 6000,
    },
    seo: {
      title: "フリードの維持費シミュレーション",
      description:
        "ホンダ・フリードの維持費を月額換算でシミュレーション。ちょうどいいサイズのミニバンのトータルコスト。",
      features: [
        "ちょうどいいサイズ感",
        "低床設計で乗り降りしやすい",
        "3列シートでも広々",
      ],
      targetUser: "ファミリーカーとして使いやすい車を探している方",
    },
  },
  {
    id: "noah",
    name: "ノア",
    maker: "トヨタ",
    category: "minivan",
    bodyType: "ミドルサイズミニバン",
    emoji: "🚐",
    priceRange: { min: 270, max: 400, popular: 340 },
    specs: { displacement: 2000, fuelEfficiency: 16, fuelType: "hybrid" },
    costs: {
      annualTax: 36000,
      shakenCost: 100000,
      maintenanceYearly: 30000,
      insuranceMonthly: 7000,
    },
    seo: {
      title: "ノアの維持費シミュレーション",
      description:
        "トヨタ・ノアの月々の維持費を徹底計算。ファミリーに人気の定番ミニバンのリアルなランニングコスト。",
      features: [
        "ファミリーカーの定番",
        "広い室内と多彩なシートアレンジ",
        "ハイブリッドで燃費も良好",
      ],
      targetUser: "3列シートが必要なファミリー、習い事の送迎が多い方",
    },
  },
  {
    id: "voxy",
    name: "ヴォクシー",
    maker: "トヨタ",
    category: "minivan",
    bodyType: "ミドルサイズミニバン",
    emoji: "🚐",
    priceRange: { min: 310, max: 420, popular: 365 },
    specs: { displacement: 2000, fuelEfficiency: 16, fuelType: "hybrid" },
    costs: {
      annualTax: 36000,
      shakenCost: 100000,
      maintenanceYearly: 30000,
      insuranceMonthly: 7000,
    },
    seo: {
      title: "ヴォクシーの維持費シミュレーション",
      description:
        "トヨタ・ヴォクシーの維持費をリアルに計算。スタイリッシュなミニバンの月々のランニングコスト。",
      features: [
        "スポーティなエクステリア",
        "ノアの兄弟車でカッコよさ重視",
        "装備充実の上級グレード多数",
      ],
      targetUser: "見た目もカッコいいミニバンを探している方",
    },
  },
  {
    id: "alphard",
    name: "アルファード",
    maker: "トヨタ",
    category: "luxury",
    bodyType: "大型高級ミニバン",
    emoji: "🚐",
    priceRange: { min: 540, max: 900, popular: 700 },
    specs: { displacement: 2500, fuelEfficiency: 12, fuelType: "hybrid" },
    costs: {
      annualTax: 43500,
      shakenCost: 130000,
      maintenanceYearly: 45000,
      insuranceMonthly: 10000,
    },
    seo: {
      title: "アルファードの維持費シミュレーション",
      description:
        "トヨタ・アルファードの月々の維持費を徹底計算。高級ミニバンの王者のリアルなランニングコストをシミュレーション。",
      features: [
        "高級ミニバンの代名詞",
        "最上級のおもてなし空間",
        "リセールバリューが非常に高い",
      ],
      targetUser: "上質なファミリーカーを求める方、VIP送迎用途の方",
    },
  },
  {
    id: "stepwgn",
    name: "ステップワゴン",
    maker: "ホンダ",
    category: "minivan",
    bodyType: "ミドルサイズミニバン",
    emoji: "🚐",
    priceRange: { min: 305, max: 400, popular: 350 },
    specs: { displacement: 1500, fuelEfficiency: 15, fuelType: "hybrid" },
    costs: {
      annualTax: 30500,
      shakenCost: 100000,
      maintenanceYearly: 30000,
      insuranceMonthly: 7000,
    },
    seo: {
      title: "ステップワゴンの維持費シミュレーション",
      description:
        "ホンダ・ステップワゴンの維持費を月額換算で計算。シンプルで使いやすいミニバンのトータルコスト。",
      features: [
        "シンプルで飽きのこないデザイン",
        "わくわくゲートで使い勝手◎",
        "e:HEVで経済的",
      ],
      targetUser: "実用性を重視するファミリー",
    },
  },
];

// ===== スポーツカー =====
const sportCars: CarModel[] = [
  {
    id: "gr86",
    name: "GR86",
    maker: "トヨタ",
    category: "sport",
    bodyType: "FRスポーツクーペ",
    emoji: "🏎️",
    priceRange: { min: 305, max: 380, popular: 340 },
    specs: { displacement: 2400, fuelEfficiency: 11, fuelType: "premium" },
    costs: {
      annualTax: 43500,
      shakenCost: 110000,
      maintenanceYearly: 45000,
      insuranceMonthly: 10000,
    },
    seo: {
      title: "GR86の維持費シミュレーション",
      description:
        "トヨタ・GR86の月々の維持費を徹底計算。手が届く本格FRスポーツのリアルなランニングコスト。",
      features: [
        "手が届く価格の本格FRスポーツ",
        "水平対向エンジンによる低重心",
        "マニュアルもATも選べる",
      ],
      targetUser: "スポーツカーに乗りたい若者、走りを楽しみたい方",
    },
  },
  {
    id: "roadster",
    name: "ロードスター",
    maker: "マツダ",
    category: "sport",
    bodyType: "ライトウェイトオープン",
    emoji: "🏎️",
    priceRange: { min: 290, max: 400, popular: 340 },
    specs: { displacement: 1500, fuelEfficiency: 15, fuelType: "premium" },
    costs: {
      annualTax: 30500,
      shakenCost: 100000,
      maintenanceYearly: 40000,
      insuranceMonthly: 9000,
    },
    seo: {
      title: "ロードスターの維持費シミュレーション",
      description:
        "マツダ・ロードスターの維持費を計算。世界で最も売れたオープンスポーツカーの月々のランニングコスト。",
      features: [
        "人馬一体の走りを追求",
        "軽量オープンボディ",
        "ギネス認定のベストセラー",
      ],
      targetUser: "オープンカーに憧れる方、週末のドライブを楽しみたい方",
    },
  },
  {
    id: "civic-type-r",
    name: "シビック TYPE R",
    maker: "ホンダ",
    category: "sport",
    bodyType: "FFスポーツハッチ",
    emoji: "🏎️",
    priceRange: { min: 500, max: 550, popular: 520 },
    specs: { displacement: 2000, fuelEfficiency: 10, fuelType: "premium" },
    costs: {
      annualTax: 36000,
      shakenCost: 120000,
      maintenanceYearly: 55000,
      insuranceMonthly: 12000,
    },
    seo: {
      title: "シビック TYPE Rの維持費シミュレーション",
      description:
        "ホンダ・シビック TYPE Rの月々の維持費を徹底計算。FF最速を誇るホットハッチのリアルなコスト。",
      features: [
        "ニュルブルクリンク最速FF",
        "320馬力の2Lターボ",
        "実用性も兼ね備えたスポーツカー",
      ],
      targetUser: "最強のFFを求める方、実用性も欲しいスポーツカー好き",
    },
  },
  {
    id: "supra",
    name: "スープラ",
    maker: "トヨタ",
    category: "sport",
    bodyType: "FRスポーツクーペ",
    emoji: "🏎️",
    priceRange: { min: 500, max: 750, popular: 600 },
    specs: { displacement: 3000, fuelEfficiency: 9, fuelType: "premium" },
    costs: {
      annualTax: 51000,
      shakenCost: 130000,
      maintenanceYearly: 60000,
      insuranceMonthly: 13000,
    },
    seo: {
      title: "スープラの維持費シミュレーション",
      description:
        "トヨタ・スープラの維持費をリアルに計算。復活した伝説の直6スポーツカーの月々のランニングコスト。",
      features: [
        "伝説の直列6気筒エンジン復活",
        "BMWと共同開発の高性能車",
        "50:50の理想的な重量配分",
      ],
      targetUser: "憧れのスープラに乗りたい方、高性能FRスポーツを求める方",
    },
  },
];

// ===== セダン =====
const sedanCars: CarModel[] = [
  {
    id: "prius",
    name: "プリウス",
    maker: "トヨタ",
    category: "sedan",
    bodyType: "ハイブリッドセダン",
    emoji: "🚗",
    priceRange: { min: 320, max: 460, popular: 370 },
    specs: { displacement: 2000, fuelEfficiency: 28, fuelType: "hybrid" },
    costs: {
      annualTax: 36000,
      shakenCost: 95000,
      maintenanceYearly: 25000,
      insuranceMonthly: 6000,
    },
    seo: {
      title: "プリウスの維持費シミュレーション",
      description:
        "トヨタ・プリウスの月々の維持費を計算。世界を変えたハイブリッドカーのリアルなランニングコスト。",
      features: [
        "ハイブリッドカーの代名詞",
        "圧倒的な低燃費",
        "先進的なデザイン",
      ],
      targetUser: "燃費を最優先する方、エコカーの代表格を選びたい方",
    },
  },
  {
    id: "corolla",
    name: "カローラ",
    maker: "トヨタ",
    category: "sedan",
    bodyType: "コンパクトセダン",
    emoji: "🚗",
    priceRange: { min: 200, max: 310, popular: 260 },
    specs: { displacement: 1800, fuelEfficiency: 22, fuelType: "hybrid" },
    costs: {
      annualTax: 36000,
      shakenCost: 90000,
      maintenanceYearly: 22000,
      insuranceMonthly: 5500,
    },
    seo: {
      title: "カローラの維持費シミュレーション",
      description:
        "トヨタ・カローラの維持費を月額換算でシミュレーション。世界のベストセラーカーのトータルコスト。",
      features: [
        "世界累計5000万台販売",
        "日本の国民車",
        "安心の信頼性と耐久性",
      ],
      targetUser: "堅実な車選びをしたい方、初めてのセダンとして",
    },
  },
  {
    id: "crown",
    name: "クラウン",
    maker: "トヨタ",
    category: "luxury",
    bodyType: "ラグジュアリーセダン",
    emoji: "👑",
    priceRange: { min: 475, max: 750, popular: 600 },
    specs: { displacement: 2500, fuelEfficiency: 16, fuelType: "hybrid" },
    costs: {
      annualTax: 43500,
      shakenCost: 130000,
      maintenanceYearly: 45000,
      insuranceMonthly: 9000,
    },
    seo: {
      title: "クラウンの維持費シミュレーション",
      description:
        "トヨタ・クラウンの月々の維持費を徹底計算。日本を代表する高級セダンのリアルなランニングコスト。",
      features: [
        "日本の高級車の代名詞",
        "新型はクロスオーバースタイル",
        "上質な乗り心地と静粛性",
      ],
      targetUser: "日本の高級車に乗りたい方、ビジネスユースにも",
    },
  },
];

// ===== 全車種データを統合 =====
export const CAR_MODELS: CarModel[] = [
  ...keiCars,
  ...compactCars,
  ...suvCars,
  ...minivanCars,
  ...sportCars,
  ...sedanCars,
];

// IDで車種を取得するヘルパー
export function getCarModelById(id: string): CarModel | undefined {
  return CAR_MODELS.find((car) => car.id === id);
}

// カテゴリで車種をフィルタするヘルパー
export function getCarModelsByCategory(
  category: CarModel["category"]
): CarModel[] {
  return CAR_MODELS.filter((car) => car.category === category);
}

// 全車種IDの配列（generateStaticParams用）
export function getAllCarModelIds(): string[] {
  return CAR_MODELS.map((car) => car.id);
}

// カテゴリの日本語名
export const CATEGORY_LABELS: Record<CarModel["category"], string> = {
  kei: "軽自動車",
  compact: "コンパクトカー",
  sedan: "セダン",
  suv: "SUV",
  minivan: "ミニバン",
  sport: "スポーツカー",
  luxury: "高級車",
};
