class CharacterLifespanService
  require_relative 'path/to/diff_lifespan'

  def initialize(character)
    @character = character
  end

  # 行動に応じて寿命を増減させるメソッド
  def update_lifespan(action_type, level, character_status, action_log)
    lifespan_change = @character.status_change(action_type, level, character_status)
    @character.update(lifespan: @character.lifespan + lifespan_change)
    action_log = lifespan_change
    save
  end
end