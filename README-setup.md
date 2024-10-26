

# 開発環境セットアップ

## フロント

### 初回セットアップ手順

1. リポジトリのクローン
```bash
# リポジトリをクローン（mainブランチ）
git clone https://github.com/yudai-kdix/life_extension.git

# プロジェクトに移動
cd life_extension

# フロントエンド開発用のブランチ情報を取得
git fetch origin
git checkout -b front/develop origin/front/develop
```

2. 依存パッケージのインストール

```bash
# frontディレクトリに移動
cd front

# パッケージのインストール（IDE用）
npm install

# プロジェクトルートに戻る
cd ..
```

3. 環境変数ファイルの準備
```bash
cp .env.example .env
```

4. Dockerコンテナの起動
```bash
# イメージのビルド
docker compose build

# コンテナの起動
docker compose up -d
```

5. アプリケーションの確認
- ブラウザで http://localhost:5173 にアクセス

### 開発用コマンド

```bash
# コンテナのログを確認
docker compose logs -f frontend

# コンテナ内でコマンドを実行（例：パッケージのインストール）
docker compose exec frontend npm install [package-name]

# パッケージのインストール
docker compose exec frontend npm install [package-name]
cd front
npm install # ホストマシン上にも反映させるため（めんどくさいから対処法教えて）

# コンテナの停止
docker compose down

# コンテナの再起動
docker compose restart frontend
```

## 開発フロー

### ブランチ戦略

```
main
└── front/develop
    └── front/feature/***  # 作業ブランチ
    └── front/feature/***  # 作業ブランチ
```

### pullしたとき
1. 依存関係に変更がある場合
```bash
cd front
npm install
```
```bash
docker compose exec frontend npm install
```

### 新機能の開発手順

1. front/developブランチの最新情報を取得
```bash
git switch front/develop
git pull origin front/develop
```

2. 新しい機能ブランチを作成
```bash
git switch -c front/feature/[機能名] front/develop
```

3. 開発作業

4. 変更をコミット
```bash
git add .
git commit -m "feat: 機能の説明"
```

5. 変更をプッシュ
```bash
git push -u origin front/feature/[機能名]
```

6. プルリクエストの作成
- front/feature/[機能名] → front/develop 宛にプルリクエストを作成

### コミットメッセージの規約

プレフィックス:
- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメントのみの変更
- `style:` コードの意味に影響しない変更（空白、フォーマット等）
- `refactor:` バグ修正や機能追加を含まないコードの変更
- `test:` テスト関連の追加・修正
- `chore:` ビルドプロセスやツールの変更、ライブラリの更新等

例：
```bash
feat: ユーザー認証フォームの追加
fix: ログインボタンのスタイル修正
```

## プロジェクト構成

```
project-root/
├── docker/
│   └── front/
│       └── Dockerfile
├── front/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
├── .env.example
└── README.md
```

## その他

### トラブルシューティング

1. ブランチの確認
```bash
# 現在のブランチを確認
git branch

# リモートブランチも含めて確認
git branch -a
```

2. コンテナが起動しない場合
```bash
# ログを確認
docker compose logs front

# コンテナを再構築
docker compose down
docker compose build --no-cache
docker compose up -d
```

3. ホットリロードが効かない場合
```bash
# コンテナを再起動
docker compose restart front
```

### 注意事項