class CharacterHpService
  require_relative 'enums/diff_hp'

  def initialize(character)
    @character = character
  end

  # 行動に応じてHPを増減させるメソッド
  def update_hp(action_type, level)
    diffhp = DiffHp.new
    hp_change = diffhp.status_change(action_type, level)
    @character.update(health_points: @character.health_points + hp_change)
    action_log = hp_change
    save
  end
end