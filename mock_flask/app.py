from flask import Flask, jsonify, request
import datetime
from flask_cors import CORS
from character_manage import check_dead
app = Flask(__name__)
CORS(app)

# モックデータ
users = [
    {
        "user_id": 1,
        "username": "JohnDoe",
        "email": "john@example.com",
        "password": "hashed_password",  # 実際にはハッシュ化されたパスワード
        "created_at": "2024-01-01T12:00:00",
        "last_login": "2024-10-24T15:30:00"
    }
]

characters = [
    {
        "id": 1,
        "user_id": 1,
        "name": "Hero",
        "age": 5,
        "lifespan": 10,
        "health_points": 10,
        "status": 1,
        "last_updated": "2024-10-24T15:30:00"
        , "created_at": "2024-10-24T15:30:00"
    },
    {
        "character_id": 2,
        "user_id": 1,
        "character_name": "Villain",
        "age": 3,
        "lifespan": 20,
        "health_points": 10,
        "status": 1,
        "last_updated": "2024-10-23T15:30:00"
        , "created_at": "2024-10-23T15:30:00"
    }
]

actions = [ # 行動を送ったらHP、寿命とか更新される
    {
        "log_id": 1,
        "user_id": 1,
        "character_id": 1,
        "action_type": "食事", # 朝食 or 昼食 or 夕食 or 運動 or 運動
        "detail": "朝食", # string 睡眠のとき：睡眠時間、食事の時：ちゃんと取ったか or 不健康な食事 or 軽い食事 or 食べてない、運動：軽い運動 or 適度な運動 or 激しい運動
        "created_at": "2024-10-24T13:00:00"
    }
]

# Google OAuth認証エンドポイント
@app.route('/auth/google/callback', methods=['POST'])
def google_callback():
    # 実際にはGoogle OAuthの処理を行うが、ここではモックレスポンスを返す
    return jsonify({
        "access_token": "mock_access_token",
        "user": {
            "user_id": 1,
            "username": "JohnDoe",
            "email": "john@example.com"
        }
    })

# ユーザー情報取得
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((user for user in users if user["user_id"] == user_id), None)
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

# ユーザーの行動履歴取得
@app.route('/users/<int:user_id>/action', methods=['GET'])
def get_user_actions(user_id):
    user_actions = [action for action in actions if action["user_id"] == user_id]
    return jsonify(user_actions)

# ユーザー削除
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global users
    users = [user for user in users if user["user_id"] != user_id]
    return jsonify({"message": "User deleted"}), 200

# ユーザーIDからキャラクター一覧取得
@app.route('/users/<int:user_id>/characters', methods=['GET'])
def get_user_characters(user_id):
    user_characters = [char for char in characters if char["user_id"] == user_id]
    return jsonify(user_characters)

# キャラクター作成
@app.route('/characters', methods=['POST'])
def create_character():
    data = request.json
    new_character = {
        "character_id": len(characters) + 1,
        "user_id": data["user_id"],
        "character_name": data["character_name"],
        "age": 0,
        "lifespan": 10,
        "health_points": 10,
        "status": 1,
        "last_updated": datetime.datetime.now()
        , "created_at": datetime.datetime.now()
    }
    characters.append(new_character)
    return jsonify(new_character), 201

# キャラクター詳細取得
@app.route('/characters/<int:character_id>', methods=['GET'])
def get_character(character_id):
    character = next((char for char in characters if char["character_id"] == character_id), None)
    # 死亡判定を行う
    user = next((user for user in users if user["user_id"] == character["user_id"]), None)
    # XXX ここうまくいくかわからん
    last_login = datetime.datetime.strptime(user["last_login"], "%Y-%m-%d")
    if character:
        if datetime.date.today() != last_login.date():
            check_dead(character=character, user=user)
        return jsonify(character)

    if character:
        return jsonify(character)
    return jsonify({"error": "Character not found"}), 404

# キャラクター更新
@app.route('/characters/<int:character_id>', methods=['PUT'])
def update_character(character_id):
    data = request.json
    character = next((char for char in characters if char["character_id"] == character_id), None)
    if character:
        character.update(data)
        character["last_updated"] = datetime.datetime.now()
        return jsonify(character)
    return jsonify({"error": "Character not found"}), 404

# キャラクター死亡
@app.route('/characters/<int:character_id>/dead', methods=['PUT'])
def dead_character(character_id):
    character = next((char for char in characters if char["character_id"] == character_id), None)
    if character:
        character["status"] = 0
        return jsonify(character)
    return jsonify({"error": "Character not found"}), 404

# キャラクター削除
@app.route('/characters/<int:character_id>', methods=['DELETE'])
def delete_character(character_id):
    global characters
    characters = [char for char in characters if char["character_id"] != character_id]
    return jsonify({"message": "Character deleted"}), 200

def update_character_status(character, action_type, detail):
    """
    行動タイプと詳細に基づいてキャラクターのステータスを更新する
    """
    if action_type == "食事":
        if detail == "ちゃんと取った":
            character["health_points"] = min(character["health_points"] + 2, 10)
        elif detail == "不健康な食事":
            character["health_points"] = max(character["health_points"] - 1, 0)
        elif detail == "軽い食事":
            character["health_points"] = min(character["health_points"] + 1, 10)
        elif detail == "食べてない":
            character["health_points"] = max(character["health_points"] - 2, 0)
    
    elif action_type == "運動":
        if detail == "軽い運動":
            character["health_points"] = min(character["health_points"] + 1, 10)
        elif detail == "適度な運動":
            character["health_points"] = min(character["health_points"] + 2, 10)
        elif detail == "激しい運動":
            character["health_points"] = max(character["health_points"] - 1, 0)
            character["lifespan"] = max(character["lifespan"] - 1, 0)
    
    elif action_type == "睡眠":
        sleep_hours = float(detail)
        if 7 <= sleep_hours <= 9:
            character["health_points"] = min(character["health_points"] + 2, 10)
        elif sleep_hours < 6 or sleep_hours > 10:
            character["health_points"] = max(character["health_points"] - 1, 0)
    
    # キャラクターの最終更新時刻を更新
    character["last_updated"] = datetime.datetime.now().isoformat()
    
    # HPが0になった場合、statusを0（死亡）に設定
    if character["health_points"] == 0:
        character["status"] = 0


# 行動ログ作成（更新）
@app.route('/actions/create', methods=['POST'])
def create_action():
    data = request.json
    character_id = data["character_id"]
    
    # キャラクターを取得
    character = next((char for char in characters if char["character_id"] == character_id), None)
    if not character:
        return jsonify({"error": "Character not found"}), 404
    
    # キャラクターが死亡している場合は行動を記録しない
    if character["status"] == 0:
        return jsonify({"error": "Character is dead"}), 400
    
    # 新しい行動を記録
    new_action = {
        "log_id": len(actions) + 1,
        "user_id": data["user_id"],
        "character_id": character_id,
        "action_type": data["action_type"],
        "detail": data.get("detail", ""),
        "created_at": datetime.datetime.now().isoformat()
    }
    actions.append(new_action)
    
    # キャラクターのステータスを更新
    update_character_status(character, data["action_type"], data.get("detail", ""))

    print(characters[0])
    
    return jsonify({
        "action": new_action,
        "character": character
    }), 201

# キャラクターの行動履歴取得
@app.route('/characters/<int:character_id>/actions', methods=['GET'])
def get_character_actions(character_id):
    character_actions = [action for action in actions if action["character_id"] == character_id]
    return jsonify(character_actions)

# ゲーム設定取得
@app.route('/settings', methods=['GET'])
def get_settings():
    # ゲームの設定情報をモックとして返す
    return jsonify({
        "lifespan_rule": "初期寿命は100年です",
        "action_effects": {
            "食事": "+1寿命",
            "睡眠": "+2寿命"
        }
    })

# ゲーム設定更新
@app.route('/settings', methods=['PUT'])
def update_settings():
    data = request.json
    # モックとして更新内容を返す
    return jsonify({"message": "Settings updated", "new_settings": data}), 200

if __name__ == '__main__':
    app.run(debug=True)