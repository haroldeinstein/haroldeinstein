class AdminController < ApplicationController
  before_filter :authenticate_admin!

  def index
    @editable = "false"
  end
end
