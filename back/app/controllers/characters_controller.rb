class CharactersController < ApplicationController
  # 特定のキャラクター情報を取得
  def show
    @character = Character.find(params[:id])
    # TODO 死亡判定をサービス層から処理する
    render json: @character
  end

  # 特定のユーザーのキャラクター一覧を取得
  def index_by_user
    @user = User.find(params[:user_id])
    @characters = @user.characters
    render json: @characters
  end

  # キャラクターを新規作成
  def create
    @character = Character.new(character_params)
    @character.user_id = params[:user_id]
    @character.age = 0
    @character.lifespan = 7
    @character.health_points = 8

    if @character.save
      render json: @character, status: :created
    else
      render json: @character.errors, status: :unprocessable_entity
    end
  end

  # キャラクター情報を更新
  def update
    @character = Character.find(params[:id])

    if @character.update(character_params)
      render json: @character
    else
      render json: @character.errors, status: :unprocessable_entity
    end
  end

  # キャラクターを削除
  def destroy
    @character = Character.find(params[:id])
    @character.destroy
    head :no_content
  end

  private

  # Strong Parameters
  def character_params
    params.require(:character).permit(:character_name)
  end
end