# manages profile editing
class ProfilesController < ApplicationController
  def edit
    if user_signed_in?
      @profile = current_user.profile
    else
      redirect_to new_user_session_path
    end
  end

  def update
    updated_profile = params.require(:profile).permit(:first_name, :last_name, :school, :expected_graduation, :city, :state)
    profile = current_user.profile
    profile.update_attributes(updated_profile)
    redirect_to activities_path
  end

  def show
    @profile = current_user.profile
    respond_to do |f|
      f.html
      f.json { render json: { content: @profile } }
    end
  end

  def add_pic
    current_user.profile.image = params['url']
    current_user.profile.save
    render json:  {url: "/activities"}
  end

  private

  # simplifying how we get id
  def id
    params[:id]
  end
end
