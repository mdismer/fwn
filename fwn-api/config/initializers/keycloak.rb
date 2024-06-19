Keycloak.configure do |config|
    config.server_url = ENV["KEYCLOAK_SERVER_URL"]
    config.realm_id   = ENV["KEYCLOAK_REALM_ID"]
    config.logger     = Rails.logger
    config.skip_paths = {
      post:   [/^\/message/],
      get:    [/^\/locales/, /^\/health\/.+/]
    }
  end