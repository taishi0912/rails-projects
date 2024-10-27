# app/models/memo.rb
class Memo < ApplicationRecord
    validates :title, presence: true
    validates :content, presence: true
  end