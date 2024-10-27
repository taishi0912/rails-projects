/**
 * ProgressAnalysis Component
 * 
 * ユーザーの学習進捗を視覚的に表示するダッシュボード
 * 統計情報、グラフ、科目別進捗を包括的に表示
 */
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Target, Zap, Trophy } from 'lucide-react';

// 進捗データの型定義
interface ProgressStats {
  correctAnswers: number; // 正解数
  totalQuestions: number; // 総問題数
  streak: number; // 連続正解数
  level: number; // 現在のレベル
  subjects: { // 科目別の進捗
    [key: string]: {
      total: number; // 科目ごとの総問題数
      correct: number; // 科目ごとの正解数
    }
  };
  recentProgress: { // 最近の進捗データ
    date: string; // 日付
    correctRate: number; // 正答率
  }[];
}

/**
 * 進捗分析コンポーネント
 */
const ProgressAnalysis: React.FC<{ stats: ProgressStats }> = ({ stats }) => {
  return (
    <div className="bg-gray-900 text-white p-4">
      {/* 概要統計を4つのカードで表示 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* 正答率カード */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-400" />
            <span className="text-sm">正答率</span>
          </div>
          <div className="text-2xl font-bold">
            {Math.round((stats.correctAnswers / stats.totalQuestions) * 100)}%
          </div>
        </div>
        
        {/* 連続正解カード */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-orange-400" />
            <span className="text-sm">連続正解</span>
          </div>
          <div className="text-2xl font-bold">{stats.streak}</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-sm">レベル</span>
          </div>
          <div className="text-2xl font-bold">{stats.level}</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-sm">総回答数</span>
          </div>
          <div className="text-2xl font-bold">{stats.totalQuestions}</div>
        </div>
      </div>

      {/* 進捗グラフ: 時系列での正答率の推移 */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">学習の進捗</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.recentProgress}>
              {/* グラフの設定 */}
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="correctRate" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 科目別進捗: プログレスバーで表示 */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-4">科目別の進捗</h3>
        <div className="space-y-4">
          {Object.entries(stats.subjects).map(([subject, data]) => (
            <div key={subject}>
              {/* 科目名と達成率 */}
              <div className="flex justify-between mb-1">
                <span className="text-sm">{subject}</span>
                <span className="text-sm">
                  {Math.round((data.correct / data.total) * 100)}%
                </span>
              </div>
              {/* プログレスバー */}
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ 
                    width: `${(data.correct / data.total) * 100}%` 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};