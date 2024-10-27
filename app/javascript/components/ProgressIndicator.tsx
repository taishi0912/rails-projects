/**
 * ProgressIndicator Component
 * 
 * 問題の進捗状況と連続正解数を表示
 */

import React from 'react';

interface Props {
  currentQuestion: number; // 現在の問題番号
  totalQuestions: number; // 総問題数
  streak: number; // 連続正解数
}

const ProgressIndicator: React.FC<Props> = ({ 
  currentQuestion, 
  totalQuestions,
  streak 
}) => {
  // 全体の進捗率を計算
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="absolute top-4 left-4 right-4 z-10">
      {/* 進捗情報とストリーク表示 */}
      <div className="flex justify-between items-center text-white mb-2">
        <span className="text-sm">
          問題 {currentQuestion}/{totalQuestions}
        </span>
        {/* ストリークが0より大きい場合のみ表示 */}
        {streak > 0 && (
          <span className="flex items-center gap-1 bg-orange-500 px-2 py-1 rounded-full text-sm">
            🔥 {streak}
          </span>
        )}
      </div>
      {/* プログレスバー */}
      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;