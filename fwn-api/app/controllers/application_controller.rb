class ApplicationController < ActionController::API
    include Keycloak::Authentication

    before_action :keycloak_authenticate
end
