# 回答モデル
# @attr content [Text] 回答内容
# @attr correct [Boolean] 正解フラグ
class Answer < ApplicationRecord
    # 関連付け
    belongs_to :user
    belongs_to :question
    has_many :likes, dependent: :destroy
  
    # バリデーション
    validates :content, presence: true
    
    # コールバック
    after_create :evaluate_answer
    after_save :update_user_statistics
  
    private
  
    # 回答を評価
    def evaluate_answer
      keywords = question.correct_answer_pattern
      matched_keywords = keywords.count { |keyword| content.downcase.include?(keyword.downcase) }
      update_column(:correct, matched_keywords >= 2)
    end
  
    # ユーザー統計の更新
    def update_user_statistics
      stats = user.user_statistics || user.build_user_statistics
      stats.total_answers += 1
      stats.correct_answers += 1 if correct?
      stats.save
    end
  end