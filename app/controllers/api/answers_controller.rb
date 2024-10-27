# 回答のAPI制御を行うコントローラー
class Api::AnswersController < ApplicationController
    before_action :set_question
    before_action :set_answer, only: [:show, :update, :destroy]
  
    # POST /api/questions/:question_id/answers
    def create
      @answer = @question.answers.build(answer_params)
      @answer.user = current_user
  
      if @answer.save
        # リアルタイム更新のブロードキャスト
        QuestionChannel.broadcast_to(
          @question,
          { 
            type: 'NEW_ANSWER',
            answer: @answer.as_json(include: :user)
          }
        )
        render json: @answer, status: :created
      else
        render json: @answer.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_question
      @question = Question.find(params[:question_id])
    end
  
    def set_answer
      @answer = @question.answers.find(params[:id])
    end
  
    def answer_params
      params.require(:answer).permit(:content)
    end
  end