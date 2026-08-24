const SITE_CONFIG = Object.freeze({
  siteName: "ふーまのAI工房",
  siteUrl: "https://fuma7587-del.github.io/homepages/",
  noteUrl: "https://note.com/fuma_ai_kobo",
  xUrl: "https://x.com/fuma_ai_kobo",
  youtubeUrl: "https://youtube.com/@rainytokyostudio?si=aV0q2IfKYIdexVlU",
  githubUrl: "https://github.com/Fuma7587-del",
  coconalaUrl: "https://coconala.com/users/5708207",
  pcSupportUrl: "https://coconala.com/services/4339404",
  usedPcCheckUrl: "https://coconala.com/services/4335513",
  coconalaBlogUrl: "https://coconala.com/blogs/5708207/790448",
  coconalaBlogQuestionsUrl: "https://coconala.com/blogs/5708207/794279",
  contactEmail: "rein7587@gmail.com",
  analyticsMeasurementId: "G-JDGQJWE897"
});

const ANALYTICS_CONSENT_KEY = "fuma-ai-kobo-analytics-consent";

function loadGoogleAnalytics() {
  if (!SITE_CONFIG.analyticsMeasurementId || window.googleAnalyticsLoaded) return;
  window.googleAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", SITE_CONFIG.analyticsMeasurementId);

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(SITE_CONFIG.analyticsMeasurementId)}`;
  document.head.append(tag);
}

function showAnalyticsConsent() {
  if (document.querySelector("[data-analytics-consent]")) return;
  const banner = document.createElement("section");
  banner.className = "analytics-consent";
  banner.dataset.analyticsConsent = "";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "アクセス解析の設定");
  banner.innerHTML = `<div><strong>アクセス解析について</strong><p>サイト改善のためGoogle Analyticsを使用します。同意するとCookieなどを利用して匿名の利用状況を収集します。<a href="privacy.html">詳しく見る</a></p></div><div class="analytics-consent-actions"><button type="button" class="button secondary" data-analytics-deny>同意しない</button><button type="button" class="button" data-analytics-accept>同意する</button></div>`;

  const decide = (choice) => {
    try { localStorage.setItem(ANALYTICS_CONSENT_KEY, choice); } catch (_) { /* 保存できない場合も選択は反映 */ }
    banner.remove();
    if (choice === "granted") loadGoogleAnalytics();
  };
  banner.querySelector("[data-analytics-deny]").addEventListener("click", () => decide("denied"));
  banner.querySelector("[data-analytics-accept]").addEventListener("click", () => decide("granted"));
  document.body.append(banner);
}

function initializeAnalyticsConsent() {
  let consent = null;
  try { consent = localStorage.getItem(ANALYTICS_CONSENT_KEY); } catch (_) { /* 読み取れない場合は確認を表示 */ }
  if (consent === "granted") loadGoogleAnalytics();
  else if (consent !== "denied") showAnalyticsConsent();

  const reset = document.querySelector("[data-analytics-consent-reset]");
  if (reset) reset.addEventListener("click", () => {
    try { localStorage.removeItem(ANALYTICS_CONSENT_KEY); } catch (_) { /* 保存領域が使えなくても再表示 */ }
    showAnalyticsConsent();
  });
}

const NOTE_ARTICLES = Object.freeze([
  { title: "生成AIで作った表はそのまま使わない｜数字・単位・合計を確認する6項目", url: "https://note.com/fuma_ai_kobo/n/nd3498a4d1978", category: "AI活用", description: "生成AIが作った表を共有する前に、項目、数字、単位、合計、並び順、出典を確認する方法を紹介します。", image: "assets/images/articles/2026-08-24-ai-table-checklist.png" },
  { title: "OpenAIが「ChatGPT for Teens」を発表｜学習支援と安全機能を初心者向けに整理", url: "https://note.com/fuma_ai_kobo/n/nac4750f30461", category: "AIニュース", description: "13〜17歳向けの学習支援、安全対策、保護者向け管理機能を公式情報から整理します。", image: "assets/images/articles/2026-08-22-chatgpt-for-teens.png" },
  { title: "生成AIの回答が物足りないときは？追加質問で改善する5つの基本", url: "https://note.com/fuma_ai_kobo/n/nc38acd333842", category: "AI活用", description: "最初の回答の不足や曖昧さを見つけ、追加質問で内容を改善する基本を紹介します。", image: "assets/images/articles/2026-08-21-ai-follow-up-questions.png" },
  { title: "記事制作を月次レポートにする方法｜JSONから進捗を正しく振り返る", url: "https://note.com/fuma_ai_kobo/n/nd1ae604fe5a4", category: "記事制作", description: "制作ログから公開状況やカテゴリの偏りを集計し、次の改善につなげる方法を紹介します。", image: "assets/images/articles/2026-08-20-monthly-article-report.png" },
  { title: "生成AIで下書きが増えすぎたら｜公開待ちの記事を整理する5ステップ", url: "https://note.com/fuma_ai_kobo/n/nfbb51bb8ac13", category: "記事制作", description: "下書き、画像、投稿準備、公開状況を整理し、公開に近い記事から仕上げる流れを紹介します。", image: "assets/images/articles/2026-08-19-organize-article-backlog.png" },
  { title: "生成AIで作ったWebツール、公開前に何を見る？初心者向け7つの確認項目", url: "https://note.com/fuma_ai_kobo/n/n6cf93ac7c9f6", category: "Web開発", description: "入力、エラー、保存、スマホ表示、個人情報など、Webツール公開前の確認項目を整理します。", image: "assets/images/articles/2026-08-18-prepublish-web-tool-checklist.png" },
  { title: "記事・画像・JSONをまとめて守る｜日付別にバックアップする基本手順", url: "https://note.com/fuma_ai_kobo/n/n733d955c6a04", category: "自動化", description: "記事本文、画像、JSON、投稿用セットを取り違えずにバックアップする基本手順を紹介します。", image: "assets/images/articles/2026-08-17-backup-article-package.png" },
  { title: "AI要約で重要な条件を落とさない方法｜日付・数値・例外を残す指示の作り方", url: "https://note.com/fuma_ai_kobo/n/nd95bd821ca8f", category: "AI活用", description: "AI要約で期限、金額、対象者、例外、注意事項を残すための指示と確認方法を紹介します。", image: "assets/images/articles/2026-08-16-preserve-details-ai-summary.png" },
  { title: "生成AIで社内ツールを作る前に｜手戻りを減らす「要件メモ」テンプレート", url: "https://note.com/fuma_ai_kobo/n/n4b5b63e62d69", category: "アプリ開発", description: "利用者、入力、出力、権限、保存、エラー対応を整理する要件メモの作り方を紹介します。", image: "assets/images/articles/2026-08-15-internal-tool-requirements-memo.png" },
  { title: "有料記事の価格、どう決める？値付け前に整理したい5つのこと", url: "https://note.com/fuma_ai_kobo/n/nabbb1be01b7e", category: "情報発信", description: "読者の課題、無料部分との差、成果物、制作負担、更新対応から価格を考える方法を紹介します。", image: "assets/images/articles/2026-08-14-paid-article-pricing-basics.png" },
  { title: "Markdown記事のリンク切れ候補を探す方法｜ローカル点検で確認漏れを減らそう", url: "https://note.com/fuma_ai_kobo/n/nde75fcd31fcc", category: "自動化", description: "Markdown内のリンク切れ候補をローカルで洗い出し、人が確認する流れを紹介します。", image: "assets/images/articles/2026-08-13-find-broken-link-candidates.png" },
  { title: "生成AIニュースはどう選ぶ？公式発表を記事化する5つの基準", url: "https://note.com/fuma_ai_kobo/n/n38ece55df461", category: "AIニュース", description: "公式発表の新しさだけでなく、読者との関係、利用条件、実用性、検証可能性から判断します。", image: "assets/images/articles/2026-08-12-select-ai-news-official-announcements.png" },
  { title: "毎日AI記事を作り続ける？制作頻度を見直す4つのサイン", url: "https://note.com/fuma_ai_kobo/n/n118962e82963", category: "記事制作", description: "似た記事や確認待ちが増えたときに、制作頻度と工程を見直す判断ポイントを紹介します。", image: "assets/images/articles/2026-08-11-review-daily-ai-article-workflow.png" },
  { title: "生成AIのデータ設定、見直していますか？学習・履歴・削除の確認ポイント", url: "https://note.com/fuma_ai_kobo/n/n0098233dfc1e", category: "AI活用", description: "学習への利用、履歴、削除など、生成AIサービスのデータ設定を確認するポイントを整理します。", image: "assets/images/articles/2026-08-10-generative-ai-data-settings-check.png" },
  { title: "NotebookLMで複数資料を比較する方法｜共通点・違い・根拠を整理しよう", url: "https://note.com/fuma_ai_kobo/n/nf0eca8a736aa", category: "NotebookLM", description: "複数の資料を読み比べ、共通点や違い、根拠を整理する方法を紹介します。", image: "assets/images/articles/2026-08-09-notebooklm-compare-sources.png" },
  { title: "OpenAI Presenceとは？企業向けAIエージェントの特徴・提供条件を整理", url: "https://note.com/fuma_ai_kobo/n/n5358a57d6532", category: "AIニュース", description: "企業向けAIエージェントの特徴と提供条件を、確認できる情報から整理します。", image: "assets/images/articles/2026-08-08-openai-presence-guide.png" },
  { title: "Gemini Sparkとは？24時間動くAIエージェントの機能・利用条件・注意点", url: "https://note.com/fuma_ai_kobo/n/n10e03b1b9f83", category: "AIニュース", description: "Gemini Sparkの機能、利用条件、使う前に確認したい注意点をまとめます。", image: "assets/images/articles/2026-08-07-gemini-spark-guide.png" },
  { title: "記事とタイトル画像の取り違えを防ぐ｜公開日・slug・記事番号の確認方法", url: "https://note.com/fuma_ai_kobo/n/n9f4829b685a1", category: "記事制作", description: "記事と画像の対応ミスを防ぐための、公開前チェック方法を紹介します。", image: "assets/images/articles/2026-08-06-match-article-title-image.png" },
  { title: "無料記事と有料記事はどう分ける？読者に伝わるテーマ設計の考え方", url: "https://note.com/fuma_ai_kobo/n/n0fbfe40282d4", category: "情報発信", description: "無料記事と有料記事の役割を整理し、テーマを設計する考え方を紹介します。", image: "assets/images/articles/2026-08-05-free-paid-article-theme-design.png" },
  { title: "生成AIに任せていい作業・人が判断すべき作業｜初心者向けの役割分担", url: "https://note.com/fuma_ai_kobo/n/nda3f00cd11c9", category: "AI活用", description: "生成AIが得意な作業と、人が確認・判断すべき作業を分かりやすく整理します。", image: "assets/images/articles/2026-08-04-ai-human-task-boundaries.png" },
  { title: "今週の生成AI公式情報を比較｜ChatGPT・Gemini・Claudeを5つの軸で確認する方法", url: "https://note.com/fuma_ai_kobo/n/naf4050b47b75", category: "AIニュース", description: "主要な生成AIの公式情報を、同じ基準で比較するための確認方法を紹介します。", image: "assets/images/articles/2026-08-03-weekly-ai-official-updates.png" },
  { title: "コピペで使える生成AIプロンプト50選｜仕事・副業・情報発信を効率化", url: "https://note.com/fuma_ai_kobo/n/n5ce642df6d4f", category: "有料記事", description: "仕事、副業、情報発信で使える生成AIプロンプトを用途別にまとめています。", image: "assets/images/articles/2026-08-02-generative-ai-prompts-50.png", paid: true },
  { title: "Pythonで記事ファイルの命名ミスを防ぐ｜保存前に確認したい5つのポイント", url: "https://note.com/fuma_ai_kobo/n/n4427e1fab88f", category: "自動化", description: "記事ファイルを保存するときの命名ミスを防ぐ確認ポイントを紹介します。", image: "assets/images/articles/2026-08-01-python-article-filename-check.png" },
  { title: "ChatGPTで長い文章を読みやすくする｜初心者向けに整える5つの確認ポイント", url: "https://note.com/fuma_ai_kobo/n/n1b1ffcec80ff", category: "ChatGPT", description: "長い文章を読みやすく整えるために、ChatGPTと確認したいポイントをまとめます。", image: "assets/images/articles/2026-07-31-chatgpt-readable-writing.png" },
  { title: "「反応が良かった」で終わらせない｜AI副業の成果を週単位で記録する方法", url: "https://note.com/fuma_ai_kobo/n/nfffed38c0fd2", category: "AI副業", description: "AI副業の活動と反応を週単位で振り返り、次の改善につなげる方法を紹介します。", image: "assets/images/articles/2026-07-30-ai-side-hustle-weekly-log.png" },
  { title: "AIで月5万円を目指す活動記録・1週目｜まず記事制作の土台を整えた", url: "https://note.com/fuma_ai_kobo/n/n6ae8e077f6d3", category: "活動記録", description: "AIを活用した収益化への挑戦と、最初の1週間で整えた記事制作の土台を記録します。", image: "assets/images/articles/2026-07-29-ai-side-hustle-week1.png" },
  { title: "Codexで記事制作を自動化して分かった4つの失敗｜改善したことも公開", url: "https://note.com/fuma_ai_kobo/n/n02a4b338ba20", category: "Codex", description: "記事制作の自動化で起きた失敗と、その後に行った改善を振り返ります。", image: "assets/images/articles/2026-07-28-article-workflow-failure-lessons.png" },
  { title: "CodexでWebアプリを作る前に｜初心者が決めたい6つのこと", url: "https://note.com/fuma_ai_kobo/n/n986c247c4ea6", category: "アプリ開発", description: "Webアプリ制作を始める前に決めておきたい要件を、初心者向けに整理します。", image: "assets/images/articles/2026-07-27-small-web-app-planning.png" },
  { title: "AIニュースはどこで確認する？公式情報を見つける5つの手順", url: "https://note.com/fuma_ai_kobo/n/n82925fdc0c56", category: "AIニュース", description: "未確認情報に振り回されないために、AIの公式情報を探す手順を紹介します。", image: "assets/images/articles/2026-07-26-ai-news-official-source-check.png" },
  { title: "Codexでnote記事制作をひとつの依頼にまとめた｜画像・投稿準備・報告まで", url: "https://note.com/fuma_ai_kobo/n/n219cc9a8f518", category: "Codex", description: "記事本文、画像、投稿準備、作業報告までを一つの制作フローにまとめた記録です。", image: "assets/images/articles/2026-07-25-codex-one-command-article-workflow.png" },
  { title: "Codexで記事の公開前チェックを自動化｜コピペで使えるPythonスクリプト付き", url: "https://note.com/fuma_ai_kobo/n/n977368e82afb", category: "有料記事", description: "記事公開前の確認を自動化する考え方とPythonスクリプトを紹介します。", image: "assets/images/articles/2026-07-24-codex-article-prepublish-check.png", paid: true },
  { title: "はじめまして。「ふーまのAI工房」を始めます。", url: "https://note.com/fuma_ai_kobo/n/n5e00dbf92acc", category: "はじめに", description: "ふーまのAI工房で取り組むテーマと、これからの発信方針をご紹介します。" }
]);

function renderNoteArticles() {
  document.querySelectorAll("[data-note-articles]").forEach((container) => {
    const limit = Number.parseInt(container.dataset.limit || "", 10);
    const articles = Number.isFinite(limit) ? NOTE_ARTICLES.slice(0, limit) : NOTE_ARTICLES;
    articles.forEach((article, index) => {
      const card = document.createElement("article");
      card.className = "card note-article-card";
      const thumb = document.createElement("div");
      thumb.className = "article-thumb";
      if (article.image) {
        const image = document.createElement("img");
        image.src = article.image;
        image.alt = `${article.title}のタイトル画像`;
        image.loading = "lazy";
        image.decoding = "async";
        image.addEventListener("error", () => {
          image.remove();
          thumb.classList.add(["thumb-blue", "thumb-purple", "thumb-cyan"][index % 3]);
          const fallbackText = document.createElement("span");
          fallbackText.textContent = article.category;
          thumb.append(fallbackText);
        }, { once: true });
        thumb.append(image);
      } else {
        thumb.classList.add(["thumb-blue", "thumb-purple", "thumb-cyan"][index % 3]);
        thumb.setAttribute("aria-hidden", "true");
        const thumbText = document.createElement("span");
        thumbText.textContent = article.category;
        thumb.append(thumbText);
      }
      const content = document.createElement("div");
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = article.paid ? "note・有料記事" : `note・${article.category}`;
      const title = document.createElement("h3");
      title.textContent = article.title;
      const description = document.createElement("p");
      description.textContent = article.description;
      const link = document.createElement("a");
      link.className = "text-link";
      link.href = article.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "noteで読む →";
      content.append(tag, title, description, link);
      card.append(thumb, content);
      container.append(card);
    });
  });
}

function addYoutubeContent() {
  const makeYoutubeLink = (className, text) => {
    const link = document.createElement("a");
    link.className = className;
    link.dataset.link = "youtubeUrl";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = text;
    return link;
  };

  const topicLinks = document.querySelector(".topic-nav .container");
  if (topicLinks && !topicLinks.querySelector("[data-link='youtubeUrl']")) {
    topicLinks.append(makeYoutubeLink("", "YouTube"));
  }

  document.querySelectorAll(".side-card").forEach((card) => {
    if (card.querySelector(".side-label")?.textContent.trim() !== "FOLLOW") return;
    const actions = card.querySelector(".side-actions");
    if (actions && !actions.querySelector("[data-link='youtubeUrl']")) {
      actions.append(makeYoutubeLink("button secondary", "YouTube"));
    }
  });

  document.querySelectorAll(".section").forEach((section) => {
    if (section.querySelector(".eyebrow")?.textContent.trim() !== "FOLLOW") return;
    const grid = section.querySelector(".grid");
    if (!grid || grid.querySelector("[data-youtube-card]")) return;
    grid.classList.remove("two");
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.youtubeCard = "";
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "YouTube";
    const title = document.createElement("h3");
    title.textContent = "Rainy Tokyo Studio";
    const description = document.createElement("p");
    description.textContent = "雨の東京をテーマにした映像や音を、YouTubeで発信しています。";
    card.append(tag, title, description, makeYoutubeLink("button secondary", "チャンネルを見る"));
    grid.append(card);
  });

  document.querySelectorAll(".timeline").forEach((timeline) => {
    if (timeline.querySelector("[data-youtube-activity]")) return;
    const item = document.createElement("article");
    item.className = "timeline-item";
    item.dataset.youtubeActivity = "";
    const time = document.createElement("time");
    time.dateTime = "2026-08";
    time.textContent = "2026年8月";
    const title = document.createElement(timeline.querySelector("h2") ? "h2" : "h3");
    title.textContent = "Rainy Tokyo Studioを開始";
    const description = document.createElement("p");
    description.textContent = "雨の東京をテーマにしたYouTubeチャンネル「Rainy Tokyo Studio」での発信を始めました。";
    item.append(time, title, description, makeYoutubeLink("text-link", "YouTubeチャンネルを見る →"));
    timeline.prepend(item);
  });
}

function addLatestCoconalaContent() {
  const latestTitle = "中古パソコン購入前に販売店へ聞きたい7つの質問｜コピペ用テンプレ付き";
  const latestSummary = "正確な型番、バッテリー、液晶やキーボード、各端子、ストレージ、付属品、初期不良時の対応について、販売店へ確認したい質問をまとめています。";

  const featured = document.querySelector(".external-article .featured-article");
  if (featured) {
    const thumb = featured.querySelector(".article-thumb span");
    const tag = featured.querySelector(".tag");
    const title = featured.querySelector("h3");
    const description = featured.querySelector("p");
    const link = featured.querySelector("a");
    if (thumb) thumb.innerHTML = "中古PC<br>7つの質問";
    if (tag) tag.textContent = "ココナラブログ・2026年8月17日";
    if (title) title.textContent = latestTitle;
    if (description) description.textContent = latestSummary;
    if (link) link.dataset.link = "coconalaBlogQuestionsUrl";
  }

  const existingCoconalaArticle = document.querySelector(".article-highlight");
  if (existingCoconalaArticle && !document.querySelector("[data-latest-coconala-article]")) {
    const latest = existingCoconalaArticle.cloneNode(true);
    latest.dataset.latestCoconalaArticle = "";
    const thumb = latest.querySelector(".article-thumb span");
    const tag = latest.querySelector(".tag");
    const title = latest.querySelector("h2");
    const paragraphs = latest.querySelectorAll("p");
    const link = latest.querySelector("a");
    if (thumb) thumb.innerHTML = "中古PC<br>7つの質問";
    if (tag) tag.textContent = "2026年8月17日";
    if (title) title.textContent = latestTitle;
    if (paragraphs[0]) paragraphs[0].textContent = latestSummary;
    if (link) link.dataset.link = "coconalaBlogQuestionsUrl";
    existingCoconalaArticle.before(latest);
  }

  document.querySelectorAll(".timeline").forEach((timeline) => {
    if (timeline.querySelector("[data-coconala-blog-activity]")) return;
    const item = document.createElement("article");
    item.className = "timeline-item";
    item.dataset.coconalaBlogActivity = "";
    const time = document.createElement("time");
    time.dateTime = "2026-08-17";
    time.textContent = "2026年8月17日";
    const title = document.createElement(timeline.querySelector("h2") ? "h2" : "h3");
    title.textContent = "ココナラブログに中古PCの記事を投稿";
    const description = document.createElement("p");
    description.textContent = "購入前に販売店へ確認したい7つの質問と、コピペ用テンプレートを公開しました。";
    const link = document.createElement("a");
    link.className = "text-link";
    link.dataset.link = "coconalaBlogQuestionsUrl";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "記事を読む →";
    item.append(time, title, description, link);
    timeline.prepend(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeAnalyticsConsent();
  addYoutubeContent();
  addLatestCoconalaContent();
  renderNoteArticles();
  document.querySelectorAll("[data-link]").forEach((link) => {
    const value = SITE_CONFIG[link.dataset.link];
    if (!value) {
      link.replaceWith(Object.assign(document.createElement("span"), { className: "status", textContent: "準備中" }));
      return;
    }
    link.href = link.dataset.link === "contactEmail" ? `mailto:${value}` : value;
  });

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#global-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }));
  }

  const current = location.pathname.split("/").pop() || "index.html";
  const navList = document.querySelector("#global-nav .nav-list");
  if (navList && !navList.querySelector("[data-services-nav]")) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = current === "index.html" ? "#services" : "index.html#services";
    link.textContent = "サービス";
    link.dataset.servicesNav = "";
    item.append(link);
    navList.children[1]?.before(item);
  }
  document.querySelectorAll(".site-footer .footer-links").forEach((list) => {
    if (list.querySelector("[data-link='noteUrl']") && !list.querySelector("[data-link='coconalaUrl']")) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = SITE_CONFIG.coconalaUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.dataset.link = "coconalaUrl";
      link.textContent = "ココナラ";
      item.prepend(link);
      list.prepend(item);
    }
    if (list.querySelector("[data-link='noteUrl']") && !list.querySelector("[data-link='youtubeUrl']")) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = SITE_CONFIG.youtubeUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.dataset.link = "youtubeUrl";
      link.textContent = "YouTube";
      item.append(link);
      list.append(item);
    }
  });
  document.querySelectorAll("#global-nav a").forEach((link) => {
    if (link.getAttribute("href") === current) link.setAttribute("aria-current", "page");
  });
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
});
