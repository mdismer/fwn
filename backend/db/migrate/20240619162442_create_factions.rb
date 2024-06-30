class CreateFactions < ActiveRecord::Migration[7.1]
  def change
    create_table :factions, id: :uuid do |t|
      t.string :name
      t.text :description
      t.belongs_to :campaign, null: false, foreign_key: true, type: :uuid
      t.integer :max_hp
      t.integer :current_hp
      t.integer :force
      t.integer :wealth
      t.integer :cunning
      t.integer :experience
      t.jsonb :goal
      t.belongs_to :world, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
