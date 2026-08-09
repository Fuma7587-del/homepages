# ふーまのAI工房 公式ホームページ

「AIを学び、作り、稼ぐ。」をテーマに、Webツール、記事、制作記録をまとめる静的サイトです。

## 構成

- HTML / CSS / JavaScriptのみ
- 外部ライブラリ、外部フォント、サーバー処理なし
- GitHub Pages対応
- URLやSNSリンクは `script.js` 冒頭の `SITE_CONFIG` に集約

## ホームページ用画像

ホームページ専用の画像は `assets/images/site/` に保存しています。

- `ai-workshop-hero.png`：トップのAI工房イメージ
- `windows-pc-support.png`：PCサポートのイメージ
- `learn-build-share.png`：学習・制作・発信の活動イメージ

これらはChatGPTの画像生成機能で作成したオリジナル画像です。画像内には文字や外部サービスのロゴを入れず、見出しや説明文はHTML側で表示します。

## ローカル確認

ファイルを直接開くこともできますが、リンクや404ページを正しく確認するには、`website` フォルダーでローカルサーバーを起動します。

```powershell
python -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開きます。終了する場合はターミナルで `Ctrl+C` を押します。

## URLやSNSリンクの変更

`script.js` の `SITE_CONFIG` を編集します。

```js
const SITE_CONFIG = Object.freeze({
  siteName: "ふーまのAI工房",
  siteUrl: "https://fuma7587-del.github.io/homepages/",
  noteUrl: "https://note.com/fuma_ai_kobo",
  xUrl: "https://x.com/fuma_ai_kobo",
  githubUrl: "https://github.com/Fuma7587-del",
  coconalaUrl: "https://coconala.com/users/5708207",
  pcSupportUrl: "https://coconala.com/services/4339404",
  usedPcCheckUrl: "https://coconala.com/services/4335513",
  coconalaBlogUrl: "https://coconala.com/blogs/5708207/790448",
  contactEmail: "rein7587@gmail.com"
});
```

公開URLを変更する場合は、各HTMLの `canonical` とOGP URL、`robots.txt`、`sitemap.xml` も変更してください。

## ツール・記事の追加

### note記事

`script.js` の `NOTE_ARTICLES` の先頭に、タイトル、URL、カテゴリー、概要、画像パスを追加します。トップページには先頭から5件、記事一覧ページには全件が自動表示されます。有料記事の場合は `paid: true` を指定します。

記事画像は `images/generated/` の元画像を変更せず、対応するPNGを `website/assets/images/articles/` へコピーして使います。

```js
{
  title: "記事タイトル",
  url: "https://note.com/fuma_ai_kobo/n/記事ID",
  category: "カテゴリー",
  description: "記事の短い概要",
  image: "assets/images/articles/画像ファイル名.png"
}
```

画像を読み込めない場合は、カテゴリー名入りの代替サムネイルが自動表示されます。

### ツール・その他の記事

1. `tools.html` または `articles.html` に既存カードをコピーして追加します。
2. トップページにも掲載する場合は `index.html` の該当セクションへ追加します。
3. 未公開の内容にはリンクを付けず、「準備中」と明記します。
4. 新しいページを作った場合は `sitemap.xml` に正式URLを追加します。

## GitHub Pagesで公開する手順

1. GitHubで `homepages` リポジトリを作成します。
2. このフォルダー内のファイルをリポジトリ直下へ配置し、GitHubへプッシュします。
3. GitHubのリポジトリで **Settings → Pages** を開きます。
4. **Build and deployment** の Source を **Deploy from a branch** にします。
5. Branch を `main`、フォルダーを `/(root)` にして保存します。
6. 公開処理の完了後、`https://fuma7587-del.github.io/homepages/` を確認します。

すでにリポジトリ内の `website` フォルダーとして管理する場合は、GitHub Actionsでの公開設定、または公開用ブランチへ中身を配置する作業が別途必要です。最も簡単なのは、`website` の中身を `homepages` リポジトリ直下に置く方法です。

## 公開前チェックリスト

- [ ] 正式URLで全ページを開ける
- [ ] ヘッダー、フッター、ロゴから正しいページへ移動できる
- [ ] note、X、GitHub、PCえらび診断のリンクが正しい
- [ ] メールリンクが正しい
- [ ] 準備中の項目に存在しないリンクが付いていない
- [ ] PC、スマートフォンの両方で横スクロールや文字切れがない
- [ ] キーボードだけでメニューとリンクを操作できる
- [ ] 各ページのタイトル、description、canonical、OGPが正しい
- [ ] `robots.txt` と `sitemap.xml` のURLが公開先と一致する
- [ ] `404.html` が表示される
- [ ] プライバシーポリシーの内容を人が確認した
- [ ] アクセス解析、広告、Cookieを導入する場合はプライバシーポリシーを更新した
- [ ] 記事中の料金、仕様、提供条件を公式情報で再確認した
- [ ] 秘密情報や公開してはいけない個人情報が含まれていない

## 注意

このサイトはお問い合わせフォームを持ちません。メールリンクを利用するため、サーバー側で個人情報を保存しません。記事、料金、サービス仕様、外部リンクは公開前に必ず人が最終確認してください。
