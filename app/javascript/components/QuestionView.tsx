/**
 * QuestionView Component
 * 
 * 問題表示の中核となるコンポーネント
 * 動画再生、ヒント表示、スワイプナビゲーションを統合
 */

import React, { useState } from 'react';
import { Play, Pause, Lightbulb } from 'lucide-react';
import { Question } from './types';

// コンポーネントのプロップス型定義
interface Props {
  question: Question; // 問題データ
  onSwipe: (direction: 'up' | 'down') => void; // スワイプハンドラ
  showHint: boolean; // ヒント表示状態
  onHintToggle: () => void; // ヒント表示切り替えハンドラ
}

const QuestionView: React.FC<Props> = ({ 
  question, 
  onSwipe, 
  showHint, 
  onHintToggle 
}) => {
  // 状態管理
  const [isPlaying, setIsPlaying] = useState(false); // 動画再生状態
  const [startY, setStartY] = useState(0); // スワイプ開始位置

  /**
   * スワイプ開始時のハンドラ
   * タッチ開始位置を記録
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  /**
   * スワイプ終了時のハンドラ
   * スワイプ距離に応じて方向を判定
   */
  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = startY - e.changedTouches[0].clientY;
    // スワイプ距離が閾値を超えた場合にイベントを発火
    if (Math.abs(deltaY) > 50) {
      onSwipe(deltaY > 0 ? 'up' : 'down');
    }
  };

  return (
    <div
      className="relative h-full w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 問題の動画表示 */}
      <video
        src={question.videoUrl}
        className="h-full w-full object-cover"
        playsInline
        loop
        muted
        autoPlay={isPlaying}
      />

      {/* オーバーレイと再生コントロール */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {isPlaying ? (
            <Pause className="w-16 h-16 text-white/80" />
          ) : (
            <Play className="w-16 h-16 text-white/80" />
          )}
        </button>
      </div>

      {/* 問題文とヒント表示 */}
      <div className="absolute bottom-20 w-full p-6 space-y-4">
        <h2 className="text-2xl font-bold text-white">{question.question}</h2>
        {/* ヒントトグルボタン */}
        <button
          onClick={onHintToggle}
          className="flex items-center space-x-2 text-white/80"
        >
          <Lightbulb className="w-5 h-5" />
          <span>ヒントを表示</span>
        </button>
        {showHint && (
          <div className="p-4 bg-white/10 rounded-lg text-white/90">
            {question.hint}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionView;
