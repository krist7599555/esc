# frozen_string_literal: true

require './config/environment' # Rack::Handler.default.run(Hanami.app, Port: 3000)
run Hanami.app
