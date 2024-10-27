class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.text :content, null: false
      t.integer :difficulty, null: false
      t.string :subject_type, null: false
      t.string :correct_answer_pattern, array: true, default: []
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :questions, :difficulty
    add_index :questions, :subject_type
  end
end