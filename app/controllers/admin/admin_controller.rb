class Admin::AdminController < ApplicationController
  before_filter :authenticate_admin!
  layout "admin"
end
