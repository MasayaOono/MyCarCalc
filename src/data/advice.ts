// 内訳項目ごとのアドバイスと広告マッピング
// ユーザーが「？」ボタンを押したときに表示するコンテンツ

export type AdviceContent = {
  title: string;
  description: string;
  tips: string[];
  adTitle: string;
  adDescription: string;
  adCta: string;
  adKey: string; // 広告の識別子
  affiliateUrl: string; // アフィリエイトリンク
};

export const BREAKDOWN_ADVICE: Record<string, AdviceContent> = {
  loan: {
    title: "ローン返済のコツ",
    description: "金利が1%下がるだけで、総支払額は数万円〜数十万円変わります。",
    tips: [
      "ディーラーローン（年4〜8%）より銀行系マイカーローン（年1〜3%）が有利",
      "頭金を増やすと総支払額を大幅に削減できる",
      "ボーナス払いを活用すると月々の負担が軽くなる",
    ],
    adTitle: "銀行系マイカーローン比較",
    adDescription: "ネットで完結、最短即日審査。金利年1.5%〜",
    adCta: "金利を比較してみる",
    adKey: "bank_loan",
    affiliateUrl: "https://example.com/af/bank-loan?ref=mycarcalc",
  },
  bonus: {
    title: "ボーナス払いの活用",
    description: "ボーナス払いを設定すると月々の負担を軽減できます。",
    tips: [
      "年2回のボーナス月に多めに返済する方式",
      "月々の支払いを抑えたい方におすすめ",
      "ただし、ボーナスが減ると負担が大きくなるリスクも",
    ],
    adTitle: "マイカーローン借り換え相談",
    adDescription: "今のローンより有利な条件に借り換えませんか？",
    adCta: "無料で相談する",
    adKey: "loan_refinance",
    affiliateUrl: "https://example.com/af/loan-refinance?ref=mycarcalc",
  },
  gas: {
    title: "ガソリン代を節約するには？",
    description:
      "特定のガソリンスタンドと提携したクレジットカードで、リッターあたり2円〜10円の割引が受けられます。",
    tips: [
      "ENEOSカード、出光カードなどでリッター2〜7円引き",
      "コストコのガソリンは市場価格より10〜15円安いことも",
      "エコドライブで燃費10%改善も可能",
    ],
    adTitle: "ガソリン代がお得になるクレカ",
    adDescription: "年間で最大15,000円お得に！今なら入会特典も",
    adCta: "カードを比較する",
    adKey: "gas_card",
    affiliateUrl: "https://example.com/af/gas-card?ref=mycarcalc",
  },
  parking: {
    title: "駐車場代を節約するには？",
    description:
      "月極駐車場は場所によって価格差が大きいです。少し離れた場所も検討してみましょう。",
    tips: [
      "駅から徒歩5分離れるだけで月5,000円安くなることも",
      "akippaなどのシェア駐車場を活用する手も",
      "マンション敷地内駐車場は管理費込みでお得な場合も",
    ],
    adTitle: "月極駐車場を探す",
    adDescription: "希望エリアの駐車場を一括検索。最安値を見つけよう",
    adCta: "駐車場を探す",
    adKey: "parking_search",
    affiliateUrl: "https://example.com/af/parking?ref=mycarcalc",
  },
  insurance: {
    title: "任意保険の選び方",
    description:
      "ネット型保険（ダイレクト型）は代理店型より手数料分だけ割安になる傾向があります。",
    tips: [
      "年齢条件を見直すと保険料が下がることも",
      "車両保険の免責金額を上げると保険料が下がる",
      "複数社で一括見積もりすると平均3万円節約できるというデータも",
    ],
    adTitle: "自動車保険を一括見積もり",
    adDescription: "最大20社を無料で比較。平均35,000円の節約実績",
    adCta: "無料で見積もる",
    adKey: "insurance_compare",
    affiliateUrl: "https://example.com/af/insurance?ref=mycarcalc",
  },
  tax: {
    title: "自動車税について",
    description:
      "自動車税は排気量によって決まります。軽自動車なら年10,800円と格安です。",
    tips: [
      "軽自動車: 10,800円/年",
      "1,000cc以下: 25,000円/年",
      "エコカー減税対象車は最大75%減額",
    ],
    adTitle: "エコカー減税対象車を探す",
    adDescription: "税金がお得な車を探してみませんか？",
    adCta: "対象車を検索",
    adKey: "eco_car",
    affiliateUrl: "https://example.com/af/eco-car?ref=mycarcalc",
  },
  shaken: {
    title: "車検費用を抑える",
    description:
      "ディーラー車検は安心ですが割高になりがちです。車検予約サイト経由でポイント還元を受けられます。",
    tips: [
      "ディーラー車検: 10〜15万円程度",
      "カー用品店・GS車検: 6〜10万円程度",
      "ユーザー車検なら法定費用のみで済む（上級者向け）",
    ],
    adTitle: "車検予約でポイント還元",
    adDescription: "楽天ポイント最大2,500pt還元。お近くの店舗を比較",
    adCta: "車検を予約する",
    adKey: "shaken_booking",
    affiliateUrl: "https://example.com/af/shaken?ref=mycarcalc",
  },
  maintenance: {
    title: "メンテナンス費用の目安",
    description:
      "オイル交換、タイヤ交換、消耗品交換など、定期的なメンテナンスは故障を防ぎ結果的に節約になります。",
    tips: [
      "オイル交換: 3,000〜5,000円（年2〜3回）",
      "タイヤ交換: 4〜8万円（3〜5年に1回）",
      "バッテリー交換: 1〜2万円（3年に1回）",
    ],
    adTitle: "カー用品をお得に購入",
    adDescription: "Amazonや楽天でまとめ買いがお得。ポイント還元も",
    adCta: "カー用品を探す",
    adKey: "car_parts",
    affiliateUrl: "https://example.com/af/car-parts?ref=mycarcalc",
  },
};
