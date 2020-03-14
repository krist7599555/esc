class ApplicationController < ActionController::API
  rescue_from ArgumentError, with: :render_argument_error_response
  rescue_from RuntimeError, with: :render_runtime_error_response

  rescue_from ActionController::ParameterMissing,
              with: :render_params_missing_error_response
  rescue_from StandardError, with: :render_standard_error_response

  def api
    render json: 'ESC API2'
  end

  def authenticate_user!
    header = request.headers['Authorization']
    header = header.split(' ').last if header # Bearer
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.get!(@decoded[:sub])
      @current_user.symbolize_keys!
      @is_admin = @current_user.fetch(:roles, []).include? 'admin'
    rescue JWT::DecodeError
      raise ArgumentError.new 'authenticate token have wrong format'
    rescue IndexError
      raise 'user not exist in database'
    end
  end

  def authenticate_user
    begin
      self.authenticate_user!
    rescue StandardError
      nil
    end
  end

  private

  def render_argument_error_response(exception)
    render json: { message: exception.to_s }, status: 400
  end

  def render_runtime_error_response(exception)
    render json: { message: exception.to_s }, status: 500
  end

  def render_standard_error_response(exception)
    render json: { message: exception.to_s }, status: 500
  end

  def render_params_missing_error_response(exception)
    render json: { message: exception.to_s }, status: 400
  end
end
