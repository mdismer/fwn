class Campaign < ApplicationRecord
    has_many :worlds
    has_many :factions
end
