class CharacterLifespanService
  require_relative 'enums/diff_lifespan'

  def initialize(character)
    @character = character
  end

  # 行動に応じて寿命を増減させるメソッド
  def update_lifespan(action_type, level, character_status,action_log)
    diff_lifespan = DifflLifespan.new
    lifespan_change = diff_lifespan.status_change(action_type, level, character_status)
    @character.update(lifespan: @character.lifespan + lifespan_change)
    action_log.lifespan_movement = lifespan_change
    action_log.save
  end
end