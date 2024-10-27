# 問題に関するリアルタイム更新を処理するチャンネル
class QuestionChannel < ApplicationCable::Channel
    def subscribed
      @question = Question.find(params[:id])
      stream_for @question
    end
  
    def unsubscribed
      # クリーンアップ処理が必要な場合はここに記述
    end
  end
  ```
  
  # spec/models/question_spec.rb
  ```ruby
  require 'rails_helper'
  
  RSpec.describe Question, type: :model do
    describe 'validations' do
      it { should validate_presence_of(:title) }
      it { should validate_presence_of(:content) }
      it { should validate_presence_of(:difficulty) }
      it { should validate_presence_of(:subject_type) }
    end
  
    describe 'associations' do
      it { should belong_to(:user) }
      it { should have_many(:answers) }
      it { should have_many(:likes) }
      it { should have_many(:viewed_questions) }
      it { should have_many(:viewers).through(:viewed_questions) }
    end
  
    describe 'scopes' do
      let!(:physics_question) { create(:question, subject_type: 'physics') }
      let!(:chemistry_question) { create(:question, subject_type: 'chemistry') }
  
      describe '.by_subject' do
        it 'returns questions of specified subject' do
          expect(Question.by_subject('physics')).to include(physics_question)
          expect(Question.by_subject('physics')).not_to include(chemistry_question)
        end
      end
    end
  end