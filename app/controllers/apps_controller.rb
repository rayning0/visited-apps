class AppsController < ApplicationController
  before_action :get_app, only: [:destroy]

  def index
    @apps = App.all
  end

  def new
    @app = App.new
  end

  def create
    @app = App.new(app_params)

    if @app.save
      redirect_to root_path
    else
      render 'new'
    end
  end

  def destroy
    @app.destroy
    redirect_to root_path
  end

  def edit_individual
    @apps = App.find(params[:app_ids])
  end

  def update_individual
    App.update(params[:apps].keys, params[:apps].values)
    redirect_to root_path
  end

  private

  def app_params
    params.require(:app).permit(:name, :url)
  end

  def get_app
    @app = App.find(params[:id])
  end
end
