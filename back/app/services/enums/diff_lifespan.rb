class DifflLifespan
  
  # 寿命の変化量を返す
  def status_change(action_type, level, character_status)
    case action_type
    when '睡眠'
      calculate_change_status(sleep_change(level), character_status)
    when '朝食'
      calculate_change_status(meal_change(level), character_status)
    when '昼食'
      calculate_change_status(meal_change(level), character_status)
    when '夕食'
      calculate_change_status(meal_change(level), character_status)
    when '軽食'
      calculate_change_status(meal_change(level), character_status)
    when '食事'
      calculate_change_status(meal_change(level), character_status)
    when '運動'
      calculate_change_status(exercise_change(level), character_status)
    when 'タバコ'
      calculate_change_status(smoking_change(level), character_status)
    when 'お酒'
      calculate_change_status(drinking_change(level), character_status)
    when 'エナドリ'
      calculate_change_status(energy_drink_change(level), character_status)
    else
      0.0
    end
  end

  private
  # ステータスの変化量を計算するメソッド
  def calculate_change_status(change_status, character_status)
    # render json:{"change_status ":change_status }
    return change_status * percentage_change_in_life_expectancy(change_status, character_status)
  end

  # キャラクターの状態によって寿命の増減率を返す
  def percentage_change_in_life_expectancy(value, character_status)
    if character_status == 1 # 幼少期の場合
      if value > 0
        return 0.75
      else
        return 1.5
      end
    elsif character_status == 2 # 青年期の場合
      return 1
    elsif character_status == 3 # 壮年期の場合
      if value > 0
        return 0.0
      else
        return 2
      end
    else
      0.0
    end
  end

  # 各行動に対する変化量を定義
  def sleep_change(level)

    case level
    when "sleep_0to3" then -0.67 # 0-3h未満
    when "sleep_3to5" then -0.5 # 3-5h未満
    when "sleep_5to7" then 0.0 # 5-7h未満
    when "sleep_7plus" then 0.5 # 7h以上
    else 0.0
    end
  end

  def meal_change(level)
    case level
    when "meal_none" then -0.23 # 食べていない
    when "meal_unhealthy" then -0.167 # 不健康な食事
    when "meal_healthy" then 0.167 # ちゃんとした食事
    else 0.0
    end
  end

  def exercise_change(level)
    case level
    when "exercise_none" then -0.23 # 何もしない
    when "exercise_light" then 0.167 # 軽い運動
    when "exercise_moderate" then 0.67 # 適度な運動
    when "exercise_intense" then 1 # 激しい運動
    else 0.0
    end
  end

  def smoking_change(level)
    case level
    when "smoke_none" then 0.0 # 吸っていない
    when "smoke_yes" then -0.167 # 吸った
    else 0.0
    end
  end

  def drinking_change(level)
    case level
    when "alcohol_none" then 0.0 # 飲んでいない
    when "alcohol_moderate" then -0.167 # 適度に飲んだ
    when "alcohol_excessive" then -0.5 # 飲みすぎた
    else 0.0
    end
  end

  def energy_drink_change(level)
    case level
    when "energy_none" then 0.0 # 飲んでいない
    when "energy_consumed" then 0.5 # 飲んだ
    else 0.0
    end
  end
end