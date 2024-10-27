/**
 * HintSystem Component
 * 
 * ユーザーが問題を解く際のヒントシステムを提供するコンポーネント
 * ポイントを消費してヒントを表示する機能を実装
 */
import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

// ヒントの型定義
interface Hint {
  id: number; // ヒントの一意識別子
  text: string; // ヒントのテキスト内容
  points: number; // ヒントを見るのに必要なポイント
}

// コンポーネントのプロップス型定義
interface Props {
  hints: Hint[]; // 利用可能なヒントの配列
  onUseHint: (hintId: number) => void; // ヒント使用時のコールバック
}

/**
 * ヒントシステムコンポーネント
 * 展開可能なパネル形式でヒントを表示
 */
const HintSystem: React.FC<Props> = ({ hints, onUseHint }) => {
  // パネルの展開状態を管理
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="absolute right-4 top-20 bg-gray-800/80 backdrop-blur rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 p-3 w-full text-white"
      >
        <Lightbulb className="w-5 h-5" />
        <span>ヒント</span>
        {isExpanded ? 
          <ChevronUp className="w-4 h-4 ml-auto" /> : 
          <ChevronDown className="w-4 h-4 ml-auto" />
        }
      </button>
      {isExpanded && (
        <div className="p-3 border-t border-gray-700">
          {hints.map((hint) => (
            <button
              key={hint.id}
              onClick={() => onUseHint(hint.id)}
              className="flex items-center justify-between w-full p-2 text-sm text-white/80 hover:bg-gray-700/50 rounded"
            >
              <span>ヒントを見る</span>
              <span className="text-yellow-400">-{hint.points}pt</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HintSystem;
