class AddLifespanMovementToCharacters < ActiveRecord::Migration[7.0]
  def change
    add_column :characters, :lifespan_movement, :float
  end
end
