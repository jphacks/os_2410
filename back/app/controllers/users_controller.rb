class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end


  def destroy
    @user = User.find(params[:id])
    @user.destroy
    head :no_content
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :avatar_url)
  end
end