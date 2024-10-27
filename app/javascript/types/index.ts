export interface Question {
    id: number;
    title: string;
    description: string;
    hint: string;
    likes: number;
    comments: number;
    videoUrl?: string; // オプショナルとして追加
  }
  
  // QuestionViewPropsの型定義を追加
  export interface QuestionViewProps {
    question: Question;
    currentQuestion: number;
    isPlaying: boolean;
    onPlayToggle: () => void;
    onAnswer?: (answer: string) => void; // オプショナルに
  }
  
  // データ型のサンプル
  export const SAMPLE_QUESTIONS: Question[] = [
    {
      id: 1,
      title: "次に起こることを予測しよう！",
      description: "このボールはどちらに転がるでしょう？",
      hint: "物理の法則を思い出してみましょう",
      likes: 1234,
      comments: 89,
      videoUrl: "/videos/question1.mp4"
    },
    {
      id: 2,
      title: "原理を説明してみよう！",
      description: "なぜこの現象が起きたのでしょう？",
      hint: "日常生活での似た経験を思い出してみて",
      likes: 892,
      comments: 67,
      videoUrl: "/videos/question2.mp4"
    }
  ];