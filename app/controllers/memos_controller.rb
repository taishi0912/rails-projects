class MemosController < ApplicationController
    def index
      @memos = Memo.all.order(created_at: :desc)
    end
  
    def show
      @memo = Memo.find(params[:id])
    end
  
    def new
      @memo = Memo.new
    end
  
    def create
      @memo = Memo.new(memo_params)
      if @memo.save
        redirect_to @memo, notice: 'メモを作成しました'
      else
        render :new, status: :unprocessable_entity
      end
    end
  
    def edit
      @memo = Memo.find(params[:id])
    end
  
    def update
      @memo = Memo.find(params[:id])
      if @memo.update(memo_params)
        redirect_to @memo, notice: 'メモを更新しました'
      else
        render :edit, status: :unprocessable_entity
      end
    end
  
    def destroy
      @memo = Memo.find(params[:id])
      @memo.destroy
      redirect_to memos_url, notice: 'メモを削除しました'
    end
  
    private
  
    def memo_params
      params.require(:memo).permit(:title, :content)
    end
  end