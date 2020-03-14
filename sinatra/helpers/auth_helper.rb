# frozen_string_literal: true

require_relative '../lib/json_web_token.rb'

module ESC
  module AuthHelper
    def jwt
      header = env.fetch('HTTP_AUTHORIZATION', '')
      header = header.split(' ').last if header # Bearer
      JsonWebToken.decode(header)
    rescue JWT::DecodeError
      nil
    end

    def me
      Users.find_one!(jwt['sub'])
    rescue StandardError
      nil
    end
  end
end
