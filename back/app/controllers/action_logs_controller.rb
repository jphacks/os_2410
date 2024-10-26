class ActionLogsController < ApplicationController
  # 特定のキャラクターに関連する行動ログを取得
  def index_by_character
    @character = Character.find(params[:character_id])
    @action_logs = @character.action_logs
    render json: @action_logs
  end

  # 行動ログを新規作成
  def create
    @action_log = ActionLog.new(action_log_params)
    # @action_log.user_id = params[:user_id] # user_idがリクエストで渡される場合
    # @action_log.character_id = params[:character_id] # character_idがリクエストで渡される場合

    # 行動による寿命やHPの変化を計算
    if @action_log.save
      # キャラクターの寿命やステータスを更新（例: 行動に応じて寿命を変更）
      character = @action_log.character

      character_hp_service = CharacterHpService.new(character)
      character_hp_service.update_hp(@action_log.action_type, @action_log.detail, @action_log.hp_movement)

      character_lifespan_service = CharacterLifespanService.new(character)
      character_lifespan_service.update_lifespan(@action_log.action_type, @action_log.detail, character.status, @action_log.lifespan_movement)

      render json: @action_log, status: :created
    else
      render json: @action_log.errors, status: :unprocessable_entity
    end
  end

  # 当日の食事ログを取得
  def meal_logs
    @user = User.find(params[:user_id])
    @today_action_logs = @user.action_logs.where(created_at: Time.zone.now.all_day)
    meal_logs = {
      morning: @today_action_logs.exists?(action_type: '朝食'),
      afternoon: @today_action_logs.exists?(action_type: '昼食'),
      night: @today_action_logs.exists?(action_type: '夕食'),
      other: @today_action_logs.exists?(action_type: '軽食')
    }

    render json: meal_logs
  end

  # ユーザーに紐づくある特定の日の行動ログを取得
  def user_particular_day_actions
    @user = User.find(params[:user_id])
    @particular_day_action_logs = @user.action_logs.where(created_at: params[:date].to_date.all_day)
    render json: @particular_day_action_logs
  end

  private

  def action_log_params
    params.permit(:action_type, :detail, :user_id, :character_id)
  end
end