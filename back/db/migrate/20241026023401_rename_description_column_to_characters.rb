class RenameDescriptionColumnToCharacters < ActiveRecord::Migration[7.0]
  def change
    rename_column :action_logs, :description,:detail
  end
end
