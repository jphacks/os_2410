class AddDeviseTokenAuthFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    change_table(:users) do |t|
      ## Required
      t.string :provider, null: false, default: "email"
      t.string :uid, null: false, default: ""

      ## Tokens
      t.json :tokens
    end

    # ユニーク制約を付けます
    add_index :users, [:uid, :provider], unique: true
  end
end
