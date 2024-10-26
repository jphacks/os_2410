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
      character_hp_service.update_hp(@action_log.action_type, @action_log.detail)

      character_lifespan_service = CharacterLifespanService.new(character)
      character_lifespan_service.update_lifespan(@action_log.action_type, @action_log.detail, character.status)

      render json: @action_log, status: :created
    else
      render json: @action_log.errors, status: :unprocessable_entity
    end
  end

  private

  # Strong Parameters
  def action_log_params
    params.require(:action_log).permit(:action_type, :detail, :user_id, :character_id)
  end
end