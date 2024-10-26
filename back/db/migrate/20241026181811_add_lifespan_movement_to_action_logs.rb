class AddLifespanMovementToActionLogs < ActiveRecord::Migration[7.0]
  def change
    add_column :action_logs, :lifespan_movement, :float
  end
end
