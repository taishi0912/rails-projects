/**
 * ProgressBar Component
 * 
 * 問題の進行状況を表示する複数のプログレスバー
 * 現在の問題のプログレスをアニメーション付きで表示
 */

import React from 'react';

interface ProgressBarProps {
  currentQuestion: number; // 現在の問題インデックス
  progress: number; // 現在の進捗（0-100）
  totalQuestions: number; // 総問題数
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, progress, totalQuestions }) => (
  <div className="absolute top-4 left-4 right-4 flex space-x-1">
    {/* 各問題に対応するプログレスバーを生成 */}
    {[...Array(totalQuestions)].map((_, index) => (
      <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
        {/* 現在の問題のみプログレスを表示 */}
        {index === currentQuestion && (
          <div className="h-full bg-white transition-all duration-300" style={{ width: `${progress}%` }} />
        )}
      </div>
    ))}
  </div>
);