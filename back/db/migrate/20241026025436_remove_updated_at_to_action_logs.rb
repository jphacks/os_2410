class RemoveUpdatedAtToActionLogs < ActiveRecord::Migration[7.0]
  def change
    remove_column :action_logs, :updated_at, :datetime
  end
end
