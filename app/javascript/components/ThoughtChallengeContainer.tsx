/**
 * ThoughtChallengeContainer
 * 
 * アプリケーションのメインコンテナコンポーネント
 * ローディング状態の管理とDNAらせん型のローディングアニメーションを実装
 * 
 * 特徴:
 * - インタラクティブなDNAらせんの可視化
 * - パーティクルベースのアニメーション
 * - プログレス表示機能
 * - スムーズなトランジション効果
 */
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ThoughtChallenge from './ThoughtChallenge';

// ローディングアニメーションのプロップス型定義
interface LoadingAnimationProps {
  onLoadingComplete: () => void; // ローディング完了時のコールバック
}

/**
 * DNAらせん型ローディングアニメーションコンポーネント
 * 生物学的なモチーフを用いた視覚的に魅力的なローディング表現
 */
const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onLoadingComplete }) => {
   // プログレス状態の管理（0-100%）
  const [progress, setProgress] = useState(0);

  /**
   * プログレス更新の副作用
   * 50ms間隔でプログレスを更新し、100%到達時にコールバックを実行
   */
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // ローディング完了時の遅延処理
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // クリーンアップ関数
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="relative w-64 h-64">
        {/* DNAらせんアニメーション */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {/* 左側のDNA鎖 */}
              <div
                className="absolute w-3 h-3 rounded-full bg-blue-500 blur-sm animate-dna-pulse"
                style={{
                  transform: `rotate(${(i * 360) / 20}deg) translateX(${40 + Math.sin(i / 3) * 10}px)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
              {/* 右側のDNA鎖 */}
              <div
                className="absolute w-3 h-3 rounded-full bg-purple-500 blur-sm animate-dna-pulse"
                style={{
                  transform: `rotate(${(i * 360) / 20}deg) translateX(-${40 + Math.sin(i / 3) * 10}px)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
              {/* 接続線 */}
              <div
                className="absolute h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                style={{
                  width: `${80 + Math.sin(i / 3) * 20}px`,
                  transform: `rotate(${(i * 360) / 20}deg)`,
                  opacity: 0.3,
                }}
              />
            </div>
          ))}
        </div>

        {/* 量子効果パーティクル */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${(i * 30)}deg)`,
              }}
            >
              <div
                className="w-2 h-2 bg-white rounded-full blur-sm animate-quantum-float"
                style={{
                  transform: 'translateY(-40px)',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            </div>
          ))}
        </div>

        {/* 中央のコア */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 animate-pulse-slow">
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white animate-spin-slow" />
              </div>
            </div>
            {/* エネルギーリング */}
            <div className="absolute -inset-2">
              <div className="w-20 h-20 rounded-full border-2 border-purple-500/30 animate-ping-slow" />
            </div>
          </div>
        </div>

        {/* プログレステキスト */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-gray-900/50 px-6 py-3 rounded-full flex flex-col items-center">
            <span className="text-2xl font-bold text-white">
              {progress}%
            </span>
            <span className="text-sm text-gray-300 mt-1">Loading...</span>
          </div>
        </div>
      </div>

      {/* アニメーション説明テキスト */}
      <div className="absolute bottom-8 text-center text-gray-400 text-sm">
        <p className="mb-2">思考力構造解析中...</p>
        <p>量子演算処理を実行しています</p>
      </div>
    </div>
  );
};

/**
 * メインコンテナコンポーネント
 * ローディング状態の管理とメインコンテンツの表示を制御
 */
export const ThoughtChallengeContainer: React.FC = () => {
  // ローディング状態の管理
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {isLoading ? (
        // ローディング中はDNAアニメーションを表示
        <LoadingAnimation onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        // ローディング完了後はメインコンテンツをフェードインで表示
        <div className="animate-fade-in">
          <ThoughtChallenge />
        </div>
      )}
    </div>
  );
};