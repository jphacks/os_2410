class RemoveLifespanMovementFromCharacters < ActiveRecord::Migration[7.0]
  def change
    remove_column :characters, :lifespan_movement, :float
  end
end
