class Character < ApplicationRecord
  belongs_to :user
  has_many :action_logs

  validates :character_name, presence: true
  validates :lifespan, numericality: { greater_than_or_equal_to: 0 }

  # 年齢の更新
  def update_age
    self.age += 1
    save
  end

  # 寿命の伸び縮みによって状態を変化
  def update_characters_status_by_lifespan
    if age.to_f >= lifespan # 寿命を迎えた場合
      self.status = 0
      save
    elsif age > 1
      self.status = 2
      save
    elsif age > 4 && lifespan <= 2.0
      self.status = 3
      save
    end
  end

    # 寿命の伸び縮みによって状態を変化
  def update_characters_status_by_lifespan_ikiteru
    if age > 1
      self.status = 2
      save
    elsif age > 4 && lifespan <= 2.0
      self.status = 3
      save
    else
      self.status = 1
      save
    end
  end
end
