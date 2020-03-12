class RoomsController < ApplicationController
  def index
    render :json => Room.index
  end
end