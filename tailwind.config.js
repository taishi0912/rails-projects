/**
 * Tailwind CSS Configuration
 * 
 * カスタムアニメーション、スタイル、レスポンシブデザインの設定を定義
 * DNAらせんとクォンタムエフェクトのアニメーションに特化した拡張設定
 */
module.exports = {
  // コンパイル対象のファイルパスを設定
  content: [
    './app/views/**/*.erb', // Railsのビューテンプレート
    './app/helpers/**/*.rb', // Railsのヘルパーファイル
    './app/javascript/**/*.{js,jsx,ts,tsx}' // JavaScriptとReactコンポーネント
  ],
  theme: {
    extend: {
      // カスタムアニメーションの定義
      animation: {
        // カスタムアニメーションの定義
        'fade-in': 'fadeIn 0.5s ease-in-out', // フェードイン効果
        'spin-slow': 'spin 3s linear infinite', // ゆっくりした回転
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite', // ゆっくりした脈動
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', // ゆっくりした波及効果
        
        // DNAアニメーション
        'dna-spin': 'dna-spin 3s linear infinite', // DNAらせんの回転
        'dna-pulse': 'dna-pulse 2s ease-in-out infinite', // DNAパーティクルの脈動
        // 量子効果アニメーション
        'quantum-float': 'quantum-float 2s infinite ease-in-out', // 量子的な浮遊効果
      },
      // キーフレームアニメーションの定義
      keyframes: {
        // フェードインアニメーション
        fadeIn: {
          '0%': { opacity: '0' }, // 開始状態：完全に透明
          '100%': { opacity: '1' }, // 終了状態：完全に不透明
        },

        // DNAらせん回転アニメーション
        'dna-spin': {
          '0%': { transform: 'rotate(0deg)' }, // 開始位置
          '100%': { transform: 'rotate(360deg)' } // 360度回転
        },

        // DNAパーティクル脈動アニメーション
        'dna-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' }, // 通常状態の透明度,通常サイズ
          '50%': { opacity: '1', transform: 'scale(1.05)' } // 最大時の透明度,やや拡大
        },

        // 量子浮遊効果アニメーション
        'quantum-float': {
          '0%, 100%': {
            transform: 'scale(1) translate(0, 0)', // 初期位置,初期透明度
            opacity: '0.3',
          },
          '50%': {
            transform: 'scale(2) translate(10px, -10px)', // 浮遊時の位置と拡大,浮遊時の透明度
            opacity: '0.7',
          },
        },
      },
    },
  },

  // 追加のプラグイン設定（現在は未使用）
  plugins: [],
};