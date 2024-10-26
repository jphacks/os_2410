class CharacterHpService
<<<<<<< HEAD
  require_relative 'path/to/diff_hp'
=======
  DEFAULT_ADJUSTMENT = 1.0
>>>>>>> origin/front/develop

  def initialize(character)
    @character = character
  end

<<<<<<< HEAD
  # 行動に応じてHPを増減させるメソッド
  def update_hp(action_type, level)
    hp_change = @character.status_change(action_type, level)
    @character.update(health_points: @character.health_points + hp_change)
=======
  # 行動に応じてHPを減少させるメソッド
  def adjust_hp(action_type, detail = {})
    case action_type
    when '食事'
      adjust_for_meal(detail)
    when '睡眠'
      adjust_for_sleep(detail)
    when '運動'
      adjust_for_exercise(detail)
    else
      # デフォルトの減少量
      decrease_hp(DEFAULT_ADJUSTMENT)
    end

    # HPの変更を保存
    @character.save
  end

  private

  # 食事によるHP調整
  def adjust_for_meal(detail)
    meal = detail[:meal]

    if meal && meal == '栄養不足の食事'
      decrease_hp(2.0)
    else
      increase_hp(1.0)
    end
  end

  # 睡眠によるHP調整
  def adjust_for_sleep(detail)
    sleep_hours = detail[:sleep_hours] || 0

    if sleep_hours >= 7
      increase_hp(3.0)
    elsif sleep_hours >= 5
      increase_hp(1.0)
    else
      decrease_hp(2.0)
    end
  end

  # 運動によるHP調整
  def adjust_for_exercise(detail)
    exercise_type = detail[:exercise_type]

    if exercise_type && exercise_type == '激しい運動'
      decrease_hp(3.0)
    else
      decrease_hp(1.0)
    end
  end

  # HPを増やす
  def increase_hp(amount)
    @character.health_points += amount
  end

  # HPを減らす
  def decrease_hp(amount)
    @character.health_points -= amount
>>>>>>> origin/front/develop
  end
end