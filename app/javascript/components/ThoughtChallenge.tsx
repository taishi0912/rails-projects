/**
 * ThoughtChallenge - 思考力育成のための学習アプリケーション
 * 
 * 主な機能:
 * - 動画ベースの問題提示
 * - スワイプナビゲーション
 * - リアルタイムの回答評価
 * - 進捗分析
 * - アダプティブヒントシステム
 */
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronUp, Send, Heart, Lightbulb, Brain, Target, Zap, Trophy, X, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Question, Answer, DetailedStats } from './types';

/**
 * サンプル問題データ
 * 各問題には以下の要素が含まれます：
 * - ビデオURL
 * - 問題文
 * - ヒントテキスト
 * - 正解キーワードパターン
 * - 詳細な解説
 * - 科目タイプ
 * - 難易度
 */
const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    videoUrl: "/videos/pendulum.mp4",
    question: "この振り子の運動で、振幅が徐々に小さくなる理由を説明してください",
    hint: "エネルギーの変換と損失について考えてみましょう",
    correctAnswerPattern: ["空気抵抗", "摩擦", "エネルギー", "減衰", "運動エネルギー"],
    explanation: "振り子の運動では、空気抵抗と支点での摩擦により運動エネルギーが熱エネルギーに変換され、失われていきます。そのため、振幅が徐々に小さくなっていきます。",
    type: "physics",
    difficulty: 1,
    answers: [
      {
        id: 1,
        text: "空気抵抗と摩擦によってエネルギーが熱に変換されるためです",
        userName: "物理好き",
        likes: 24,
        timestamp: "5分前"
      },
      {
        id: 2,
        text: "振り子が空気を切る時の抵抗と、支点での摩擦で運動エネルギーが減っていくからだと思います",
        userName: "理科実験大好き",
        likes: 18,
        timestamp: "12分前"
      }
    ]
  },
  {
    id: 2,
    videoUrl: "/videos/chemical_reaction.mp4",
    question: "この化学反応で色が変化する理由を説明してください",
    hint: "電子の状態変化と光の吸収について考えてみましょう",
    correctAnswerPattern: ["電子", "遷移", "軌道", "エネルギー準位", "吸収"],
    explanation: "金属イオンの電子配置が変化することで、吸収する光の波長が変わります。これにより、溶液の色が変化して見えます。",
    type: "chemistry",
    difficulty: 2,
    answers: [
      {
        id: 3,
        text: "電子が別の軌道に移動して、吸収する光の波長が変わったからです",
        userName: "化学チャレンジャー",
        likes: 31,
        timestamp: "15分前"
      },
      {
        id: 4,
        text: "遷移金属イオンの電子配置が変化して、違う色の光を吸収するようになったと考えられます",
        userName: "実験レポート係",
        likes: 27,
        timestamp: "23分前"
      }
    ]
  },
  {
    id: 3,
    videoUrl: "/videos/cell_division.mp4",
    question: "この細胞分裂の過程で、染色体が移動するメカニズムを説明してください",
    hint: "紡錘体の役割に注目してみましょう",
    correctAnswerPattern: ["紡錘体", "微小管", "キネトコア", "染色体", "分裂"],
    explanation: "染色体は紡錘体微小管によって引っ張られ、キネトコアを介して細胞の両極に移動します。この過程は細胞分裂に不可欠です。",
    type: "biology",
    difficulty: 3,
    answers: [
      {
        id: 5,
        text: "紡錘体微小管がキネトコアに結合して、染色体を両極へ引っ張っていると思います",
        userName: "生物マスター",
        likes: 42,
        timestamp: "8分前"
      },
      {
        id: 6,
        text: "染色体のキネトコア部分に微小管が付着して、それを介して移動するんですよね",
        userName: "顕微鏡観察好き",
        likes: 35,
        timestamp: "17分前"
      }
    ]
  },
  {
    id: 4,
    videoUrl: "/videos/projectile.mp4",
    question: "このボールの放物運動で、最高点に達する時の速度の向きを予測してください",
    hint: "速度の水平成分と垂直成分を分けて考えてみましょう",
    correctAnswerPattern: ["水平", "垂直成分", "重力", "放物線", "最高点"],
    explanation: "最高点では、速度の垂直成分がゼロになりますが、水平成分は一定のまま保たれます。そのため、速度は水平方向のみとなります。",
    type: "physics",
    difficulty: 2,
    answers: [
      {
        id: 7,
        text: "最高点では上向きの速度成分がゼロになり、水平方向の速度だけが残ります",
        userName: "物理数学好き",
        likes: 29,
        timestamp: "20分前"
      },
      {
        id: 8,
        text: "垂直成分と水平成分に分解すると、最高点では垂直成分が0で水平のみです",
        userName: "力学研究者",
        likes: 25,
        timestamp: "31分前"
      }
    ]
  },
  {
    id: 5,
    videoUrl: "/videos/enzyme.mp4",
    question: "この酵素反応で、基質が分解される速度が途中で遅くなる理由を説明してください",
    hint: "酵素と基質の濃度変化に注目してみましょう",
    correctAnswerPattern: ["基質濃度", "酵素", "飽和", "反応速度", "複合体"],
    explanation: "反応の進行に伴い基質濃度が低下し、酵素と基質の出会う確率が減少します。また、生成物の蓄積により逆反応も起こりやすくなります。",
    type: "chemistry",
    difficulty: 3,
    answers: [
      {
        id: 9,
        text: "基質の濃度が下がって酵素と出会いにくくなるのと、生成物が増えて逆反応が起きやすくなるからです",
        userName: "生化学研究会",
        likes: 38,
        timestamp: "11分前"
      },
      {
        id: 10,
        text: "酵素-基質複合体の形成確率が下がって、反応速度が遅くなります",
        userName: "実験データ係",
        likes: 33,
        timestamp: "25分前"
      }
    ]
  },
  {
    id: 6,
    videoUrl: "/videos/plant_growth.mp4",
    question: "この植物の茎が光の方向に曲がっていく現象のメカニズムを説明してください",
    hint: "植物ホルモンの分布の変化について考えてみましょう",
    correctAnswerPattern: ["光屈性", "オーキシン", "ホルモン", "細胞伸長", "光"],
    explanation: "光を感知した茎では、オーキシンが日陰側に偏って分布します。これにより日陰側の細胞がより伸長し、茎が光の方向に曲がります。",
    type: "biology",
    difficulty: 2,
    answers: [
      {
        id: 11,
        text: "オーキシンが日陰側に多く分布して、その側の細胞が良く伸びるからです",
        userName: "植物観察係",
        likes: 28,
        timestamp: "16分前"
      },
      {
        id: 12,
        text: "光側と影側でオーキシンの濃度差ができて、影側の細胞が伸長するんですよね",
        userName: "理科部部長",
        likes: 22,
        timestamp: "28分前"
      }
    ]
  },
  {
    id: 7,
    videoUrl: "/videos/wave_interference.mp4",
    question: "この波の干渉パターンが形成される理由を説明してください",
    hint: "波の山と谷の重ね合わせについて考えてみましょう",
    correctAnswerPattern: ["位相", "重ね合わせ", "干渉", "波長", "振幅"],
    explanation: "2つの波が重なるとき、位相が一致する点では振幅が大きくなり（強め合い）、逆位相の点では打ち消し合います。これにより干渉パターンが形成されます。",
    type: "physics",
    difficulty: 3,
    answers: [
      {
        id: 13,
        text: "波の山と山、谷と谷が重なると強め合い、山と谷が重なると打ち消し合うためです",
        userName: "波動実験好き",
        likes: 45,
        timestamp: "7分前"
      },
      {
        id: 14,
        text: "2つの波の位相関係によって強め合いと弱め合いが起きて、このようなパターンになります",
        userName: "物理オリンピック",
        likes: 41,
        timestamp: "19分前"
      }
    ]
  },
  {
    id: 8,
    videoUrl: "/videos/ecosystem.mp4",
    question: "この生態系で、捕食者を減らすと草食動物が増えない理由を説明してください",
    hint: "生態系の相互作用と資源の限界について考えてみましょう",
    correctAnswerPattern: ["個体数", "環境収容力", "競争", "資源", "バランス"],
    explanation: "草食動物の個体数は、捕食圧だけでなく、利用可能な植物資源の量（環境収容力）によっても制限されています。また、個体間競争も重要な制限要因となります。",
    type: "biology",
    difficulty: 2,
    answers: [
      {
        id: 15,
        text: "餌となる植物の量に限りがあるので、それ以上は増えられないんです",
        userName: "生態調査班",
        likes: 36,
        timestamp: "13分前"
      },
      {
        id: 16,
        text: "環境が養える個体数には限界があり、餌の奪い合いも激しくなるからだと思います",
        userName: "フィールドワーカー",
        likes: 32,
        timestamp: "22分前"
      }
    ]
  },
  {
    id: 9,
    videoUrl: "/videos/redox.mp4",
    question: "この酸化還元反応で、金属表面に析出物が形成される過程を説明してください",
    hint: "電子の移動と金属イオンの変化について考えてみましょう",
    correctAnswerPattern: ["電子", "還元", "析出", "金属イオン", "酸化"],
    explanation: "溶液中の金属イオンが電子を受け取って還元され、中性の金属原子となって表面に析出します。同時に、別の物質が電子を失って酸化されます。",
    type: "chemistry",
    difficulty: 2,
    answers: [
      {
        id: 17,
        text: "金属イオンが電子をもらって還元され、中性の金属として析出します",
        userName: "化学実験係",
        likes: 39,
        timestamp: "10分前"
      },
      {
        id: 18,
        text: "溶液中のイオンが還元されて金属になり、表面に付着していくんですよね",
        userName: "元素マスター",
        likes: 34,
        timestamp: "21分前"
      }
    ]
  },
  {
    id: 10,
    videoUrl: "/videos/magnetic_field.mp4",
    question: "この磁場中の荷電粒子が円運動する理由を説明してください",
    hint: "ローレンツ力の向きと大きさについて考えてみましょう",
    correctAnswerPattern: ["ローレンツ力", "磁場", "垂直", "円運動", "荷電粒子"],
    explanation: "磁場中を運動する荷電粒子には、運動方向に垂直なローレンツ力が働きます。この力が求心力となり、粒子は円運動を行います。力の大きさは速度と磁場の強さに比例します。",
    type: "physics",
    difficulty: 3,
    answers: [
      {
        id: 19,
        text: "磁場からローレンツ力を受けて、それが求心力として働くからです",
        userName: "電磁気学fan",
        likes: 43,
        timestamp: "9分前"
      },
      {
        id: 20,
        text: "運動方向に垂直な力（ローレンツ力）が常に働き続けるため、円運動になります",
        userName: "物理数学G",
        likes: 37,
        timestamp: "18分前"
      }
    ]
  }
];

/**
 * ローディングアニメーションコンポーネント
 * DNAらせん構造をモチーフにしたアニメーションを表示します
 */
const LoadingAnimation: React.FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [animate, setAnimate] = useState(true);

  // プログレス更新のエフェクト
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  // レンダリング
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="relative w-64 h-64">
        {/* DNA螺旋アニメーション */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {/* 左側のDNA鎖 */}
              <div
                className={`absolute w-3 h-3 rounded-full bg-blue-500 blur-sm transition-all duration-500`}
                style={{
                  transform: `
                    rotate(${(i * 360) / 20}deg) 
                    translateX(${40 + Math.sin(i / 3) * 10}px)
                  `,
                  animation: `spin ${3 + i * 0.1}s linear infinite`,
                  opacity: 0.5 + Math.sin(progress / 100) * 0.5,
                }}
              />
              {/* 右側のDNA鎖 */}
              <div
                className={`absolute w-3 h-3 rounded-full bg-purple-500 blur-sm transition-all duration-500`}
                style={{
                  transform: `
                    rotate(${(i * 360) / 20}deg) 
                    translateX(-${40 + Math.sin(i / 3) * 10}px)
                  `,
                  animation: `spin ${3 + i * 0.1}s linear infinite reverse`,
                  opacity: 0.5 + Math.cos(progress / 100) * 0.5,
                }}
              />
              {/* 接続線 */}
              <div
                className="absolute h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                style={{
                  width: `${80 + Math.sin(i / 3) * 20}px`,
                  transform: `rotate(${(i * 360) / 20}deg)`,
                  opacity: 0.3,
                  animation: `pulse ${2 + i * 0.1}s ease-in-out infinite`,
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
                className="w-2 h-2 bg-white rounded-full blur-sm"
                style={{
                  transform: 'translateY(-40px)',
                  animation: `ping ${1.5 + i * 0.1}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            </div>
          ))}
        </div>

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
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="text-2xl font-bold text-white bg-gray-900/50 px-4 py-2 rounded-full">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * メインの思考力チャレンジコンポーネント
 * 問題の表示、回答の評価、進捗管理を行います
 */
const ThoughtChallenge: React.FC = () => {
   // 状態管理
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');
  const [progress, setProgress] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState<{[key: number]: boolean}>({});
  const [userAnswers, setUserAnswers] = useState<{[key: number]: string}>({});
  const [showNavigation, setShowNavigation] = useState(true);

  // 詳細な統計情報の状態
  const [detailedStats, setDetailedStats] = useState<DetailedStats>({
    correctAnswers: 42,
    totalAnswered: 58,
    streak: 3,
    level: 4,
    subjectProgress: [
      { subject: "物理", total: 25, correct: 18 },
      { subject: "化学", total: 15, correct: 12 },
      { subject: "生物", total: 12, correct: 8 },
      { subject: "数学", total: 6, correct: 4 }
    ],
    dailyProgress: [
      { date: '10/13', correctRate: 65 },
      { date: '10/14', correctRate: 68 },
      { date: '10/15', correctRate: 72 },
      { date: '10/16', correctRate: 70 },
      { date: '10/17', correctRate: 75 },
      { date: '10/18', correctRate: 73 },
      { date: '10/19', correctRate: 78 },
      { date: '10/20', correctRate: 76 },
      { date: '10/21', correctRate: 80 },
      { date: '10/22', correctRate: 82 },
      { date: '10/23', correctRate: 79 },
      { date: '10/24', correctRate: 85 },
      { date: '10/25', correctRate: 83 },
      { date: '10/26', correctRate: 88 }
    ]
  });

   // refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const startTouchY = useRef<number>(0);

  // 現在の問題を取得
  const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex];

    /**
   * 次の問題に移動する
   * 状態をリセットし、ビデオを初期化します
   */
  const goToNextQuestion = () => {
    if (currentQuestionIndex < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowHint(false);
      setShowExplanation(false);
      setFeedbackMessage('');
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

    /**
   * 前の問題に移動する
   * 状態をリセットし、ビデオを初期化します
   */
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowHint(false);
      setShowExplanation(false);
      setFeedbackMessage('');
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

    /**
   * キーボードナビゲーションのエフェクト
   * 上下矢印キーで問題を切り替えます
   */
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        goToPreviousQuestion();
      } else if (e.key === 'ArrowDown') {
        goToNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestionIndex]);

    /**
   * ビデオの再生/一時停止を切り替える
   */
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startTouchY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = startTouchY.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) {
        goToNextQuestion();
      } else {
        goToPreviousQuestion();
      }
    }
  };

   /**
   * 回答をチェックし、フィードバックを提供する
   * キーワードベースのパターンマッチングを使用
   */
  const checkAnswer = (answer: string) => {
    if (!answer.trim()) return;

    // キーワードマッチング
    const currentQ = SAMPLE_QUESTIONS[currentQuestionIndex];
    const keywords = currentQ.correctAnswerPattern;
    const matchedKeywords = keywords.filter(keyword => 
      answer.toLowerCase().includes(keyword.toLowerCase())
    );

    const isCorrect = matchedKeywords.length >= 2;
    
    setDetailedStats(prev => {
      const newStats = {
        ...prev,
        totalAnswered: prev.totalAnswered + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        streak: isCorrect ? prev.streak + 1 : 0,
        subjectProgress: prev.subjectProgress.map(subj => 
          subj.subject.toLowerCase() === currentQ.type ? {
            ...subj,
            total: subj.total + 1,
            correct: isCorrect ? subj.correct + 1 : subj.correct
          } : subj
        ),
        level: Math.floor((prev.correctAnswers + (isCorrect ? 1 : 0)) / 5) + 1,
        dailyProgress: [
          ...prev.dailyProgress.slice(0, -1),
          {
            date: new Date().toLocaleDateString(),
            correctRate: Math.round(((prev.correctAnswers + (isCorrect ? 1 : 0)) / (prev.totalAnswered + 1)) * 100)
          }
        ]
      };
      return newStats;
    });

    // フィードバック表示
    setFeedbackMessage(isCorrect ? '素晴らしい解答です！' : 'もう少し考えてみましょう');
    if (isCorrect) {
      setShowExplanation(true);
    }

    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: answer
    }));
    setAnswered(prev => ({
      ...prev,
      [currentQ.id]: true
    }));

    setNewAnswer('');
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  /**
   * レンダリング
   */
  return (
    <div 
      className="h-screen bg-gray-900 text-white relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* フィードバックメッセージ */}
      {feedbackMessage && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full ${
          feedbackMessage.includes('素晴らしい') ? 'bg-green-500' : 'bg-orange-500'
        } text-white text-sm z-30 transition-all duration-300`}>
          {feedbackMessage}
        </div>
      )}

      {/* 上部のステータス表示 */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-4">
            <span className="text-sm">
              問題 {currentQuestionIndex + 1}/{SAMPLE_QUESTIONS.length}
            </span>
            {detailedStats.streak > 0 && (
              <span className="flex items-center gap-1 bg-orange-500 px-2 py-1 rounded-full text-sm">
                🔥 {detailedStats.streak}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              正解率: {Math.round((detailedStats.correctAnswers / (detailedStats.totalAnswered || 1)) * 100)}%
            </span>
          </div>
        </div>
        <div className="h-1 bg-gray-700 rounded-full">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / SAMPLE_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* ビデオプレイヤー */}
      <div className="relative w-full h-2/3">
        <div 
          className="w-full h-full bg-gray-800 flex items-center justify-center"
          style={{ aspectRatio: '16/9' }}
        >
          <span className="text-gray-500">動画プレースホルダー</span>
        </div>
        
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-16 h-16 text-white/80" />
          ) : (
            <Play className="w-16 h-16 text-white/80" />
          )}
        </button>

        {/* 問題文とヒントボタン */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black">
          <h2 className="text-xl font-bold mb-4">
            {currentQuestion.question}
          </h2>
          <button
            onClick={toggleHint}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <Lightbulb className="w-5 h-5" />
            <span>{showHint ? 'ヒントを隠す' : 'ヒントを表示'}</span>
          </button>
          {showHint && (
            <div className="mt-2 p-3 bg-white/10 rounded-lg text-white/90 text-sm">
              {currentQuestion.hint}
            </div>
          )}
        </div>
      </div>

      {/* 解説 */}
      {showExplanation && (
        <div className="fixed bottom-32 left-4 right-4 bg-gray-800/90 p-4 rounded-lg z-30">
          <h3 className="text-lg font-bold mb-2">解説</h3>
          <p className="text-sm">{currentQuestion.explanation}</p>
          <button
            onClick={() => setShowExplanation(false)}
            className="mt-2 text-sm text-blue-400 hover:text-blue-300"
          >
            閉じる
          </button>
        </div>
      )}

      {/* ナビゲーションコントロール */}
      <div className="fixed bottom-36 left-1/2 -translate-x-1/2 text-white/60">
        <div className="flex flex-col items-center gap-4">
          {currentQuestionIndex > 0 && (
            <button
              onClick={goToPreviousQuestion}
              className="p-2 hover:text-white transition-colors"
            >
              <ChevronUp className="w-6 h-6 rotate-180" />
            </button>
          )}
          {currentQuestionIndex < SAMPLE_QUESTIONS.length - 1 && (
            <button
              onClick={goToNextQuestion}
              className="p-2 hover:text-white transition-colors"
            >
              <ChevronUp className="w-6 h-6 animate-bounce" />
            </button>
          )}
          <span className="text-sm">
            {currentQuestionIndex + 1} / {SAMPLE_QUESTIONS.length}
          </span>
        </div>
      </div>

      {/* 回答エリア */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={answered[currentQuestion.id] ? "次の問題へスワイプ" : "あなたの考えを入力..."}
            disabled={answered[currentQuestion.id]}
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer(newAnswer)}
          />
          <button
            onClick={() => checkAnswer(newAnswer)}
            className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            disabled={answered[currentQuestion.id]}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* 他のユーザーの回答 */}
        <div className="space-y-3 max-h-32 overflow-y-auto">
          {currentQuestion.answers.map((answer: Answer) => (
            <div key={answer.id} className="flex items-start gap-2">
              <div className="flex-1">
                <p className="text-sm">{answer.text}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{answer.userName}</span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-xs text-gray-400">{answer.timestamp}</span>
                </div>
              </div>
              <button className="flex items-center gap-1 text-pink-500 hover:text-pink-400 transition-colors">
                <Heart className="w-4 h-4" />
                <span className="text-xs">{answer.likes}</span>
              </button>
            </div>
          ))}

          {/* ユーザーの回答を表示 */}
          {userAnswers[currentQuestion.id] && (
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <p className="text-sm">{userAnswers[currentQuestion.id]}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">あなた</span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-xs text-gray-400">たった今</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 進捗分析ボタン */}
      <button 
        onClick={() => setShowProgressModal(true)}
        className="fixed top-20 right-4 p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors z-20"
      >
        <Brain className="w-5 h-5" />
      </button>

      {/* 進捗分析モーダル */}
      {showProgressModal && (
        <div className="fixed inset-0 bg-gray-900/95 z-50 overflow-auto">
          <div className="max-w-4xl mx-auto p-4 pt-16">
            <button 
              onClick={() => setShowProgressModal(false)}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span>正答率</span>
                </div>
                <div className="text-2xl font-bold">
                  {Math.round((detailedStats.correctAnswers / (detailedStats.totalAnswered || 1)) * 100)}%
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-orange-400" />
                  <span>連続正解</span>
                </div>
                <div className="text-2xl font-bold">{detailedStats.streak}</div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span>レベル</span>
                </div>
                <div className="text-2xl font-bold">{detailedStats.level}</div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span>総回答数</span>
                </div>
                <div className="text-2xl font-bold">{detailedStats.totalAnswered}</div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-4">正答率の推移</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={detailedStats.dailyProgress}>
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

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-4">科目別の進捗</h3>
              <div className="space-y-4">
                {detailedStats.subjectProgress.map(subject => (
                  <div key={subject.subject}>
                    <div className="flex justify-between mb-1">
                      <span>{subject.subject}</span>
                      <span>
                        {Math.round((subject.correct / (subject.total || 1)) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ 
                          width: `${(subject.correct / (subject.total || 1)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThoughtChallenge;