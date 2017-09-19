class AdminController < ApplicationController
  before_action :authenticate_admin!

  def index
    @editable = "false"
  end
end
