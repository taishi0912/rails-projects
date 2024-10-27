# 思考力チャレンジアプリケーションのルーティング設定
Rails.application.routes.draw do
  # ルートパスをホーム画面に設定
  root 'home#index'

  # API名前空間の定義
  namespace :api do
    resources :questions do
      resources :answers
      member do
        post :like
        post :view
      end
    end
    
    resources :users do
      member do
        get :progress
        get :statistics
      end
    end
  end

  # Action Cableのルーティング
  mount ActionCable.server => '/cable'
end