class CreateAuthentications < ActiveRecord::Migration[7.0]
  def change
    create_table :authentications do |t|
      t.references :user, null: false, foreign_key: true
      t.string :provider
      t.string :uid

      t.timestamps
    end
    add_index :authentications, [:provider, :uid], unique: true
  end
end
