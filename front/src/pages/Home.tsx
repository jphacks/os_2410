import { Navigate } from 'react-router-dom';
import { useCharacter } from '../contexts/CharacterContext';
import { useEffect, useState } from 'react';
import { ActionButton } from '../components/ActionButton';
import { GAME_ACTIONS, GameAction } from '../constants/actions';
import clsx from 'clsx'; // クラス名の条件付き結合のために使用

export function Home() {
  const { currentCharacter, fetchUserCharacters, performAction } =
    useCharacter();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState<
    (typeof actions)[0] | null
  >(null);
  const userId = 1; // 実際の実装では認証から取得

  // 位置ごとにアクションをグループ化する関数
  const getActionsByPosition = (position: GameAction['position']) => {
    return GAME_ACTIONS.filter((action) => action.position === position).sort(
      (a, b) => (a.order || 0) - (b.order || 0),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserCharacters(userId);
      } catch (error) {
        console.error('Failed to fetch characters: ', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchData();
  }, [userId, fetchUserCharacters]);

  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  if (!currentCharacter) {
    return <Navigate to="/create" replace />;
  }

  const handleActionSelect = (action: (typeof actions)[0]) => {
    setSelectedAction(action);
  };

  const handleActionDetailSelect = async (detail: string) => {
    if (selectedAction) {
      try {
        await performAction(selectedAction.type, detail);
      } catch (error) {
        console.error('Action failed:', error);
      } finally {
        setSelectedAction(null); // モーダルを閉じる
      }
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-blue-400" />

      <div className="relative h-full flex flex-col">
        {/* ステータス表示（右上） - 変更なし */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">HP</span>
                <span className="text-sm">
                  {currentCharacter.health_points}/10
                </span>
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${(currentCharacter.health_points / 10) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">寿命</span>
              <span className="text-sm">{currentCharacter.lifespan}年</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">年齢</span>
              <span className="text-sm">{currentCharacter.age}歳</span>
            </div>
          </div>
        </div>

        {/* 上部のアクション */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          {getActionsByPosition('top').map((action) => (
            <ActionButton
              key={action.type}
              action={action}
              onClick={handleActionSelect}
            />
          ))}
        </div>

        {/* 左側のアクション */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
          {getActionsByPosition('left').map((action) => (
            <ActionButton
              key={action.type}
              action={action}
              onClick={handleActionSelect}
            />
          ))}
        </div>

        {/* 右側のアクション */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
          {getActionsByPosition('right').map((action) => (
            <ActionButton
              key={action.type}
              action={action}
              onClick={handleActionSelect}
            />
          ))}
        </div>

        {/* 中央のアクション */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
          {getActionsByPosition('center').map((action) => (
            <ActionButton
              key={action.type}
              action={action}
              onClick={handleActionSelect}
            />
          ))}
        </div>

        {/* 下部のアクション */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          {getActionsByPosition('bottom').map((action) => (
            <ActionButton
              key={action.type}
              action={action}
              onClick={handleActionSelect}
            />
          ))}
        </div>

        {/* モーダル */}
        {selectedAction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">
                {selectedAction.type}の詳細を選択
              </h3>
              <div className="space-y-2">
                {selectedAction.details.map((detail) => (
                  <button
                    key={detail.value}
                    onClick={() => handleActionDetailSelect(detail.value)}
                    className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {detail.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelectedAction(null)}
                className="mt-4 w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        {/* キャラクター表示エリア - 変更なし */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
            キャラクター
          </div>
        </div>

        {/* モーダル */}
        {selectedAction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">
                {selectedAction.type}の詳細を選択
              </h3>
              <div className="space-y-2">
                {selectedAction.details.map((detail) => (
                  <button
                    key={detail.value}
                    onClick={() => handleActionDetailSelect(detail.value)}
                    className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {detail.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelectedAction(null)}
                className="mt-4 w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        id="effects-container"
      />
    </div>
  );
}
