class ReservationsController < ApplicationController
  before_action(only: %i[create]) do
    begin
      self.authenticate_user!
    rescue => e
      render json: { message: e.message }, status: 401
    end
  end

  def index
    render json: Reservation.index
  end

  def create
    @reserv =
      Reservation.create!(
        userid: @current_user[:id],
        roomid: params[:roomid],
        organization: params[:organization],
        time_start: params[:time_start],
        time_end: params[:time_end]
      )
    render json: @reserv
  end

  def update_status
    @reserv = Reservation.update(params[:id], { status: params[:status] })
    render json: @reserv
  end # TODO admin only
end
