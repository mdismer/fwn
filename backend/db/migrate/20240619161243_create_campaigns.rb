class CreateCampaigns < ActiveRecord::Migration[7.1]
  def change
    enable_extension 'pgcrypto'
    create_table :campaigns, id: :uuid do |t|
      t.string :owner_id
      t.string :name

      t.timestamps
    end
  end
end
