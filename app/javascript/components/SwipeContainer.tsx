/**
 * SwipeContainer Component
 * 
 * タッチスワイプジェスチャーを処理するコンテナコンポーネント
 * 垂直方向のスワイプを検出し、上下のスワイプイベントを発火
 */
import React from 'react';
import { useState, useEffect, TouchEvent, ReactNode } from 'react';

// コンポーネントのプロップス型定義
interface SwipeContainerProps {
  children: ReactNode; // 子要素
  onSwipeUp?: () => void; // 上スワイプ時のコールバック
  onSwipeDown?: () => void; // 下スワイプ時のコールバック
}

export const SwipeContainer = ({ children, onSwipeUp, onSwipeDown }: SwipeContainerProps) => {
  // スワイプの開始位置と終了位置を管理
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // スワイプと判定する最小距離（ピクセル）
  const minSwipeDistance = 50;

  /**
   * タッチ開始時のハンドラ
   * 開始位置を記録し、終了位置をリセット
   */
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  /**
   * タッチ移動時のハンドラ
   * 現在位置を終了位置として記録
   */
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  /**
   * タッチ終了時のハンドラ
   * スワイプ距離を計算し、方向に応じたイベントを発火
   */
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    // スワイプ距離の計算
    const distance = touchStart - touchEnd;
    // 方向の判定
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    // 対応するコールバックを実行
    if (isUpSwipe && onSwipeUp) {
      onSwipeUp();
    }
    if (isDownSwipe && onSwipeDown) {
      onSwipeDown();
    }
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="h-full w-full"
    >
      {children}
    </div>
  );
};