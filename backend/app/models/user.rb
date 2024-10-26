class User < ApplicationRecord
  has_many :authentications
  has_many :characters
  has_many :action_logs
end
