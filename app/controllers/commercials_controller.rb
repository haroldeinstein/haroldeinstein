class CommercialsController < ApplicationController
  def index
  end

  private

  def commercials
    Project.order('sort_index')
  end
  helper_method :commercials
end
