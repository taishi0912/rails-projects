# 問題のAPI制御を行うコントローラー
class Api::QuestionsController < ApplicationController
    before_action :set_question, only: [:show, :update, :destroy, :like, :view]
  
    # GET /api/questions
    def index
      @questions = Question.includes(:user, :answers)
                          .with_attached_video
                          .order(created_at: :desc)
      
      # フィルタリング
      @questions = @questions.by_difficulty(params[:difficulty]) if params[:difficulty]
      @questions = @questions.by_subject(params[:subject]) if params[:subject]
      
      render json: @questions, include: [:user, :answers]
    end
  
    # GET /api/questions/:id
    def show
      render json: @question, include: [:user, {
        answers: { include: :user }
      }]
    end
  
    # POST /api/questions
    def create
      @question = current_user.questions.build(question_params)
  
      if @question.save
        render json: @question, status: :created
      else
        render json: @question.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /api/questions/:id
    def update
      if @question.update(question_params)
        render json: @question
      else
        render json: @question.errors, status: :unprocessable_entity
      end
    end
  
    # POST /api/questions/:id/like
    def like
      like = @question.likes.find_or_initialize_by(user: current_user)
      
      if like.new_record?
        like.save
        QuestionChannel.broadcast_to(@question, { type: 'LIKE_ADDED', count: @question.likes.count })
      else
        like.destroy
        QuestionChannel.broadcast_to(@question, { type: 'LIKE_REMOVED', count: @question.likes.count })
      end
  
      render json: { likes_count: @question.likes.count }
    end
  
    # POST /api/questions/:id/view
    def view
      unless @question.viewers.include?(current_user)
        @question.viewed_questions.create(user: current_user)
      end
      render json: { views_count: @question.viewers.count }
    end
  
    private
  
    def set_question
      @question = Question.find(params[:id])
    end
  
    def question_params
      params.require(:question).permit(
        :title, :content, :difficulty, :subject_type,
        :video, correct_answer_pattern: []
      )
    end
  end  