import { Navigate } from 'react-router-dom';
import { useCharacter } from '../contexts/CharacterContext';
import { useEffect, useState } from 'react';

export function Home() {
  const { currentCharacter, fetchUserCharacters, performAction } = useCharacter();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const userId = 1; // 実際の実装では認証から取得

  console.log("currentCharacter: ", currentCharacter);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserCharacters(userId);
      } catch (error) {
        console.error("Failed to fetch characters: ", error);
      } finally {
        setIsInitialLoading(false);
      }
    }

    fetchData();
  }, [userId, fetchUserCharacters]);

 

  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  const actions = [
    { type: '食事' as const, icon: '🍖', description: 'HPが回復し、寿命が延びます' },
    { type: '睡眠' as const, icon: '😴', description: 'HPが大きく回復し、寿命が延びます' },
    { type: '運動' as const, icon: '🏃', description: 'HPが回復しますが、寿命が減ります' },
  ];

  if (!currentCharacter) {
    return <Navigate to="/create" replace />;
  }

  return (
    // 画面全体のコンテナ
    <div className="absolute inset-0 bg-gray-100">
      {/* 背景画像（仮） */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-blue-400" />

      {/* メインコンテンツ */}
      <div className="relative h-full flex flex-col">
        {/* ステータス表示（右上） */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <div className="space-y-3">
            {/* HP */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">HP</span>
                <span className="text-sm">{currentCharacter.health_points}/10</span>
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${(currentCharacter.health_points / 10) * 100}%` }}
                />
              </div>
            </div>

            {/* 寿命 */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">寿命</span>
              <span className="text-sm">{currentCharacter.lifespan}年</span>
            </div>

            {/* 年齢 */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">年齢</span>
              <span className="text-sm">{currentCharacter.age}歳</span>
            </div>
          </div>
        </div>

        {/* キャラクター表示エリア（中央） */}
        <div className="flex-1 flex items-center justify-center">
          {/* モックキャラクター */}
          <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
            キャラクター
          </div>
        </div>

        {/* アクションボタン（下部） */}
        <div className="p-4">
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
            <div className="grid grid-cols-3 gap-3">
              {actions.map(action => (
                <button
                  key={action.type}
                  onClick={() => performAction(action.type)}
                  className="flex flex-col items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl mb-1">{action.icon}</span>
                  <span className="text-sm font-medium">{action.type}</span>
                  <span className="text-xs text-gray-500 text-center mt-1">
                    {action.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* アニメーションエフェクト用のコンテナ（オプション） */}
      <div className="pointer-events-none absolute inset-0" id="effects-container" />
    </div>
  );
}