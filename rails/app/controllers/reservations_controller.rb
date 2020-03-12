class ReservationsController < ApplicationController
  
  before_action(only: [:create]) {
    begin
      self.authenticate_user!
    rescue => e
      render :json => { message: e.message }, :status => 401
    end
  }

  def index
    render :json => Reservation.index
  end

  def create
    @reserv = Reservation.create!(
      :userid       => @current_user[:id],
      :roomid       => params[:roomid],
      :organization => params[:organization],
      :time_start   => params[:time_start],
      :time_end     => params[:time_end],
    )
    render :json => @reserv
  end
end