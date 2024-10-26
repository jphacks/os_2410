class CreateCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :characters do |t|
      t.references :user, null: false, foreign_key: true
      t.string :character_name
      t.integer :age
      t.integer :lifespan
      t.integer :health_points

      t.timestamps
    end
  end
end
