class AddHpMovementToActionLogs < ActiveRecord::Migration[7.0]
  def change
    add_column :action_logs, :hp_movement, :float
  end
end
