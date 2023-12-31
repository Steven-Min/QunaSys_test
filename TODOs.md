# 開発環境の用意
- リポジトリのクローン
- パッケージのインストール
  - `npm install`
  - `node_modules`を`.gitignore`に入れる
- `ESLINT`の準備
  - `npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`
  - `.eslintrc.js`または`.eslintrc.json`という名前の`ESLint`設定ファイルをプロジェクトのルートに作成
  - そして、`package.json`の`scripts`セクションに`ESLint`のスクリプトを追加
  - 以下のコマンドを実行すると、プロジェクト内のすべての`JavaScript`と`TypeScript`ファイルが`ESLint`によってチェックされます。
    - `npm run lint`
- `Prettier`の準備
  - `npm install --save-dev prettier`
  - `Prettier`の設定ファイル`.prettierrc`をプロジェクトのルートに作成
  - `package.json`の`scripts`セクションに`Prettier`のスクリプトを追加
  - 以下のコマンドを実行すると、プロジェクト内のすべてのサポートされるファイルが`Prettier`によってフォーマットされる
    - npm run format
- `ユニットテスト`の準備
  - ユニットテストを導入するために、`Jest`と`React Testing Library`が広く使用されます
  - `npm install --save-dev jest @types/jest @testing-library/react @testing-library/jest-dom ts-jest`
  - `Jest`の設定ファイルである`jest.config.js`をプロジェクトのルートに作成します
  - テストスクリプトを簡単に実行できるように、`package.json`の`scripts`セクションに以下のようなスクリプトを追加
    - "test": "jest"
  - テストを作成し、以下のコマンドを実行すると、`Jest`がプロジェクト内のすべてのテストを実行します
    - `npm run test`

# コードをリファクタリングするために（済み＋開発次第）
- ユニットテストの実装: 済み
- 使用していないコードの削除：開発次第
- コードの整形: 済み
- 命名の見直し：開発次第
- コードの複製の削除：開発次第
- コードの分割：開発次第
- パフォーマンスの改善：開発次第

# 課題TODOS
## 1. 任意の軸で比較できる機能を追加する
- [x] 選択可能な軸データを定義する
  - [x] `calories`, `protein`, `fat`, `sodium`, `fiber`, `carbo`, `sugars`, `potass`, `vitamins`, `shelf`, `weight`, `cups`, `rating`というデータをユーザーが選択できるように、これらを選択用のリストとして定義します。
- [x] UIに選択ボックスを追加する：x軸とy軸それぞれに対して、選択ボックスを追加します。これらの選択ボックスは上記で定義した軸データリストを元に選択肢を生成します。
- [x] 選択ボックスの状態管理を実装する：`React`の`state`や、より複雑な状態管理が必要な場合は`Redux`等を使用して、選択ボックスの現在の選択値を管理します。
- [x] 選択ボックスの値に応じてグラフを更新する：選択ボックスの値が変わったときにグラフが再描画されるように、適切なイベントハンドラを設定します。選択ボックスの値に応じて`cereals`データから適切な値を取り出し、それを`config`オブジェクトの`data`プロパティとして設定します。
- [x] 軸ラベルを動的に更新する：選択ボックスの値が変わったときに、グラフのx軸とy軸のラベルが適切に更新されるようにします。これには`config`オブジェクトの`scales.x.title.text`と`scales.y.title.text`を動的に設定します。
- [x] 手動テストを行う：実際にブラウザで新しい機能を使ってみて、想定通りに動作するかを確認します。

## 2. 表示するデータを絞り込む機能を追加する
- [x] mfrとtypeを選択するための2つのセレクトボックスを作成します
  - これはselectedXPropertyとselectedYPropertyのセレクトボックスと同じReactコンポーネントで、それぞれ異なるstate変数（例えばselectedMfrとselectedType）にバインドします。
  - セレクトボックスのオプションは、提供されたシリアルデータから一意に抽出する。すべての可能なmfrとtypeの値を取得するためにデータを走査します
- [x] 選択されたmfrとtypeに基づいて表示するデータを絞り込むフィルタリングロジックを作成します
  - これは、選択されたmfrとtypeが一致するデータだけを返すような関数になります。この関数は、グラフに表示するデータを決定する前に、props.cerealsに適用されます
- [x] グラフを再描画するために、選択されたmfrとtypeが変更されたときにフィルタリングロジックを実行します
  - useEffectフック内でグラフデータをセットアップするロジックを更新します。具体的には、props.cerealsをfilteredCerealsに置き換えます。これにより、選択されたmfrとtypeに基づいてデータが絞り込まれます
  - グラフが選択されたmfrとtypeの変更に応答するように、useEffectフックの依存配列にselectedMfrとselectedTypeを追加します

