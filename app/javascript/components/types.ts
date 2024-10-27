/**
 * アプリケーション全体で使用される型定義
 */

/**
 * Question Interface
 * 問題データの構造を定義
 */

export interface Question {
  id: number; // 問題の一意識別子
  videoUrl: string; // 問題の動画URL
  question: string; // 問題文
  hint: string; // ヒントテキスト
  correctAnswerPattern: string[]; // 正解とみなすキーワードパターン
  explanation: string; // 解説文
  type: 'physics' | 'chemistry' | 'biology' | 'math'; // 問題の科目
  difficulty: 1 | 2 | 3; // 難易度（1: 易しい、2: 普通、3: 難しい）
  answers: Answer[]; // この問題への回答リスト
}

/**
 * Answer Interface
 * ユーザーの回答データの構造を定義
 */
export interface Answer {
  id: number; // 回答の一意識別子
  text: string; // 回答テキスト
  userName: string; // 回答者名
  likes: number;// いいね数
  timestamp: string;// 回答日時
}

/**
 * DetailedStats Interface
 * 学習進捗の詳細統計データの構造を定義
 */
export interface DetailedStats {
  correctAnswers: number; // 正解数
  totalAnswered: number;// 総回答数
  streak: number;// 連続正解数
  level: number;// 現在のレベル
  subjectProgress: { // 科目別の進捗
    subject: string; // 科目名
    total: number; // 科目の総問題数
    correct: number; // 科目の正解数
  }[];
  dailyProgress: { // 日別の進捗
    date: string; // 日付
    correctRate: number; // その日の正答率
  }[];
}