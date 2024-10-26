class CreateActionLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :action_logs do |t|
      t.references :user, null: false, foreign_key: true
      t.references :character, null: false, foreign_key: true
      t.string :action_type
      t.string :description
      t.integer :effect_on_lifespan

      t.timestamps
    end
  end
end
