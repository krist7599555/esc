# frozen_string_literal: true

class ReservationsController < ApplicationController
  before_action(only: %i[create]) do
    begin
      authenticate_user!
    rescue StandardError => e
      render json: { message: e.message }, status: 401
    end
  end
end
