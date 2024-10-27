import React, { useState } from 'react';
import { Send, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Props {
  onSubmit: (answer: string) => void;
  onSkip: () => void;
}

const AnswerInput: React.FC<Props> = ({ onSubmit, onSkip }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim());
      setAnswer('');
    }
  };

  return (
    <div className="absolute bottom-0 w-full p-4 bg-gray-800/80 backdrop-blur">
      <div className="flex gap-2">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="あなたの考えを入力..."
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex gap-2">
          <button className="flex items-center gap-1 text-green-400">
            <ThumbsUp className="w-4 h-4" /> 
            <span className="text-sm">いいね 24</span>
          </button>
          <button className="flex items-center gap-1 text-red-400">
            <ThumbsDown className="w-4 h-4" />
            <span className="text-sm">違うかも 3</span>
          </button>
        </div>
        <button 
          onClick={onSkip}
          className="text-sm text-gray-400 hover:text-gray-300"
        >
          スキップ
        </button>
      </div>
    </div>
  );
};

export default AnswerInput;