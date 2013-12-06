class CommercialsController < ApplicationController
  def index
    @vid = Project.find(params[:vid]) if params[:vid]
  end

  private

  def commercials
    Project.all
  end
  helper_method :commercials
end
