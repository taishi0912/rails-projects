/**
 * application.tsx
 * Reactアプリケーションのエントリーポイント
 * DOMが読み込まれた後にReactアプリケーションを初期化
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThoughtChallengeContainer } from './components/ThoughtChallengeContainer';

// DOMContentLoadedイベントでReactアプリケーションを初期化
document.addEventListener('DOMContentLoaded', () => {
  // Reactのルート要素を取得
  const container = document.getElementById('thought-challenge-app');
  if (container) {
    // React 18のcreateRootを使用してアプリケーションをマウント
    const root = createRoot(container);
    root.render(<ThoughtChallengeContainer />);
  }
});