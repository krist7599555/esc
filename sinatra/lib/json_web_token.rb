# frozen_string_literal: true

require 'jwt'
class JsonWebToken
  SECRET_KEY = 'superhseccretforesc'

  def self.encode(payload, exp = Time.now.to_i + 24 * 60 * 60)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    JWT.decode(token, SECRET_KEY)[0]
  end
end
