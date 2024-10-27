class ActionLog < ApplicationRecord
  belongs_to :user
  belongs_to :character

  validates :action_type, presence: true
end