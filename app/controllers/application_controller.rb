class ApplicationController < ActionController::Base
  before_action :authenticate

  protect_from_forgery with: :exception

  def authenticate_admin!
    unless current_user
      redirect_to login_path
    end
  end

  def login(user)
    session[:user_id] = user.id
    redirect_to admin_path
  end

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def authenticate
    if Rails.env.staging?
      authenticate_or_request_with_http_basic do |username, password|
        username == "dummyfilms" && password == "harold"
      end
    end
  end
end
