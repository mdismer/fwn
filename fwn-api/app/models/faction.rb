class Faction < ApplicationRecord
  belongs_to :campaign
  belongs_to :world
end
