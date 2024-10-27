class CharacterLifespanService
  require_relative 'enums/diff_lifespan'

  def initialize(character)
    @character = character
  end

  # 行動に応じて寿命を増減させるメソッド
  def update_lifespan(action_type, level, character_status)
    diff_lifespan = DifflLifespan.new
    lifespan_change = diff_lifespan.status_change(action_type, level, character_status)
    @character.update(lifespan: @character.lifespan + lifespan_change)
  end
end