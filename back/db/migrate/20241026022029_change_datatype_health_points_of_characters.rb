class ChangeDatatypeHealthPointsOfCharacters < ActiveRecord::Migration[7.0]
  def change
    change_column :characters, :health_points, :float
  end
end
