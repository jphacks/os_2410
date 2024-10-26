class AddHpMovementToCharacters < ActiveRecord::Migration[7.0]
  def change
    add_column :characters, :hp_movement, :float
  end
end
