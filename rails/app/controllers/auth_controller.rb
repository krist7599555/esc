class AuthController < ApplicationController
  
  def login
    @user = SSO.login!(params[:username], params[:password])
    User.create(@user)
    render :json => {
      :access_token => JsonWebToken.encode(:sub => @user[:id]),
      :profile      => @user.slice(:id, :nameTH, :nameEN, :surnameTH, :surnameEN, :year, :faculty)
    }
  end

  def profile
    self.authenticate_user!
    render :json => @current_user
  end
  
end