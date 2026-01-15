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
  adImageUrl?: string; // 正方形バナー画像URL
  adTrackingPixel?: string; // トラッキングピクセルURL
  adBadges?: string[]; // バッジテキスト
};

export const BREAKDOWN_ADVICE: Record<string, AdviceContent> = {
  loan: {
    title: "ローン返済のコツ",
    description: "金利が1%下がるだけで、総支払額は数万円〜数十万円変わります。",
    tips: [
      "ディーラーローン（年4〜8%）より銀行系マイカーローン（年1〜3%）が有利",
      "頭金を増やすと総支払額を大幅に削減できる",
      "カーリースなら頭金0円・月々定額で乗れる",
    ],
    adTitle: "定額カルモくん",
    adDescription:
      "頭金0円・月々定額でマイカーが持てる。メンテナンス込みプランも",
    adCta: "カーリースを詳しく見る",
    adKey: "car_lease",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4AV5OA+16VZM+4R22+60WN5",
    adImageUrl:
      "https://www27.a8.net/svt/bgt?aid=260114554002&wid=001&eno=01&mid=s00000022169001012000&mc=1",
    adTrackingPixel: "https://www16.a8.net/0.gif?a8mat=4AV5OA+16VZM+4R22+60WN5",
    adBadges: ["頭金0円", "月々定額"],
  },
  bonus: {
    title: "ボーナス払いの活用",
    description: "ボーナス払いを設定すると月々の負担を軽減できます。",
    tips: [
      "年2回のボーナス月に多めに返済する方式",
      "月々の支払いを抑えたい方におすすめ",
      "ただし、ボーナスが減ると負担が大きくなるリスクも",
    ],
    adTitle: "首都高・高速がお得なETCカード",
    adDescription: "高速料金最大50%OFF。ポイント還元で実質さらにお得",
    adCta: "ETCカードを申込む",
    adKey: "etc_card",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4AV5O9+G1IHKI+1WW0+BXQOH",
    adImageUrl:
      "https://www28.a8.net/svt/bgt?aid=260114553970&wid=001&eno=01&mid=s00000008928002005000&mc=1",
    adTrackingPixel:
      "https://www12.a8.net/0.gif?a8mat=4AV5O9+G1IHKI+1WW0+BXQOH",
    adBadges: ["高速料金割引", "ポイント還元"],
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
    adTitle: "ETCカードでお得に走る",
    adDescription: "首都高・高速料金が最大50%OFF。ポイント還元も充実",
    adCta: "ETCカードを申込む",
    adKey: "gas_card",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4AV5O9+G1IHKI+1WW0+BYT9D",
    adImageUrl:
      "https://www28.a8.net/svt/bgt?aid=260114553970&wid=001&eno=01&mid=s00000008928002010000&mc=1",
    adTrackingPixel:
      "https://www11.a8.net/0.gif?a8mat=4AV5O9+G1IHKI+1WW0+BYT9D",
    adBadges: ["高速料金割引", "ポイント還元"],
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
    adTitle: "akippa - 駐車場予約",
    adDescription: "スマホで簡単予約。月極より安い駐車場が見つかる",
    adCta: "駐車場を探す",
    adKey: "parking_search",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4AV3CH+DD29KI+3NAY+62U35",
    adImageUrl:
      "https://www28.a8.net/svt/bgt?aid=260111537808&wid=001&eno=01&mid=s00000017017001021000&mc=1",
    adTrackingPixel:
      "https://www13.a8.net/0.gif?a8mat=4AV3CH+DD29KI+3NAY+62U35",
    adBadges: ["駐車場代節約", "スマホ予約"],
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
    adTitle: "📢 スポンサー募集中",
    adDescription: "この枠に広告を掲載しませんか？お問い合わせはこちらから",
    adCta: "お問い合わせ",
    adKey: "sponsor_insurance",
    affiliateUrl: "",
    adBadges: ["広告枠"],
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
    adTitle: "合宿免許ドリーム",
    adDescription: "最短14日で卒業！全国の教習所から選べる合宿プラン",
    adCta: "合宿プランを見る",
    adKey: "driving_school",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4AV4WH+F1SH9U+2C9M+609HT",
    adImageUrl:
      "https://www20.a8.net/svt/bgt?aid=260113553910&wid=001&eno=01&mid=s00000010921001009000&mc=1",
    adTrackingPixel:
      "https://www19.a8.net/0.gif?a8mat=4AV4WH+F1SH9U+2C9M+609HT",
    adBadges: ["最短14日", "全国対応"],
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
    adTitle: "📢 スポンサー募集中",
    adDescription: "この枠に広告を掲載しませんか？お問い合わせはこちらから",
    adCta: "お問い合わせ",
    adKey: "sponsor_shaken",
    affiliateUrl: "",
    adBadges: ["広告枠"],
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
    adTitle: "カー用品のメガスーパー",
    adDescription:
      "タイヤ・オイル・バッテリーなど豊富な品揃え。まとめ買いでお得",
    adCta: "カー用品を探す",
    adKey: "car_parts",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4AV5OA+LGDU+4ZD8+5ZEMP",
    adImageUrl:
      "https://www24.a8.net/svt/bgt?aid=260114554001&wid=001&eno=01&mid=s00000023246001005000&mc=1",
    adTrackingPixel: "https://www14.a8.net/0.gif?a8mat=4AV5OA+LGDU+4ZD8+5ZEMP",
    adBadges: ["豊富な品揃え", "お得にまとめ買い"],
  },
  trade_in: {
    title: "今の車を売って乗り換える",
    description:
      "維持費が高いと感じたら、燃費の良い車への乗り換えも選択肢です。下取りより買取専門店の方が高値がつくことも。",
    tips: [
      "ディーラー下取りより買取専門店が10〜30万円高いことも",
      "複数社で査定を取ると相場がわかる",
      "走行距離10万km超でも海外輸出で高値がつく場合あり",
    ],
    adTitle: "カーネクスト",
    adDescription: "どんな車も0円以上買取保証。レッカー代・書類代も無料",
    adCta: "無料で査定する",
    adKey: "car_trade_in",
    affiliateUrl: "https://h.accesstrade.net/sp/cc?rk=0100l09w00on0k",
    adImageUrl: "https://h.accesstrade.net/sp/rr?rk=0100l09w00on0k",
    adBadges: ["0円以上買取保証", "全国対応"],
  },
};
