class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :authentications
  has_many :characters
  has_many :action_logs

  include DeviseTokenAuth::Concerns::User
end
