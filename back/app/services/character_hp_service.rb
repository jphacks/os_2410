class CharacterHpService
  require_relative 'path/to/diff_hp'

  def initialize(character)
    @character = character
  end

  # 行動に応じてHPを増減させるメソッド
  def update_hp(action_type, level, action_log)
    hp_change = @character.status_change(action_type, level)
    @character.update(health_points: @character.health_points + hp_change)
    action_log = hp_change
    save
  end
end