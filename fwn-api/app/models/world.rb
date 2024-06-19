class World < ApplicationRecord
  belongs_to :campaign
  has_many :factions
end
