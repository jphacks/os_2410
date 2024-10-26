class Character < ApplicationRecord
  enum action_type: {
    sleep: 0,
    meal: 1,
    exercise: 2,
    smoking: 3,
    drinking: 4,
    energy_drink: 5
  }

  # ステータスの変化量を計算するメソッド
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
    when 0 then -3
    when 1 then -2
    when 2 then 0
    when 3 then 2
    else 0
    end
  end

  def meal_change(level)
    case level
    when 0 then -1
    when 1 then -0.5
    when 2 then 0.5
    else 0
    end
  end

  def exercise_change(level)
    case level
    when 0 then 0
    when 1 then 0.5
    when 2 then 1
    when 3 then 2
    else 0
    end
  end

  def smoking_change(level)
    case level
    when 0 then 0
    when 1 then -0.3
    else 0
    end
  end

  def drinking_change(level)
    case level
    when 0 then 0
    when 1 then -1
    when 2 then -3
    else 0
    end
  end

  def energy_drink_change(level)
    case level
    when 0 then 0
    when 1 then 2
    else 0
    end
  end
end