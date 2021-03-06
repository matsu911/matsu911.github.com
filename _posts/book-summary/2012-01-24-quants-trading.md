---
layout: post
title: クオンツトレーディング入門
category: Book
tags: [Book]
keywords: [クオンツトレーディング]
---
{% include JB/setup %}

# クオンツとは何か
  徹底した調査に基づいて設計したアルファを追求する投資戦略をシッステマティックに実行するトレーダー

# クオンツトレーディング戦略の基本的構造
+ アルファモデル
+ リスクモデル
+ 取引コストモデル
+ ポートフォリオ構築モデル
+ 執行モデル

# アルファモデル
## アルファとは
投資家の生み出すリターンのなかでベンチマークによらない部分、つまり運用マネージャーのスキルによって付加された(あるいは失なわれた)価値
### 例
+ マネージャーのリターンが12%
+ ベンチマークのリターンが10%
+ マネージャーのアルファは概算で+2%
# アルファの追求
+ ポートフォリオの選択とサイジングのタイミングを図ることによってなされる
## アルファモデル
+ タイミングを図るためにクオンツが構築して用いるソフトウェア
+ エクスポージャー
### さまざまな呼び名
+ 予測
+ ファクター
+ アルファ
+ モデル
+ 戦略
+ 推定子
+ 予測子
## アルファモデルの2つのタイプ
###  理論駆動型
ほとんどは理論駆動型
#### 5つの戦略
+ トレンド
+ 回帰
+ バリュー、利回り
+ グロース
+ 質
#### 価格データに基づく戦略
+ トレンド戦略と平均回帰戦略は必ずしも対立するものではなく、共存することもある
+ トレンドは長期的で平均回帰は短期的
##### トレンドフォロー
+ 市場はときとして長期にわたって同じ方向に 動くことがあり、そういったトレンドを発見できればそれに乗って利益を得ることができるという理論に基づく
+ 均衡状態から均衡状態へのゆっくりとした移行をとらえる
+ 大バカ者理論によりトレンドは持続する
+ 一定の方向への大きな動きを狙う
+ リターンも大きいがリスクも大きい
###### 例
+ 商品先物に多い
##### 平均回帰
+ 価格の上下動には重心のようなものが存在し、その重心がどこにあり、どれくらいの上下動であれば利益が見込めるトレードが可能なのかを見つけることができるという理論に基づく
+ 裁量トレーダーが用いる平均回帰戦略は一般に逆張り戦略と呼ばれる
###### 例
+ スタットアーブ
#### ファンダメンタルデータに基づく戦略
##### バリュー、利回り戦略
+ 一般に株式トレーディングに用いられる戦略としてよく知られているが、ほかの市場でも同じように用いることができる
+ PER(株価収益率)の逆数はEPR(益回り)
+ バリュー投資の根底にある考え方は、高リスクの商品のリスクは課題評価され、低リスクの商品は過小評価される傾向があるため、高リスクの資産を保有する一方で低リスクの資産を売る、もしくは高リスクの資産を保有するか低リスクの資産を売る、かのいずれかがよい
+ キャリートレードとは割安の証券を買うと同時に割高の証券を売る戦略
###### 例
+ 通貨のキャリートレードが人気
+ クオンツロングショート戦略
##### グロース戦略
+ 資産の過去の成長や将来の成長を基に立てた予測に基づく戦略
+ 資産の価格ではなく急成長しているかどうかで資産を買う
+ FXトレーディングなどのマクロ経済グロース戦略とミクロ経済グロース戦略
+ センチメン戦略は正式な決算発表を待たずにアナリストの予測を用いる
##### 質戦略
+ 他の条件が一定ならば質の高い商品を保有し、質の低い商品を売るのがよい、という考えに基づく戦略
+ 厳しい市場環境では投資家を保護する
+ 自己資本比率
+ フリーキャッシュフローがどの程度発表された1株利益に近いか、などの収益の質
### データ駆動型
####利点
+ 難しいため、あまりポピュラーではない
+ 理論から立証されていない市場の振舞いも識別できる
####欠点
+ モデルに入力するデータを自分で決めなくてはならない
+ 入力にノイズが含まれるので、データマイニングのみに頼ってアルファを生み出すのは問題がある
## 戦略の実行
### 予測目標
+ 動きの方向
+ 動きの大きさ
+ 動きの期間
+ 予測精度
####シグナルの強さ
+ 期待リターンの大きさ
+ リターンが得られる確率
### 対象期間
+ 高頻度戦略
+ 短期戦略
+ 中期先着
+ 長期戦略
### 賭け構造
+ 予測方法によって決まる
+ 絶対予測(絶対アルファ)
+ 相対予測(相対アルファ)
### 投資ユニバース
+ トレードする地域(市場)
+ 商品クラス
+ 流動性が重視される
### モデルの具体化
+ 戦略のあらゆる側面を具体的に定義
+ 最適なパラメータの決定に機械学習を使う
+ モデルの更新頻度の問題
### 実行頻度
+ モデルをリアルタイムに実行する頻度
+ 頻繁に実行すると取引回数が増えコストも増える
+ 実行頻度が低い場合、マーケットインパクトが増える
### モデルの多様性
+ 細かな実行要素の組み合わせでモデルの多様性が得られる
## 複数のアルファモデルの組み合わせ
+ 複数のアルファ戦略にさまざまな実行要素を組み合わせる
### アルファファクター(シグナル)の組み合わせ方
+ 線形モデル
+ 非線形モデル
+ 機械学習モデル

# リスクモデル
+ リスク管理とはリターンの質と安定性を向上させるためにエクスポージャーを意図的に選択し、その大きさを決めること
+ リスク管理とはエクスポージャーを選びその大きさを決めることで、任意水準のリスクに対するリターンを最大化することを意味する
+ アルファモデルが楽観主義者とすればリスクモデルは悲観主義者
## リスクの限定
### リスクサイズの制限方法
+ ボーダーラインを設ける
+ ペナルティー関数を設ける
### リスクの測定方法
+ リターンの標準偏差を計算してリスクを求める
+ 任意のユニバースにおけるさまざまな商品の類似度を測定
### サイズを制限する対象
+ 単一のポジション
+ ポジションの集合体
+ ポートフォリオ全体のレバレッジ管理も必要
+ ケリー基準
## リスクの種類の限定
+ 偶発的なエクスポージャーは除去したほうがよい
+ アルファモデルにリスク管理の概念を組込むことができる
### 理論駆動型リスクモデル
+ 分散化によって除去できないシステマティックリスクファクターに注目
+ 個別株では市場そのものがシステマティックリスクファクター
+ 債券では金利リスクがシステマティックリスクファクター
### 経験的リスクモデル
+ システマティクリスクは測定して低減しなくてはならない
+ ヒストリカルデータを基にする
+ 偽のエクスポージャーを発見してしまう可能性がある
+ 主成分分析(PCA)
####債券のPCA
+ 第一主成分は金利水準
####株式のPCA
+ 第一主成分は市場そのもの
+ 第二主成分はセクター
### クオンツのリスクモデルの選び方
+ 理論駆動型リスクモデルが好まれる
+ モデルの適応性から経験的リスクモデルが好まれることもある
+ 理論駆動型リスクモデルと経験的リスクモデルは相互排他的ではない
+ 両者のハイブリッドも用いられる
####経験的リスクモデルの欠点
+ 市場体制が変化する過渡期で脆弱
+ 統計的優位性と適応性のトレードオフ
####経験的リスクモデルの利点
+ 既知ではないリスクファクターを発見できる
+ 日中のデータを使えば統計的優位性と適応性のトレードオフは解消できる

# 取引コストモデル
+ いかなるトレードを行うにもお金がかかる
+ 成功しているクオンツの多くは取引コストとしてリターンの20%〜50%を想定
+ トレーディングコストを最小化するためのものではなく、ポートフォリオ構築エンジンに任意のトレードを行うのにかかるコストに関する情報を地峡するだけ
+ コストの最小化は執行アルゴリズムが行う
## 取引コストの定義
### 売買手数料と諸費用
+ ブローカー、取引所、規制当局によって提供されるサービスに対して支払われる
+ 流動性プール
####売買手数料
+ ほかの市場参加者へのアクセス
+ 取引の安全確保
+ オペレーションインフラの使用
####清算手数料
+ 決算前に発生する管理(報告と監視)
+ 税務処理
+ 障害処理
####決済手数料
+ 全支払い終了後の証券の引き渡し
### スリッページ
+ 取引しようと決めた時点における価格と取引所で執行された価格との差
+ トレンドフォロー戦略でスリッページの影響を受けやすく、平均回帰戦略では影響が小さい
+ スリッページは時間と商品のボラティリティの関数
### マーケットインパクト
+ 注文が取引所に入ったときの価格とその注文が実際に執行されるときの価格との差
+ 需要量が大きいほど、それを満たす供給量を探すのは難しくなるため、トレードコストは高くなる
+ 一般に、マーケットインパクトを取引コストモデルに組込むときには流動性に対する注文サイズのみを考慮
+ スリッページとマーケットインパクトは相互に影響し合う
+ ECNは流動性を提供するトレーダーには代価を支払い、流動性を要求するトレーダーには代価を要求する方式を導入
+ 平均回帰戦略で流動性を提供を利益源としてモデル化することもできる
## さまざまな取引コストモデル
+ 固定コストと可変コスト
+ 流動性、トレンド、ボラティリティを一定と家庭すると、取引コストの総額は2次曲線(x軸を注文サイズ、y軸をトレーディングコスト)
### 均一取引コストモデル
+ 計算は簡単がた正確さに欠ける
+ 極端なトレードサイズでなければそれほど問題にならない
### 線形取引コストモデル
+ 取引コストがトレードサイズに比例
+ トレードサイズが小さいときにはコストを過大評価
+ トレードサイズが大きいときにはコストを過小評価
### 折れ線近似取引コストモデル
+ 簡単な公式ながらある程度正確
+ 曲率が大きくなったら線を引きなおし、直線の組み合わせで曲線を近似
### 二次式取引コストモデル
+ 他とくらべると構築するのが難しい
+ 正確
+ 推定であり実際とは異なる

# ポートフォリオ構築モデル
+ クオンツが持つべきポートフォリオを決定する
+ アルファモデル、リスクモデル、取引コストモデルの仲裁人
## ルールに基づくポートフォリオ構築モデル
### ポジション均等荷重
+ シグナルの強さはホジションをとるか否かの判断のみ
####非均等荷重の問題点
+ 任意のポジションの将来の方向性のみならず、動きの大きさや変動する確率も他の予測に比べて統計的に十分な信頼度で予測することが可能と暗に仮定
+ 予測値の良い少ないものに多く賭け、予測値があまり良くない多くのものに少なく賭ける傾向があり、リスクをとりすぎることがある
### リスク均等荷重
+ ポジションをボラティリティ(ドローダウンなどの他のリスク尺度でもよい)に逆比例して調整
+ リスク量によって均等化
+ リスク尺度は過去のデータに基づくため突然ボラティリティが急上昇するようなケースで問題
### アルファ駆動型荷重
+ ポジションサイズをアルファに基づいて決める
+ 多くの場合、最大ポジションに制約を設け、最大サイズにリスクモデルを併用する
+ セクターや資産クラスとしった各グループの全体的なサイズに制約を設けることもできる
+ トレンドが反転するケースでは注意が必要
### 決定木モデル
+ 木構造を単純にすればポートフォリオの構築は単純化されすぎるし、木構造を複雑にすれば問題解決が難しくなり正しく構築されないこともある
## ポートフォリオオプティマイザ
+ 現代ポートフォリオ理論(MPT)に基づく
+ 平均分散最適化
+ 目的関数の最大化
+ 指向性探索アルゴリズム
### 現代ポートフォリオ理論
+ 投資家は本質的にリスク回避的であると仮定
+ 余分なリスクをとるときは代償として超過リターンが期待できるときのみ
+ リスク調整済みリターン
### 入力パラメータ
+ 平均
+ 分散
+ 期待相関行列
+ ポートフォリオのサイズ
+ 望むリスク水準
+ 制約事項(空売り不可のリストなど)
####期待リターン
+ 長期間のヒストリカルリターンではなくアルファモデルからの期待リターン
####期待ボラティリティ
+ ヒストリカルデータを基に測定することが多いが、独自の尺度を用いることもある
+ GARCH(Generalized Autoregressive Conditional Heteroskedasticity:自己回帰条件付不均一分散モデル)モデルやその亜種
+ GARCHはトレンドと平均回帰の組み合わせでボラティリティを予測
####期待相関
+ ボラティリティの計算や予測を行うためのアプローチを提供
+ クオンツトレーディングでは標準的な相関尺度を用いると多くの問題が発生する
+ 2つの商品の関係は常に安定的に測定できるわけではない
+ 相関が安定しないのは統計量としての相関に問題があるわけではなく、これが金融界の現実
### 最適化テクニック
####制約条件のない最適化
+ リスク調整済みリターンが最大の銘柄に全資産を投資してしまう
####制約条件のある最適化
+ 最適プロセスに制約条件やペナルティーを設ける
+ ポジションの閾値
+ 各グループに対する閾値
####ブラック・リッターマン最適化
+ 従来のモデルにおける入力量の測定誤差に関する問題点のいくつかが解決
+ 投資家のリターン予測を投資家の確信度によって調整
####グリノルドとカーンのアプローチ ファクターポートフォリオの最適化
+ シグナルポートフォリオの構築を目的とする
+ それぞれがひとつのタイプのアルファ予測に基づくルールを基にしたファクターポートフォリオを構築する
+ ファクターポートフォリオの数がファクター数と一致し、通常20を超えることはないため、データ量が少なくてすむ
####再サンプル効率
+ 推定誤差への過剰反応を抑える
+ ヒストリカルデータから推定された値は将来とは異なる
+ モンテカルロシミュレーションによるデータの再サンプリング
+ 同じ観測結果を何度も並べ替えて多くの時系列を生成し、戦略の検証に用いる多数の「過去」を生成
####データマイニングによる最適化
+ 機械学習
## ポートフォリオ構築モデルの出力
+ 目標ポートフォリオ
+ どういったポジションをとり、それぞれのサイズはいくらか
+ 目標ポートフォリオと現行ポートフォリオとの差が行うべきトレード
## クオンツはポートフォリオ構築モデルをどのようにして選ぶのか
+ ルールを基にした配分システムを使うクオンツは絶対アルファ戦略を使うケースが多い(先物のトレーダー)
+ オプティマイザを用いるクオンツは相対アルファ戦略を使うケースが多い(株式ニュートラル)
+ 相対アルファ戦略を用いるのは、銘柄間の関係が安定していると信じているから
+ 絶対アルファ戦略を用いるのは、相関行列があまり役に立たないと考えているから

# 執行
+ 電子的執行と人間の手を介する執行があるが、クオンツが主に用いるのは電子的執行
## 注文執行アルゴリズム
### 注文方法
+ 成行
+ 指値
+ MOC
+ ストップリミット
+ FOK
+ AON
+ GTC
### アグレッシブな注文とパッシブな注文
+ アグレッシブとはどれくらい速やかにトレードを執行したいか
+ パッシブとはアグレッシブの逆
+ ジョイニング(Joining)とは最良の買い板や売り板に自分の注文を追加すること
+ インプルービング(Improving)とは最良の買い板や売り板になるような注文を入れること
+ アグレッシブ度は用いる戦略のタイプ、シグナルの強さ、システムのそのシグナルに対する確信度によって決まる
### 大口注文対小口注文
+ 大口注文は小口注文に比べてコストがかかる
+ 一般に時間軸で分割して発注される
+ 執行に時間をかけるとその間に価格が動くリスクがある
### 隠された注文(情報限定公開型注文)対目に見える注文(情報公開型注文)
+ 「手の内」を隠しながら取引が可能
+ 隠れた注文は同じ価格の目に見える注文よりも優先順位は下がる
+ アイスバーギング(iceberging)は大きな注文を小さな注文に細分化し、そのほとんどをオーダーブックに隠された注文として記帳する
+ すべての取引所が隠された注文を認めているわけではない
### 注文はどこに送るのか
+ 市場によっては同じ銘柄に対して複数の流動性プールが存在する場合がある
+ 米国株の流動性プールとして知られるのがアイランドとアーキペラゴ
+ SOR(スマートオーダールーティング)が急速に普及しつつあり、その時点で最適な流動性プールに自動的に流すシステム
+ 最近、米国の規制当局によって有効な流動性プールの最良の売り/買い板を同時に表示することが義務付けられたが、ECNによって流動性の深さや接続スピードが異なるため、依然としてSORは魅力
### 注文の取り消しと差し替え
+ 板厚の変化に対する市場の反応を知るために、偽の大口注文を出し、すぐに取り消して他の注文と差し替えるという手口を使う者もいる
+ 注文取り消し率の多いトレーダーにはペナルティーが課せられることがある
## 高頻度トレーディング ー アルファと執行との間の境界線をなくす
+ 超短期(秒単位など)のトレードをする戦略をマイクロストラクチャ・アルファといい、目標とする銘柄と関連銘柄のオーダーブックにおける流動性パターンに注目することでリターンの向上を目指す
+ 大手クオンツはマイクロストラクチャ予測を執行モデルに採用することでポートフォリオ構築モデルによって必要と判断されたトレードコストの低減を図る
+ インフラとリサーチに莫大な投資が必要
+ マーケットインパクトの影響を考えると、少額運用しかできない
+ 他の市場プレーヤーの執行パターンの発見に機械学習を用いるトレーダーもいる
+ 機械学習は長期トレーディングよりも高頻度トレーディングに対してのほうが成功率が高いようだ
+ 動きの遅い従来型ロボット(例えばアイスバーグ)がシャークの餌食になり、機械学習エージェントのによって偵察される様は、まるでロボットの戦争ゲームのようで、高頻度トレーディングは「兵器開発競争」と言われてきた
### アルゴリズム
#### ゲリラ
#### スナイパー
#### シャーク
+ 隠された大口注文を見つけだすことを目的とする
+ 小口注文を連続的に出し、注文が直ちに執行されれば、隠された大口注文があることを意味する
+ 大口注文を検知したシャークは目に見える注文を出し、この注文は隠された大口注文よりも執行待ち順位が上になる
+ アイスバーグ戦略の注文が執行されるために、大口注文の注文価格を上げるが、シャークは追随し、常に執行順位が大口注文よりも上になる
+ この大口注文により市場はトレンドが形成されるが、価格が十分に上がったところでシャークは売り抜け、ほぼ無リスクで利益を上げる
## トレーディングインフラ
### 取引所との接続確立
+ DMA(ダイレクト・マーケット・アクセス)(10〜30ミリ秒)
+ コロケーションアクセス(スポンサードアクセスともいう)(250マイクロ秒以下)
### 取引所とのメッセージをやり取りするためのプロトコル
+ FIX(Financial Information eXchange)プロトコル
+ FIXエンジンとはFIXプロトコルを実装するソフトウェア
+ 高頻度トレーダーはFIXエンジンを自作するケースが多い
### ハードウェアとソフトウェア
+ 自作か購入するかを決めなくてはならない
+ 特殊なトレーディング機能を持つマイクロチップを自社開発したところもある
+ 市場データ処理と注文の送信における内部遅延を低減するために独自のアルゴリズム、データベース、執行ソフトウェアにこだわるクオンツもいる
+ オクオンツの場合、効率と処理能力を考慮して、OSはWindowsよりもLinuxやUNIXを利用する者が多い

# データ
## データの重要性
+ データとはクオンツトレーディングシステムへの入力を意味する
+ モデルの細部は用いられる入力の性質の影響を受けることが多い
+ 用いるデータの性質はデータの保存や検索に使うデータベース技術を選ぶうえでの重要な要素
+ 「ゴミを入れればゴミしか出てこない」
+ 悪いデータはリサーチで大量の時間を浪費させる原因にもなる
+ 多くのクオンツを主体としたトレーディング会社はデータをデータベンダーから買うのではなく、一次情報源から自ら収集し、データへのアクセススピードの向上、データのクリーニング、良い保存方法の開発にも大量の資源を投入する
## データのタイプ
+ 価格データとファンダメンタルデータに大別される
+ 価格データは高頻度、ファンダメンタルデータは週ごと、月ごと、四半期ごと、などデータによって収集周期が異なる
+ 高頻度トレードでは主に価格データを用いる
### 価格データ
+ 銘柄価格
+ 出来高
+ 各トレードの行なわれた時間やサイズ
+ １日を通して買値と売値の動きと量を銘柄別に継続的に記録した「オーダーブック」
+ 各種指数の水準など
### ファンダメンタルデータ
+ 価格以外のデータ
+ 経営状態
+ 財務実績
+ 金銭的価値
+ センチメント(市場心理)
+ ニュースフィード
+ GPSを利用することで政府発表の統計値を用いるよりも素早くかつ正確にさまざまな経済活動水準を判断しようとする企業もある
## データソース
+ 最も直接的でおそらく最も難しいのが一次情報源からの生データの入手
+ 二次データベンダーを利用することが多いがデータベンダー間で証券コードが異なることに注意
+ 三次データベンダーはさまざまなデータベンダーのデータをまとめて提供してくれるが、制約の多い
### 一次資料供給源
####取引所
+ 価格
+ 出来▼高
+ タイムスタンプ(データの作成・更新の日時情報)
+ 取引高(未決済建玉)
+ オーダーブックデータ
####規制当局
+ 各企業の財務諸表
+ 各銘柄の大株主や機関投資家の売買活動に関するファイリング
####政府
+ マクロ経済データ(雇用統計、インフレ率、GDPなどのデータ)
####企業
+ 決算報告とその関連データ(配当額の変更など)
####通信社
+ マスメディアへのニュース配信
+ ニュース記事
####データベンダー(データ生成者)
+ 独自に作成した関係者が関心を持つようなデータ(証券会社の企業レポートなど)
## データクリーニング
### データの欠損
+ データを欠損を認識できるようにプログラミングする
+ 欠損したデータを外挿する(ヒストリカルデータで特に便利)
### 数値に間違い
+ 桁に関するエラー
+ 価格が単に間違っている
+ これらに対してはスパイクフィルターで平滑化するか除去する
+ 流動性の低いものでは実際にスパイクが発生することもあるので注意
+ 人間に注意喚起するためにスパイクフィルターを警告として用いることもある
+ 複数のデータ提供者のデータを比較する方法もある
### 間違ったタイムスタンプ
+ 解決が難しい問題のひとつ
+ 時系列の順序が入れ替わるとさまざまな問題が発生する
+ 自身でデータをリアルタイムに取得しタイムスタンプと内部クロックを比較することでチェックできるが、リアルタイムに処理できなくてはならない
### 先読みバイアス
#### 非同時性
##### 財務諸表
+ データの修正履歴を注意深く追跡する必要がある
##### 各市場における引け時間の違い
## データの保存
### フラットファイル
+ 負荷が軽いが、順次検索
+ インデックスフラットファイル
### リレーショナルデータベース
+ データ間に複雑な関係を設定
+ データキューブ(柔軟性に欠ける)

# リサーチ
+ リサーチはクオンツトレーディングの心臓部
## リサーチの設計 ー 科学的手法
+ 科学的手法により意思決定に厳密性と規律がもたらされる
+ 市場は変化するため、継続的なリサーチが必要
## アイデアの着想
+ 市場の観察
+ 学術的文献
+ 人間の移動
+ 裁量トレーダーたちの活動から得られる教訓
## 検証
+ 検証はリサーチの中核
### インサンプル検証(トレーニング)
+ サンプルの範囲と期間
### 「良い」モデルは何によって決まるのか
#### 累積利益グラフ
+ 儲けることができたかどうか、どれくらいスムーズに儲けることができたか、どういったダウンサイドリスクが考えられるか、ということが分かる
#### 平均リターン
+ 戦略が過去にどれくらいうまく機能したかが分かる
#### リターンのバラツキ
+ 一般に、任意水準のリターンに対するバラツキが小さいほど優れた戦略
+ リターンまわりのバラツキが小さいほど、そのリターンに対する信頼度は増す
#### 山から谷までの最大ドローダウン
+ 累積利益曲線の山からの下落幅のなかで最大のもの
+ ドローダウンは小さいほうがよい
+ ドローダウンからの回復時間も測定
+ モデルが不調に陥いったあとどういった振舞いをするかを知ることができる
#### 予測能力
+ 決定係数(相関係数の2乗)
+ クオンツ業界では非常に高い決定係数は0.05
#### 勝率またま勝ち時間
+ 安定性を測る尺度のひとつ
+ 勝ち時間の全時間に対する比率(通常勝ち日の全日数に対する比率)
#### さまざまなリターン・リスク比率
+ 一定期間における超過リターン(無リスクレートを上回るリターン)の平均をリターンのバラツキで割ったシャープレシオはリスク調整済みリターンの典型例
+ シャープレシオの公式から無リスクレートを除去したものはインフォメーションレシオ
+ スターリングレシオ(平均リターン/平均を下回るリターンのバラツキ)
+ カルマーレシオ(平均リターン/山から谷までの最大ドローダウン)
+ オメガレシオ(正のリターンの合計/負のリターンの合計)
#### 他の戦略との関係
+ クオンツは複数の戦略を同時に用いることが多く、戦略ポートフォリオを使って効果的な運用を目指す
+ 新しいアイデアを加える場合、すでに利用しているアイデアとうまく調和するかどうかを測定する
+ 新しいアイデアと既存の戦略ポートフォリオとの相関
+ 新しいアイデアを加えたときと加えないときを比べ、付加価値を測る
#### 情報の時間的価値の減少
+ 戦略が情報をタイムリーに取得することに対してどれくらい敏感か
+ 予測効果は市場においてどれくらいの期間有効なのか
+ トレーディングシグナルを受け取ってからトレードを行うまでのタイムラグ
#### 特定の変数に対する感度
+ 微小な変化に対して敏感過ぎる変数は信用できない
+ 感応度が高過ぎる変数はオーバーフィッティングの可能性がある
### オーバーフィッティング
+ オーバーフィッティングは、過去のデータにフィットし過ぎて将来の予測力が落ちる
+ 少ない仮定や変数で高い予測力を持つモデル(オッカムの剃刀)
### アウトオブサンプル検証
+ アウトオブサンプル検証の決定係数のインサンプル検証の決定係数に対する比率(1に近いと堅牢なモデル。例えば0.5以上)
+ インサンプル検証で使われなかったデータを使う
+ ローリングウィンドウ方式
+ 正しく検証を行うことは難しい(先読みバイアスなど)
### 検証における仮説の設定
+ 取引コストや空売りの可否など
+ 仮説は戦略の善し悪しを決めるうえで極めて重要

# クオンツ戦略に内包されるリスク
## モデルリスク
+ モデルは現実世界の近似
### モデル化の間違った適用
+ 計量的モデリングを適用すべきでない問題に適用(主観的な問題など)
+ 正しく適用すれば有効なテクニックを間違った方法で適用(VaRなど)
### モデルの間違った定式化
+ まれにしか起こらないイベントに関するものが多い(2007年8月直後の米国大型株の流動性リスクのモデル化など)
### 実装エラー
+ おそらくモデルリスクのなかで最も多いエラー
+ プログラミングやアーキテクチャの誤り
## 市場のレジーム変化によるリスク
+ ほとんどのクオンツモデルはヒストリカルデータを基に構築し、市場が一定の期間特定の振舞いをした場合、その振舞いが持続することを前提にモデルを構築が、市場のレジームが変われば打撃を受ける
+ 過去の振舞いが持続することに対する依存度が著しく高い戦略(トレンドフォローなど)が打撃を受ける
+ 市場のレジーム変化は複数の資産クラスにわたって同時発生するため、クオンツにとって痛手となる
## 外因性ショックリスク
+ 外因性ショックとは市場外部の情報によって発生したもの(テロ、戦争の勃発、規制当局の介入など)
+ 市場外部の情報が市場価格に影響を及ぼし始めると、通常よりも大きな価格変動が起こるため、クオンツ戦略は打撃を受ける
+ こうした情報は定量化不能で、めったにない情報のため、手の打ちようがないリスク
## 伝播リスク(典型投資家リスク)
+ 他の投資家が同じ戦略を保有していることによって生じるリスク
+ ある戦略が大きな損失を出すと、それとまったく無関係の戦略も売られるという現象をATM効果という(資金難と追証の請求に直面した高レバジッジの投資家は、流動性のない戦略は売れないため、流動性のある戦略を売る)
+ 1998年8月と2007年8月の信用危機によって信用商品の流動性が低下し、信用危機とは無関係の流動性資産を売らざるを得なかった
### 2007年に大手クオンツファンドが一斉に資産の強制売却に追い込まれた要因
+ 似たようなバリューベースのクオンツ戦略に巨額のマネーが投資された
+ 米国におけるロングショート型クオンツトレーディングのパフォーマンスが年初来低迷していた
+ 流動性の高いクオンツ戦略と大きな損失を被っていた流動性の低い信用ベースの戦略とのペアトレードによって、危機発生と同時に流動性の高い戦略がATMとして使われた
+ リスクターゲッティングとレバレッジの調整にVaRが使用された
## クオンツのリスク監視
+ エクスポージャーの監視(関心のあるエクスポージャーごとにグループ分けして分析)
+ 損益の監視(前日の引け時点におけるポジションの価格を現在の市場価格と比較)
+ 執行の監視(今執行中の注文、最近執行された注文、取引量や取引価格など)
+ システムパフォーマンスの監視(ソフトウェアエラーやインフラエラーのチェック、CPUパフォーマンス、各段階における処理速度、 メッセージの伝達遅延)

# クオンツトレーディングに対する批判
## トレーディングはアートであって科学ではない
+ 市場を動かしているのは人間であり、人間の振舞いはモデル化できない
+ クオンツモデルにも完璧を期待することはできないが、よく設計されたクオンツ戦略は市場の長期にわたる振舞いを十分な精度で予測できるため、実践者に大きな利益をもたらす
## クオンツがリスクを過小評価することで市場ボラティリティは上昇する
+ クオンツがリスクを過小評価するために市場ボラティリティが上昇するという主張は的外れ
## 普段とは異なるイベントや市場状態の急激な変化にクオンツは対応できない
+ 将来の予測するのにヒストリカルデータに依存するため、市場の振舞いが大きく変化したときには大きな打撃を受ける
+ 市場のレジーム変動期をうまく切り抜けるクオンツ戦略も存在する
## クオンツはみんな同じだ
+ ひとつひとつのトレードは大差なくてもトレード数が年間何百万にも及べば積もり積もって大差になる
## 長期的に見て成功するクオンツは少数の大手クオンツのみ
+ 運用額が多いことが必ずしも良いとは限らない
+ 非常に魅力的な戦略は大手クオンツには向かない
+ 小規模ヘッジファンドが実際に大手ファンドをアウトパフォームすることを示す証拠がある
+ 大手マネージャーは規模を拡大するために自分の専門外の分野に手を広げなくてはならないが、小規模マネージャーは自分の得意分野に集中できる
+ クオンツ戦略の質の大部分は担当責任者の良い意思決定と健全なリサーチプロセスによって決まる
## クオンツはデータマイニングという罪を犯している
+ データマイニングと理論科学は紙一重

# クオンツとクオンツ戦略の評価
## 情報収集
+ レイモンドトリバー著「インテロゲーター」が参考になる
+ 信頼関係を築く
+ 質問者が答えをほとんど知っている場合、相手は情報を秘密にしておくことに正当性を感じない
+ 徹底した情報管理が重要
## クオンツトレーディング戦略の評価
###  リサーチと戦略の開発
+ トレーディング戦略についての新しいアイデアはどのように着想するのか
+ それらのアイデアの検証方法は？
+ 戦略が機能しているかどうかを判断するのに何を見るか
###  データの収集、クリーニング、管理
+ どういったデータを使っているのか
+ データはどのように保存するのか。またその理由は？
+ データはどのようにクリーニングするのか
###  投資の選択と構成
+ あなたのアルファモデルは理論駆動型かデータ駆動型か
+ どういったタイプのアルファ戦略を使っているのか(例えば、トレンド、回帰、バリュー、利回り、グロース、質)
+ 相対賭けか個別賭けか
+ 相対賭けの場合、相対の具体的な意味は？
+ 投資の対象期間と投資対象は？
+ 複数のアルファモデルをどう組み合わせるのか
###  ポートフォリオの構築
+ ポートフォリオの構築方法
+ どういった限度を設けているのか。またその理由は？
+ ポートフォリオ構築に用いる入力量は？
+ ポートフォリオの構築で目指すものは？(つまり「目的関数」は何か)
###  執行
+ どういった取引コストモデルを使っているのか。また、そのモデルを用いる理由は？
+ トレードの執行方法 ー 手動かアルゴリズムか
+ あなたの注文執行アルゴリズムについて ー アルゴリズムに組み込んでいるもの(例えば、隠された注文か目に見える注文か、アクティブかパッシブか)
###  リスクの管理と監視
+ あなたのリスクモデルは何を説明するモデルか。またなぜそういったものを説明するのか。
+ どこにどういったリスク制限を設けているのか。またその理由は？
+ どういった状況のときにモデルに介入するのか
+ 継続的に監視しているものは？
###  クオンツトレーダーのスキルの評価
+ よい意思決定を行ういは経験がものを言う
+ クオンツは分析は注意深く慎重に行い、将来に対する自分の予測能力については謙虚でなればならない
+ 細部からクオンツのシステムの質を判断するには投資家側にも十分な経験が求められる
+ 非クオンツの投資家がクオンツを適正に評価するために必要なのは、評価と精査過程における完全性と徹底した情報管理
###  エッジ(優位性)
+ ここでいうエッジとはポートフォリオマネージャーの成功を後押しするものを意味し、競争力とは異なる
+ エッジ源の大きな順：投資プロセス、競争がないこと、構造的要素
+ トレーダーのエッジは持続可能なものであるかを確認することが重要
+ エッジを持っていると主張したら、それを徹底的に調べる必要がある
###  誠実さの評価
+ クオンツを含むトレーダーは全般的に正直で倫理的な人物が多いため、「信頼すれども確認を怠らず」という姿勢で臨むのがよい
+ 背景と学歴を調べ、身元照会を行う
+ クオンツの細部を知ることはそのクオンツの誠実さを知るうえでも有用
###  そのクオンツはあなたのポートフォリオに加える価値があるのか
#### アルファのポートフォリオ
+ 投資家が最初にアルファエクスポージャーを分散しておくことが重要
#### 儲け構造
+ 儲け構造についても分散化しておくのが良い
#### 対象期間の分散化
+ エクスポージャーは対象期間についてもバランスを取る必要がある
+ 短期戦略は安定したパフォーマンスを示す傾向が高いが、あまり大きな資産は扱えない

#### ポートフォリオ構築における考察事項のまとめ
次の3つの要素を考慮した分散化ポートフォリオを構築すること
+ さまざまなタイプのアルファエクスポージャー
+ さまざまな儲け構造
+ さまざまな対象期間

# クオンツトレーディングの未来
+ ほとんどのクオンツはアルファモデルに過度の時間を費やすが、この分野のこれ以上の進化は期待できない
+ 短期的には比較的標準的なアルファモデルはアジアやヨーロッパの小さな発展市場や世界の新興市場で活躍の余地があるかもしれない
+ 参入障壁の低い国々や資産クラスで新しい形のアルファが発見され活用されるだろう
+ アルファモデルの組合せ、ポジションサイジング、リスク管理の分野で革新の余地がある
+ クオンツと自由裁量のハイブリッドな戦略など、クオンツトレーディングシステムの使われ方も進化していくだろう
+ 「クオンツの共同体」構造が誕生する可能性があり、戦略の独自な要素は極秘に維持しながら他では知恵を借りることができるようになるだろう
