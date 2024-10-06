class AddPinyinToPhrases < ActiveRecord::Migration[7.2]
  def change
    add_column :phrases, :pinyin, :text
  end
end
