class CreatePhrases < ActiveRecord::Migration[7.2]
  def change
    create_table :phrases do |t|
      t.text :jp_text
      t.text :cn_text

      t.timestamps
    end
  end
end
