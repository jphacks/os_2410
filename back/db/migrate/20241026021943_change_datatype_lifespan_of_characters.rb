class ChangeDatatypeLifespanOfCharacters < ActiveRecord::Migration[7.0]
  def change
    change_column :characters, :lifespan, :float
  end
end
