class CharacterLifespanService
  DEFAULT_ADJUSTMENT = 0.5

  def initialize(character)
    @character = character
  end

  # 行動に応じて寿命を増減させるメソッド
  def adjust_lifespan(action_type, detail = {})
    case action_type
    when '食事'
      adjust_for_meal(detail)
    when '睡眠'
      adjust_for_sleep(detail)
    when '運動'
      adjust_for_exercise(detail)
    else
      # デフォルトの減少量
      decrease_lifespan(DEFAULT_ADJUSTMENT)
    end

    # 寿命の変更を保存
    @character.save
  end

  private

  # 食事による寿命調整
  def adjust_for_meal(detail)
    # # detail[:meal]に食べた食事の情報が入ると想定
    # meal = detail[:meal]

    # # 仮のロジック（例えば栄養価が高い食事は寿命を増やす）
    # if meal && meal == 'ヘルシーな食事'
    #   increase_lifespan(0.2)
    # else
    #   decrease_lifespan(0.1)
    # end
    increase_lifespan(0.2)
  end

  # 睡眠による寿命調整
  def adjust_for_sleep(detail)
    sleep_hours = detail[:sleep_hours] || 0

    if sleep_hours >= 7
      increase_lifespan(0.3)
    elsif sleep_hours >= 5
      decrease_lifespan(0.1)
    else
      decrease_lifespan(0.3)
    end
  end

  # 運動による寿命調整
  def adjust_for_exercise(detail)
    # exercise_type = detail[:exercise_type]

    # # 仮のロジック（運動が適度なら寿命を増やす）
    # if exercise_type && exercise_type == '適度な運動'
    #   increase_lifespan(0.2)
    # else
    #   decrease_lifespan(0.1)
    # end
    increase_lifespan(0.2)
  end

  # 寿命を増やす
  def increase_lifespan(amount)
    @character.lifespan += amount
  end

  # 寿命を減らす
  def decrease_lifespan(amount)
    @character.lifespan -= amount
  end
end