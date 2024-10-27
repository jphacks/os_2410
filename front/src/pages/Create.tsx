import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCharacter } from '../contexts/CharacterContext';
import { useAuth } from '../contexts/AuthContext';

export function Create() {
  console.log("/create");
  const [characterName, setCharacterName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createCharacter, error, currentCharacter } = useCharacter();
  const navigate = useNavigate();
  const { userInfo, token } = useAuth();
  const userId = userInfo?.id;

  console.log("userInfo: ", userInfo);


  if (!userId) {
    console.log("userIdがないため/sign-inにリダイレクト");
    return <Navigate to="/" replace />;
  }


  // すでにキャラクターが存在する場合はホームにリダイレクト
  if (currentCharacter) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!characterName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createCharacter(userId, characterName.trim());
      navigate('/');
    } catch (err) {
      // エラーハンドリングはContextで行われるため、ここでは追加の処理は不要
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-6">新しいキャラクターを作成</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="characterName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              キャラクター名
            </label>
            <input
              type="text"
              id="characterName"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
              placeholder="キャラクターの名前を入力"
              maxLength={20}
              required
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="text-sm text-gray-500">
            <h3 className="font-medium mb-2">初期ステータス:</h3>
            <ul className="space-y-1">
              <li>• HP: 100</li>
              <li>• 寿命: 100年</li>
              <li>• 年齢: 20歳</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={!characterName.trim() || isSubmitting}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? '作成中...' : 'キャラクターを作成'}
          </button>
        </form>
      </div>
    </div>
  );
}
