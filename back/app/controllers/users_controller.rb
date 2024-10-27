class UsersController < ApplicationController
  # skip_before_action :authenticate_user!, only: [:create, :login]
  # アカウント作成（ユーザー登録）
  def create
    @user = User.new(user_params)
    if @user.save
      token = @user.create_new_auth_token
      render json: { user: @user, token: token }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # ログイン処理
  def login
    # 入力されたemailでユーザーを探す
    @user = User.find_by(email: params[:email])

    # ユーザーが存在し、パスワードが一致する場合
    if @user && @user.valid_password?(params[:password])
      token = @user.create_new_auth_token
      render json: { user: @user, token: token }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # ユーザー情報の取得
  def show
    @user = User.find(params[:id])
    render json: @user
  end

  # ユーザー情報の更新
  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # ユーザー削除
  def destroy
    @user = User.find(params[:id])
    @user.destroy
    head :no_content
  end

  private

  # ユーザー登録/更新のパラメータ
  def user_params
    params.permit(:email, :password, :password_confirmation,:username)
  end
end


