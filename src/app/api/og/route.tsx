import { ImageResponse } from "next/og";
import { getCarModelById } from "@/data/car-models";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // パラメータ取得
  const price = searchParams.get("price") || "300";
  const carId = searchParams.get("car");
  const total = searchParams.get("total");

  // 車種情報取得（車種別ページ用）
  const car = carId ? getCarModelById(carId) : null;

  // タイトルとサブタイトル生成
  const title = car ? `${car.name}の維持費` : "MY CAR CALC";
  const subtitle = car
    ? `${car.maker} ${car.bodyType}`
    : "車の月々の維持費シミュレーター";
  const mainText = total
    ? `¥${Number(total).toLocaleString()}`
    : `${price}万円の車`;
  const bottomText = total ? "月々のリアルな支払額" : "維持費込みの月額を計算";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            '"Hiragino Sans", "Hiragino Kaku Gothic ProN", sans-serif',
        }}
      >
        {/* ヘッダーバー */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #3182CE 0%, #38B2AC 100%)",
          }}
        />

        {/* ロゴ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
            }}
          >
            {car?.emoji || "🚗"}
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#2D3748",
            }}
          >
            {title}
          </div>
        </div>

        {/* サブタイトル */}
        <div
          style={{
            fontSize: "24px",
            color: "#718096",
            marginBottom: "30px",
          }}
        >
          {subtitle}
        </div>

        {/* メイン数値 */}
        <div
          style={{
            fontSize: total ? "120px" : "80px",
            fontWeight: "900",
            background: "linear-gradient(135deg, #3182CE 0%, #38B2AC 100%)",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: "1.1",
          }}
        >
          {mainText}
        </div>

        {/* 説明テキスト */}
        <div
          style={{
            fontSize: "28px",
            color: "#4A5568",
            marginTop: "20px",
          }}
        >
          {bottomText}
        </div>

        {/* 特徴タグ */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {["ローン", "税金", "保険", "車検", "ガソリン"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "#EBF8FF",
                color: "#2B6CB0",
                padding: "8px 20px",
                borderRadius: "20px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* フッター */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: "20px",
            color: "#A0AEC0",
          }}
        >
          my-car-calc.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
