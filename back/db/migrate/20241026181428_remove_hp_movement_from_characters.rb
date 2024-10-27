class RemoveHpMovementFromCharacters < ActiveRecord::Migration[7.0]
  def change
    remove_column :characters, :hp_movement, :float
  end
end