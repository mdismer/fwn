require "rails_helper"

RSpec.describe FactionsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/factions").to route_to("factions#index")
    end

    it "routes to #show" do
      expect(get: "/factions/1").to route_to("factions#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/factions").to route_to("factions#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/factions/1").to route_to("factions#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/factions/1").to route_to("factions#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/factions/1").to route_to("factions#destroy", id: "1")
    end
  end
end
