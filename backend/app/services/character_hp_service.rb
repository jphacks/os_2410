class CharacterHpService
  DEFAULT_ADJUSTMENT = 1.0

  def initialize(character)
    @character = character
  end

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
  end
end