# ユーザーモデル
# @attr name [String] ユーザー名
# @attr email [String] メールアドレス
# @attr role [String] ユーザーロール（admin/teacher/student）
class User < ApplicationRecord
    # 関連付け
    has_many :answers, dependent: :destroy
    has_many :questions
    has_many :likes
    has_many :viewed_questions
    has_one :user_statistics
  
    # バリデーション
    validates :name, presence: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    
    # パスワード認証
    has_secure_password
  
    # ユーザーの進捗状況を取得
    def progress_stats
      {
        total_answers: answers.count,
        correct_answers: answers.where(correct: true).count,
        streak: calculate_streak,
        level: calculate_level
      }
    end
  
    private
  
    # 連続正解数を計算
    def calculate_streak
      streak = 0
      answers.order(created_at: :desc).each do |answer|
        break unless answer.correct?
        streak += 1
      end
      streak
    end
  
    # レベルを計算（正解数に基づく）
    def calculate_level
      correct_count = answers.where(correct: true).count
      (correct_count / 5.0).ceil
    end
  end