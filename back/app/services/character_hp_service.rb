class CharacterHpService
  require_relative 'enums/diff_hp'

  def initialize(character)
    @character = character
  end

  # 行動に応じてHPを増減させるメソッド
  def update_hp(action_type, level)
    diffhp = DiffHp.new
    hp_change = diffhp.status_change(action_type, level)
    hp = @character.health_points + hp_change
    if hp >= 15
      @character.update(health_points: 15)
    else
      @character.update(health_points: hp)
    end
  end
end 
