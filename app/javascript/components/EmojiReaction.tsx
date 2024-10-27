import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface Props {
  position: { x: number; y: number };
}

const EmojiReaction: React.FC<Props> = ({ position }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className={`
        fixed z-10 p-3 rounded-full transition-all duration-300
        ${isActive ? 'bg-pink-500 text-white' : 'bg-gray-800/80 text-gray-400'}
      `}
      style={{ left: position.x, bottom: position.y }}
    >
      <Heart className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
    </button>
  );
};

export default EmojiReaction;