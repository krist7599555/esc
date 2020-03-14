# frozen_string_literal: true

require 'sinatra'
require 'sinatra/base'
require_relative '../lib/http_errors.rb'
require_relative '../helpers/auth_helper.rb'
require 'colorize'

module ESC
  class Base < Sinatra::Base
    register Sinatra::Namespace

    disable :dump_errors
    disable :raise_errors
    disable :show_exceptions

    helpers ESC::AuthHelper

    set(:auth) do |*_roles|
      condition do
        raise Unauthorized, 'this process require login' if me.nil?
      end
    end

    before { content_type :json }
    after  { response.body = JSON.dump(response.body) }

    error HttpError     do |e| [e.class::CODE, { message: e.message }] end
    error StandardError do |e|
      puts e.message.to_s.red
      # puts e.inspect
      e.backtrace.each do |line|
        puts '  >  ' + line if (line =~ /\.rvm/).nil?
      end
      [500, { message: e.message }]
    end
  end
end
