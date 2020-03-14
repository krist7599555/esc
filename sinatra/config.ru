# frozen_string_literal: true

require 'sinatra/base'
require 'sinatra/namespace'
%w[initialize lib models helpers controllers].each do |folder|
  Dir.glob("./#{folder}/*.rb").sort.each do |file|
    puts 'loading %-12s - %s' % file.split('/')[1, 4]
    require file
  end
end

# map('/api') { run App }
# map('/api') { run Auth }
# map('/api/users') { run Users }
require 'rack'
require 'rack/cascade'

module Rack
  class Lint
    def call(env = nil)
      @app.call(env)
    end
  end
end

run Rack::Cascade.new([Auth, Users])
