
require 'date'

def check_first_login(user)
    day = Date.today

    if user.last_sign_in_at.nil?
        user.last_login = day
        user.save
        return true
    else
    end
end
