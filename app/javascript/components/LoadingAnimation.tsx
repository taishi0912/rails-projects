/**
 * LoadingAnimation Component
 * 
 * DNAらせん構造をモチーフにした高度なローディングアニメーション
 * 数学的なアニメーションと視覚効果を組み合わせて、
 * 生物学的なプロセスを表現する没入型のローディング画面
 * 
 * 特徴:
 * - インタラクティブなDNAらせんの可視化
 * - 数学ベースのパーティクルアニメーション
 * - プログレッシブなローディング表示
 * - 量子効果を模したビジュアルエフェクト
 */
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

// コンポーネントのプロップス型定義
interface LoadingAnimationProps {
  onLoadingComplete: () => void; // ローディング完了時のコールバック
}

/**
 * メインのローディングアニメーションコンポーネント
 */
const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onLoadingComplete }) => {
  // 状態管理
  const [progress, setProgress] = useState(0); // ローディング進捗（0-100%）
  const [particleCount] = useState(20); // DNAを構成するパーティクル数

  /**
   * プログレス更新の副作用
   * 50ms間隔でプログレスを更新し、100%に達したら完了コールバックを実行
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // アニメーション完了後、少し遅延させてコールバックを実行
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // クリーンアップ関数でタイマーを解除
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="relative w-64 h-64">
        {/* DNAらせんアニメーション */}
        <div className="absolute inset-0">
          {[...Array(particleCount)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {/* 左側のDNA鎖 */}
              <div
                className="absolute w-3 h-3 rounded-full bg-blue-500 blur-sm"
                style={{
                  // 数学的な関数を使用して螺旋運動を生成
                  transform: `rotate(${(i * 360) / particleCount}deg) 
                             translateX(${40 + Math.sin(i / 3) * 10}px)
                             scale(${1 + Math.sin((progress + i * 10) / 20) / 2})`,
                  // プログレスに応じて透明度を変化
                  opacity: 0.5 + Math.sin((progress + i * 10) / 20) / 2,
                }}
              />
              {/* 右側のDNA鎖 */}
              <div
                className="absolute w-3 h-3 rounded-full bg-purple-500 blur-sm"
                style={{
                  // 左側と逆位相の螺旋運動
                  transform: `rotate(${(i * 360) / particleCount}deg) 
                             translateX(-${40 + Math.sin(i / 3) * 10}px)
                             scale(${1 + Math.cos((progress + i * 10) / 20) / 2})`,
                  opacity: 0.5 + Math.cos((progress + i * 10) / 20) / 2,
                }}
              />
              {/* 接続線 */}
              <div
                className="absolute h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                style={{
                  width: `${80 + Math.sin(i / 3) * 20}px`, // サイン波による動的な幅の変化
                  transform: `rotate(${(i * 360) / particleCount}deg)`,
                  opacity: 0.3,
                }}
              />
            </div>
          ))}
        </div>

        {/* 量子効果パーティクル */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              width: '4px',
              height: '4px',
              transform: `rotate(${(i * 30)}deg) translateY(-40px)`, // 360度を12分割して配置
            }}
          >
            <div
              className="w-full h-full bg-white rounded-full blur-sm"
              style={{
                animation: `quantumFloat ${2 + i * 0.1}s infinite ease-in-out`,
                animationDelay: `${i * 0.1}s`, // パーティクルごとに異なる開始時間
                opacity: Math.sin((progress + i * 30) / 50), // プログレスに応じた透明度変化
              }}
            />
          </div>
        ))}

        {/* 中央のコア */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white animate-spin" />
              </div>
            </div>
            {/* エネルギーリング */}
            <div className="absolute -inset-2">
              <div className="w-20 h-20 rounded-full border-2 border-purple-500/30 animate-ping" />
            </div>
          </div>
        </div>

        {/* プログレステキスト */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};