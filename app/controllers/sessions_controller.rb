class SessionsController < ApplicationController

  def new
    @editable = "false"
  end

  def create
    puts params.to_yaml
    user = User.find_by_username(params[:username])
    if user && user.authenticate(params[:password])
      login(user)
    else
      redirect_to login_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end
end
