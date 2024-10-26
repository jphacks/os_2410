class Character < ApplicationRecord
  belongs_to :user
  has_many :action_logs

  validates :character_name, presence: true
  validates :lifespan, numericality: { greater_than_or_equal_to: 0 }
end
