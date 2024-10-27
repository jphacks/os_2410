class DiffHp

  # HPの変化量を計算するメソッド
  def status_change(action_type, level)
    case action_type
    when '睡眠'
      sleep_change(level)
    when '朝食'
      meal_change(level)
    when '昼食'
      meal_change(level)
    when '夕食'
      meal_change(level)
    when '軽食'
      meal_change(level)
    when '食事'
      meal_change(level)
    when '運動'
      exercise_change(level)
    when 'タバコ'
      smoking_change(level)
    when 'お酒'
      drinking_change(level)
    when 'エナドリ'
      energy_drink_change(level)
    else
      0
    end
  end

  private
  # 各行動に対する変化量を定義
  def sleep_change(level)
    case level
    when "sleep_0to3" then -3 # 0-3h未満
    when "sleep_3to5" then -2 # 3-5h未満
    when "sleep_5to7" then 0.0 # 5-7h未満
    when "sleep_7plus" then 2 # 7h以上
    else 0.0
    end
  end

  def meal_change(level)
    case level
    when "meal_none" then -1
    when "meal_unhealthy" then -0.5
    when "meal_healthy" then 0.5
    else 0.0
    end
  end

  def exercise_change(level)
    case level
    when "exercise_none" then -0.0
    when "exercise_light" then -0.5
    when "exercise_moderate" then -1
    when "exercise_intense" then -2
    else 0.0
    end
  end

  def smoking_change(level)
    case level
    when "smoke_none" then 0.0
    when "smoke_yes" then -0.3
    else 0.0
    end
  end

  def drinking_change(level)
    case level
    when "alcohol_none" then 0.0
    when "alcohol_moderate" then -1
    when "alcohol_excessive" then -3
    else 0.0
    end
  end

  def energy_drink_change(level)
    case level
    when "energy_none" then 0.0
    when "energy_consumed" then 2
    else 0.0
    end
  end
end