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

  # キャラクターが死亡した際の情報を取得
  def character_death
    @character = Character.find(params[:character_id])

    # 死亡時のHP・寿命の変化の配列を取得
    @death_point = []
    if @character.health_points <= 0
      @action_logs = @character.action_logs
      if @action_logs.exists?
        for action_log in @action_logs do
          @death_point << action_log.hp_movement
        end
      end
    elsif @character.lifespan <= 0
      if @action_logs.exists?
        for action_log in @action_logs do
          @death_point << action_log.lifespan_movement
        end
      end
    end
    
    # 行動ログを全て取得し、各アクションタイプのHP・寿命の変化を計算
    if @character.health_points <= 0
      @action_logs_sleep = @character.action_logs.where(action_type: '睡眠')
      if @action_logs_sleep.exists?
        for action_logs_sleep in @action_logs_sleep do
          @sleep_point += action_logs_sleep.health_points
        end
      end
      @action_logs_meal = @character.action_logs.where(action_type: '朝食').or(@character.action_logs.where(action_type: '昼食')).or(@character.action_logs.where(action_type: '夕食')).or(@character.action_logs.where(action_type: '軽食'))
      if @action_logs_meal.exists?
        for action_logs_meal in @action_logs_meal do
          @meal_point += action_logs_meal.health_points
        end
      end
      @action_logs_exercise = @character.action_logs.where(action_type: '運動')
      if @action_logs_exercise.exists?
        for action_logs_exercise in @action_logs_exercise do
          @exercise_point += action_logs_exercise.health_points
        end
      end
      @action_logs_smoking = @character.action_logs.where(action_type: 'タバコ')
      if @action_logs_smoking.exists?
        for action_logs_smoking in @action_logs_smoking do
          @smoking_point += action_logs_smoking.health_points
        end
      end
      @action_logs_drinking = @character.action_logs.where(action_type: 'お酒')
      if @action_logs_drinking.exists?
        for action_logs_drinking in @action_logs_drinking do
          @drinking_point += action_logs_drinking.health_points
        end
      end
      @action_logs_energy_drink = @character.action_logs.where(action_type: 'エナドリ')
      if @action_logs_energy_drink.exists?
        for action_logs_energy_drink in @action_logs_energy_drink do
          @energy_drink_point += action_logs_energy_drink.health_points
        end
      end
    elsif @character.lifespan <= 0
      @action_logs_sleep = @character.action_logs.where(action_type: '睡眠')
      if @action_logs_sleep.exists?
        for action_logs_sleep in @action_logs_sleep do
          @sleep_point += action_logs_sleep.lifespan_movement
        end
      end
      @action_logs_meal = @character.action_logs.where(action_type: '朝食').or(@character.action_logs.where(action_type: '昼食')).or(@character.action_logs.where(action_type: '夕食')).or(@character.action_logs.where(action_type: '軽食'))
      if @action_logs_meal.exists?
        for action_logs_meal in @action_logs_meal do
          @meal_point += action_logs_meal.lifespan_movement
        end
      end
      @action_logs_exercise = @character.action_logs.where(action_type: '運動')
      if @action_logs_exercise.exists?
        for action_logs_exercise in @action_logs_exercise do
          @exercise_point += action_logs_exercise.lifespan_movement
        end
      end
      @action_logs_smoking = @character.action_logs.where(action_type: 'タバコ')
      if @action_logs_smoking.exists?
        for action_logs_smoking in @action_logs_smoking do
          @smoking_point += action_logs_smoking.lifespan_movement
        end
      end
      @action_logs_drinking = @character.action_logs.where(action_type: 'お酒')
      if @action_logs_drinking.exists?
        for action_logs_drinking in @action_logs_drinking do
          @drinking_point += action_logs_drinking.lifespan_movement
        end
      end
      @action_logs_energy_drink = @character.action_logs.where(action_type: 'エナドリ')
      if @action_logs_energy_drink.exists?
        for action_logs_energy_drink in @action_logs_energy_drink do
          @energy_drink_point += action_logs_energy_drink.lifespan_movement
        end
      end
    end

    # 全てのポイントを比較し、最も少ないポイントを返す
    @cause_of_death = ''
    if @sleep_point < @meal_point && @sleep_point < @exercise_point && @sleep_point < @smoking_point && @sleep_point < @drinking_point && @sleep_point < @energy_drink_point
      @cause_of_death = '睡眠不足'
    elsif @meal_point < @sleep_point && @meal_point < @exercise_point && @meal_point < @smoking_point && @meal_point < @drinking_point && @meal_point < @energy_drink_point
      @cause_of_death = '栄養不足'
    elsif @exercise_point < @sleep_point && @exercise_point < @meal_point && @exercise_point < @smoking_point && @exercise_point < @drinking_point && @exercise_point < @energy_drink_point
      @cause_of_death = '運動不足'
    elsif @smoking_point < @sleep_point && @smoking_point < @meal_point && @smoking_point < @exercise_point && @smoking_point < @drinking_point && @smoking_point < @energy_drink_point
      @cause_of_death = '喫煙'
    elsif @drinking_point < @sleep_point && @drinking_point < @meal_point && @drinking_point < @exercise_point && @drinking_point < @smoking_point && @drinking_point < @energy_drink_point
      @cause_of_death = '飲酒'
    else
      @cause_of_death = 'エナドリ'
    end
    
    render json: { cause_of_death: @cause_of_death, death_point: @death_point }
  end

  private

  def action_log_params
    params.permit(:action_type, :detail, :user_id, :character_id)
  end
end