import datetime


def check_dead(character,user):
    # キャラクターの寿命と作成日を比較して、死亡しているか判定する
    created_at = datetime.datetime.fromisoformat(character["created_at"])
    lifespan = character["lifespan"]
    if datetime.datetime.now() > created_at + datetime.timedelta(days=lifespan):
        character["status"] = 0
        character["last_updated"] = datetime.datetime.now().isoformat()
        return True
    return False