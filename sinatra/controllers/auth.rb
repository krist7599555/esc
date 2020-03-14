# frozen_string_literal: true

require 'bcrypt'
require_relative './base.rb'
require_relative '../lib/json_web_token.rb'

class Auth < ESC::Base
  landing = -> { [200, { message: 'ESC_API' }] }
  profile = -> { [200, me] }
  login   = lambda do
    usr = params[:username]
    pwd = params[:password]
    if usr.nil? || pwd.nil?
      raise BadRequest, "username and password can't be null"
    end
    fnd = Users.get(usr)
    if fnd.nil? || (BCrypt::Password.new(fnd['password']) != pwd)
      Users.upsert(usr, SSO.login!(usr, pwd))
      Users.upsert(usr, EngineerLibrary.user!(usr))
      Users.upsert(usr, password: BCrypt::Password.create(pwd))
      fnd = Users.get(usr)
    end
    { access_token: JsonWebToken.encode({ sub: fnd['id'] }), profile: fnd }
  end

  namespace '/api' do
    get  '/',                   &landing
    post '/login',              &login
    get  '/profile', auth: nil, &profile
  end
end
