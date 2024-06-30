class CreateWorlds < ActiveRecord::Migration[7.1]
  def change
    create_table :worlds, id: :uuid do |t|
      t.string :name
      t.belongs_to :campaign, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
