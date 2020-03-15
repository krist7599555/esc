# frozen_string_literal: true

require 'bundler/setup'
require 'hanami/setup'
require_relative './initializers/rethinkdb.rb'
require_relative '../lib/rethinkdb.rb'
require_relative '../lib/esc'
require_relative '../apps/api/application'

Hanami.configure do
  mount Api::Application, at: '/api'
  environment :development do
    # See: https://guides.hanamirb.org/projects/logging
    logger level: :debug
  end

  environment :production do
    logger level: :info, formatter: :json, filter: []
  end
end
