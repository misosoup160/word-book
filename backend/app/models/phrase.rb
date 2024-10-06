class Phrase < ApplicationRecord
  before_save :convert_to_pinyin

  private

  def convert_to_pinyin
    if self.cn_text.present?
      self.pinyin = PinYin.sentence(cn_text, :unicode)
    end
  end
end
