class CreateAnswers < ActiveRecord::Migration[7.0]
    def change
      create_table :answers do |t|
        t.text :content, null: false
        t.boolean :correct, default: false
        t.references :user, null: false, foreign_key: true
        t.references :question, null: false, foreign_key: true
  
        t.timestamps
      end
  
      add_index :answers, :correct
    end
  end