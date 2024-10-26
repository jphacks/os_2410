class RemoveEffectOnLifespanToActionLogs < ActiveRecord::Migration[7.0]
  def change
    remove_column :action_logs, :effect_on_lifespan, :integer
  end
end
