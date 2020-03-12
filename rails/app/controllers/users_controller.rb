class UsersController < ApplicationController

  before_action {
    begin
      self.authenticate_user!
    rescue => e
      render :json => { message: e.message }, :status => 401
    end
  }

  def index
    render json: User.index
  end

  def get
    render json: @current_user
  end
  
  def update_role
    
    render json: User.update_role(@current_user[:id], params[:role])
  end
end