# 問題モデル
# @attr title [String] 問題のタイトル
# @attr content [Text] 問題の内容
# @attr difficulty [Integer] 難易度（1-3）
# @attr subject_type [String] 科目タイプ
class Question < ApplicationRecord
    # Active Storageの設定
    has_one_attached :video
    
    # 関連付け
    belongs_to :user
    has_many :answers, dependent: :destroy
    has_many :likes, dependent: :destroy
    has_many :viewed_questions
    has_many :viewers, through: :viewed_questions, source: :user
  
    # バリデーション
    validates :title, presence: true
    validates :content, presence: true
    validates :difficulty, presence: true, inclusion: { in: 1..3 }
    validates :subject_type, presence: true, inclusion: { in: %w[physics chemistry biology math] }
    validate :video_format
  
    # スコープ
    scope :by_difficulty, ->(level) { where(difficulty: level) }
    scope :by_subject, ->(subject) { where(subject_type: subject) }
    scope :popular, -> { joins(:likes).group(:id).order('COUNT(likes.id) DESC') }
  
    # 動画フォーマットの検証
    private
  
    def video_format
      return unless video.attached?
      
      unless video.content_type.in?(%w[video/mp4 video/quicktime])
        errors.add(:video, '対応している動画フォーマットはMP4とMOVのみです')
      end
    end
  end