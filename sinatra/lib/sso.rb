# frozen_string_literal: true

require 'faraday'
require 'faraday_middleware'

class SSO
  @conn =
    Faraday.new(
      url: 'https://account.it.chula.ac.th',
      headers: { 'Content-Type' => 'application/x-www-form-urlencoded' }
    ) do |conn|
      conn.request :url_encoded
      conn.response :json, content_type: /\bjson$/
    end

  class << self
    attr_reader :conn
  end

  def self.ticket(username, password)
    if (username =~ /[0-9]{10}/).nil?
      raise ArgumentError, 'username must be number string length 10'
    end

    resp =
      @conn.post('/login') do |req|
        req.body = {
          username: username[0, username[0, 2].to_i > 61 ? 10 : 8],
          password: password,
          service: 'https://account.it.chula.ac.th',
          serviceName: 'ESC server'
        }
      end
    resp.headers[:location][/ticket=(.+)/, 1]
  end

  def self.validate(ticket)
    resp =
      @conn.get('/serviceValidation') do |req|
        req.params = { ticket: ticket }
        req.headers = {
          DeeAppId:
            'dc2326fef061a32bea16242be5941c7d403f485fa52fdfc69d145e3c3be2fb05',
          DeeAppSecret:
            'b3ed7ba73d5c455d9a9ab7a03cb11829ac141b4c07d535de281d244de779a6a847e430a8806ef6fb5e9bf928414e4c444465cbf0347eb5dab9b7a0a0b532e2e5'
        }
      end
    if resp.body['type'] == 'error'
      raise Unauthorized, 'username/password is wrong'
    end

    {
      id: resp.body['ouid'],
      nameTH: resp.body['firstnameth'],
      nameEN: resp.body['firstname'],
      surnameTH: resp.body['lastnameth'],
      surnameEN: resp.body['lastname'],
      faculty: resp.body['ouid'][8, 2].to_i,
      year: resp.body['ouid'][0, 2].to_i
    }
  end

  public

  def self.login!(username, password)
    SSO.validate(SSO.ticket(username, password))
  end

  def self.login(username, password)
    login!(username, password)
  rescue StandardError
    nil
  end
end
