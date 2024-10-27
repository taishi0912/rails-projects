# ユーザーの実績を管理するモデル
class UserAchievement < ApplicationRecord
    belongs_to :user
    
    validates :name, presence: true
    validates :description, presence: true
    
    after_create :notify_user
    
    private
    
    def notify_user
      AchievementMailer.achievement_unlocked(self).deliver_later
    end
  end