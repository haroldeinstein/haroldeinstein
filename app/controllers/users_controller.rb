class UsersController < ApplicationController
  def new
    @editable = "false"
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
    else
      redirect_to "/admin/signup"
    end
  end

  private

  def user_params
    params.require(:user).permit(:password_digest, :username, :password, :password_confirmation)
  end
end
