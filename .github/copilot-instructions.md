# MY CAR CALC - Copilot Instructions

## プロジェクト概要

車の月額維持費をシミュレーションする Web アプリケーション。
ローン（PMT 計算）と維持費（駐車場、ガソリン、保険、税金、車検、メンテナンス）を含めた総月額コストを算出する。

## 技術スタック

| カテゴリ       | 技術                 | バージョン  |
| -------------- | -------------------- | ----------- |
| フレームワーク | Next.js (App Router) | 16.1.1      |
| 言語           | TypeScript           | 5.x         |
| UI ライブラリ  | Chakra UI            | **v3.30.0** |
| React          | React                | 19.x        |
| アイコン       | react-icons (Lucide) | 5.x         |

## ⚠️ 重要: Chakra UI v3 ルール

このプロジェクトは **Chakra UI v3** を使用しています。v2 との互換性はありません。

### コンポーネント記法

**v3 では Compound Component 構文を使用:**

```tsx
// ✅ 正しい (v3)
<Slider.Root value={[value]} onValueChange={(d) => setValue(d.value[0])}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb index={0} />
  </Slider.Control>
</Slider.Root>

// ❌ 間違い (v2の書き方)
<Slider value={value} onChange={setValue}>
  <SliderTrack>
    <SliderFilledTrack />
  </SliderTrack>
  <SliderThumb />
</Slider>
```

### v2 → v3 変更点

| v2                                           | v3                                                     |
| -------------------------------------------- | ------------------------------------------------------ |
| `<Slider>`                                   | `<Slider.Root>`                                        |
| `<SliderTrack>`                              | `<Slider.Track>`                                       |
| `<SliderFilledTrack>`                        | `<Slider.Range>`                                       |
| `<SliderThumb>`                              | `<Slider.Thumb index={0}>`                             |
| `<Card>`                                     | `<Card.Root>`                                          |
| `<CardBody>`                                 | `<Card.Body>`                                          |
| `<Collapse>`                                 | `<Collapsible.Root>` + `<Collapsible.Content>`         |
| `<Divider>`                                  | `<Separator>`                                          |
| `<Select>`                                   | カスタム実装 (`components/ui/select.tsx`)              |
| `onChange={(e) => setValue(e.target.value)}` | `onValueChange={(d) => setValue(d.value[0])}` (Slider) |
| `colorScheme="cyan"`                         | `colorPalette="cyan"`                                  |

### 存在しないアイコン

```tsx
// ❌ 存在しない
import { LuParkingCircle } from "react-icons/lu";

// ✅ 代わりに使用
import { LuSquareParking } from "react-icons/lu";
```

### Input variant

```tsx
// ❌ 存在しない
<Input variant="plain" />

// ✅ 代わりに使用
<Input variant="flushed" border="none" />
```

## ディレクトリ構成

```
my-car-calc/
├── .github/
│   └── copilot-instructions.md    # このファイル
├── public/                         # 静的アセット
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # ルートレイアウト
│   │   ├── page.tsx                # エントリー画面 (/)
│   │   ├── providers.tsx           # Chakra Provider設定
│   │   ├── globals.css             # グローバルスタイル
│   │   └── result/
│   │       └── page.tsx            # 結果画面 (/result)
│   │
│   ├── components/
│   │   ├── EntryScreen.tsx         # エントリー画面コンポーネント
│   │   ├── ResultDashboard.tsx     # 結果ダッシュボードコンポーネント
│   │   └── ui/
│   │       └── select.tsx          # Chakra v3用Selectラッパー
│   │
│   ├── data/
│   │   ├── presets.ts              # 車種プリセット (軽, コンパクト, SUV, スポーツ)
│   │   └── regions.ts              # 地域データ (駐車場・ガソリン価格の地域差)
│   │
│   └── lib/
│       └── calculate.ts            # 計算ロジック (PMT, 維持費)
│
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 画面フロー

```
[/] EntryScreen
  │
  │ 車両価格・頭金・地域・金利を入力
  │ 「計算する」ボタン押下
  │
  ▼ (URLパラメータでデータ受け渡し)

[/result?vehiclePrice=300&downPayment=50&region=suburban&interestRate=2.5] ResultDashboard
  │
  │ 全項目編集可能 + リアルタイム再計算
  │ 広告枠 x2
  │ 「戻る」ボタン
  │
  ▼

[/] EntryScreen (ブラウザ履歴で戻る)
```

## 型定義

### EntryInput (エントリー画面の入力)

```typescript
type EntryInput = {
  vehiclePrice: number; // 車両価格 (万円)
  downPayment: number; // 頭金 (万円)
  region: RegionKey; // 地域キー
  interestRate: number; // 金利 (%)
};
```

### CalcInput (計算に必要な全入力)

```typescript
type CalcInput = {
  vehiclePrice: number; // 車両価格 (万円)
  downPayment: number; // 頭金 (万円)
  interestRate: number; // 金利 (%)
  loanYears: number; // ローン年数
  bonusPayment: number; // ボーナス払い (万円/回)
  parkingFee: number; // 駐車場 (円/月)
  gasPrice: number; // ガソリン単価 (円/L)
  fuelEfficiency: number; // 燃費 (km/L)
  annualMileage: number; // 年間走行距離 (km)
  annualTax: number; // 自動車税 (円/年)
  insuranceMonthly: number; // 任意保険 (円/月)
  shakenCost: number; // 車検 (円/2年)
  maintenanceYearly: number; // メンテナンス (円/年)
  region: RegionKey; // 地域キー
};
```

### CalcResult (計算結果)

```typescript
type CalcResult = {
  total: number; // 月額合計
  loanTotal: number; // ローン系小計
  maintenanceTotal: number; // 維持費系小計
  yearlyTotal: number; // 年間合計
  breakdown: CalcBreakdown; // 詳細内訳
  maintenanceRatio: number; // 維持費比率 (%)
  gunplaCount: number; // HGガンプラ換算 (ネタ)
};
```

## 計算ロジック

### PMT (元利均等返済)

```typescript
function pmt(rate: number, nper: number, pv: number): number {
  if (rate === 0) return pv / nper;
  return (
    (pv * rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1)
  );
}
```

### 月額ガソリン代

```
月額ガソリン代 = (年間走行距離 / 燃費) × ガソリン単価 / 12
```

## デザインテーマ

- **コンセプト**: Clean & Trust（モダン・フィンテック）
- **背景**: `gray.50`（オフホワイト）
- **カード背景**: `white` + shadow
- **メインカラー**: `blue.500`〜`teal.400`（信頼のブルー〜親しみのティール）
- **テキスト**: `gray.800`（濃いグレー）、補足は`gray.500`
- **角丸**: `rounded="xl"` または `rounded="2xl"`
- **フォント**: システムフォント（数値は太字）

### カラーパレット

| 用途               | カラー                                |
| ------------------ | ------------------------------------- |
| 背景               | `gray.50`                             |
| カード             | `white` + shadow                      |
| 主要アクション     | `blue.500`〜`teal.400` グラデーション |
| テキスト（見出し） | `gray.800`                            |
| テキスト（補足）   | `gray.500`                            |
| ローン系           | `blue.400`〜`blue.600`                |
| 維持費系           | `orange.400`〜`orange.600`            |

### UI 方針

- 英語表記は避け、直感的な日本語 UI を使用
- 「白カード」×「グレー背景」の鉄板構成
- 広告は白背景であることが多いため、カードも白にして馴染ませる

## 広告枠

`ResultDashboard.tsx` に 2 箇所の広告プレースホルダーを配置済み:

1. **AdSlotLarge**: 結果カード直下（レクタングル大 250px）
2. **AdSlotNative**: プリセット下（ネイティブ広告風 100px）

## コマンド

```bash
npm run dev    # 開発サーバー起動
npm run build  # プロダクションビルド
npm run lint   # ESLint実行
```
