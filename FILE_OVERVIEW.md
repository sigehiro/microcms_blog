# microcms_blog ファイル概要

Next.js 14 (App Router) と microCMS を組み合わせたブログサイトです。React Query でクライアントサイドのデータフェッチ、Tailwind CSS + shadcn/ui でスタイリングを行っています。このドキュメントでは、リポジトリ内の主なファイルとその役割をまとめます。

## ルート設定・ビルド関連
- `README.md` : create-next-app のデフォルト手順。開発サーバーの起動方法など。
- `package.json` / `package-lock.json` : 依存パッケージと npm スクリプト (`dev`/`build`/`start`/`lint`).
- `next.config.mjs` : 外部画像ホスト `images.microcms-assets.io` を許可する Next.js 設定。
- `tsconfig.json` : `@/*` のパスエイリアスや strict 設定を含む TypeScript コンパイラ設定。
- `next-env.d.ts` : Next.js が自動生成する型宣言ファイル。
- `tailwind.config.ts` : クラスベースのダークモードと shadcn トークンを含む Tailwind 拡張設定。
- `postcss.config.mjs` : PostCSS で Tailwind のみを読み込む設定。
- `components.json` : shadcn/ui のスタイルやエイリアス設定。
- `.env` : microCMS のサービスドメイン (`NEXT_PUBLIC_MICROCMS_API_URL`) と公開用 API キー (`NEXT_PUBLIC_MICROCMS_API_KEY`) を保持。取り扱いに注意。
- `public/default.png` : サイドバーのプロフィールで使用するデフォルト画像。

## ライブラリ・ユーティリティ
- `src/lib/microcms.ts` : `.env` からサービスドメインと API キーを読み取り、`microcms-js-sdk` のクライアントを生成。
- `src/lib/utils.ts` : Tailwind クラス結合ヘルパー `cn` と一覧表示件数 `blogPerPage` を定義。
- `src/types/index.ts` : Blog / Category / Sidebar など、microCMS で扱うデータ型を集約。

## アプリケーション共通 (src/app)
- `src/app/layout.tsx` : サイト全体のルートレイアウト。M PLUS 1 フォントを適用し、React Query のプロバイダで全体をラップ。
- `src/app/globals.css` : Tailwind の base/components/utilities と shadcn のカラートークンを定義。
- `src/app/error.tsx` : 500 エラー表示用のクライアントコンポーネント。
- `src/app/loading.tsx` : ルートロード時に `Loader2` を表示するスピナー。
- `src/app/not-found.tsx` : 404 ページ用のクライアントコンポーネント。
- `src/app/fonts/GeistVF.woff`, `src/app/fonts/GeistMonoVF.woff` : プロジェクトで利用する Geist フォント。

### /src/app/(main)
- `layout.tsx` : ナビゲーションとフッターを含むメインレイアウト。子ページを `<main>` 内に描画。
- `page.tsx` : トップページ。microCMS から各カテゴリのブログを同時取得し、`Top` と `TopList` に渡す。
- `about/page.tsx` : 最新のアバウト記事を取得し、cheerio + highlight.js で HTML を整形して `About` に表示。
- `blog/page.tsx` : ブログ一覧。クエリに基づいてページングし、`Blog` コンポーネントへ渡す。
- `blog/[blogId]/page.tsx` : ブログ詳細。本文を整形し、同カテゴリの記事を関連記事として取得。
- `category/[categoryId]/page.tsx` : カテゴリ別記事一覧。ページング情報を計算して `Category` に渡す。
- `archive/[year]/[month]/page.tsx` : 指定年月のアーカイブ記事を取得し、`Archive` に渡す。
- `ranking/page.tsx` : ランキング値が設定された記事を取得し、`Ranking` に表示。

## コンポーネント (src/components)
- `about/About.tsx` : アバウトページの HTML コンテンツを描画する薄いラッパー。
- `archive/Archive.tsx` : 指定月のタイトルと記事グリッド、ページネーションを表示。
- `blog/Blog.tsx` : 記事グリッドとページネーションの親コンポーネント。
- `blog/BlogDetail.tsx` : 単一記事の詳細表示と関連記事グリッド。
- `blog/BlogItem.tsx` : 記事カード。カテゴリカラーやランキング表示を管理。
- `category/Category.tsx` : カテゴリ名の見出しと記事リスト、ページネーション。
- `layout/LayoutWithSidebar.tsx` : メイン2カラムレイアウト。サイドバーとコンテンツを配置。
- `navigation/Navigation.tsx` : トップメニュー。現在のパスに応じてアクティブ表示。
- `navigation/Sidebar.tsx` : React Query で最新記事・カテゴリ別件数・アーカイブを取得して表示。
- `pagers/PaginationButton.tsx` : クエリパラメータを書き換えながらページ移動するボタン群。
- `providers/QueryProvider.tsx` : `QueryClient` を初期化してアプリ全体に提供。
- `ranking/Ranking.tsx` : ランキング一覧。`BlogItem` を順位付きで表示。
- `top/Top.tsx` : Swiper を使ったおすすめ記事スライダー。
- `top/TopList.tsx` : フィルタタブでカテゴリーを切り替えながら記事一覧を表示。
- `ui/button.tsx` : shadcn/ui ベースのボタンコンポーネントとバリアント設定。

## その他
- `components.json` : shadcn/ui の設定ファイル (再掲)。
- `node_modules/` : 依存ライブラリ (自動生成、通常はコミット対象外)。

今後ファイルを追加した際は、このドキュメントに追記して変更意図を残すと管理しやすくなります。
