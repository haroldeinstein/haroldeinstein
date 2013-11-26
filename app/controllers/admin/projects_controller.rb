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
    (params[:projects] || []).each do |k, p|
      proj = Project.find_by_id(p["id"]) if p["id"]
      proj ||= Project.new
      if p["delete"]
        proj.destroy
      else
        proj.attributes = p
        proj.save
      end
    end

    render json: Project.all.as_json
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
    params.require(:projects).permit(:title, :video_url, :vimeo_id, :thumbnail_small, :thumbnail_medium, :thumbnail_large, :sort_index)
  end
end
