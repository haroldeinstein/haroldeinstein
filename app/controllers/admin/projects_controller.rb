class Admin::ProjectsController < Admin::AdminController
  def index
    @add_action = "show videos"
    @projects = Project.all
  end

  def show
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    if @project.save
    else
    end
  end

  def update
  end

  def destroy
  end

  def fetch
    render json: @projects.as_json
  end

  private

  def project_params
  end
end
