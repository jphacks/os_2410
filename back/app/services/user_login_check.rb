
require 'date'

# ユーザーがその日初めてログインしたかどうかを判定する
def check_first_login(user)
  # ユーザーが最後にログインした日付を取得
  login_date = user.last_login

  # ユーザーがログインした日付が今日の日付と一致するかどうかを判定
  if login_date == Date.today
    # 一致する場合はfalseを返す
    user.update(last_login: Date.today)
    return false
  else
    # 一致しない場合はtrueを返す
    user.update(last_login: Date.today)
    return true
  end
end
