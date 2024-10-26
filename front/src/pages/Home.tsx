import { Navigate } from 'react-router-dom';
import { useCharacter } from '../contexts/CharacterContext';
import { useEffect, useState } from 'react';
<<<<<<< HEAD

export function Home() {
  const { currentCharacter, fetchUserCharacters, performAction } = useCharacter();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const userId = 1; // 実際の実装では認証から取得

  console.log("currentCharacter: ", currentCharacter);

=======
import { ActionButton } from '../components/ActionButton';
import { ActionDetail, GAME_ACTIONS, GameAction } from '../constants/actions';
import CharacterImages from '../components/CharacterImages';

export function Home() {
  const { currentCharacter, fetchUserCharacters, performAction } =
    useCharacter();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState<
    (typeof actions)[0] | null
  >(null);
  const userId = 1; // 実際の実装では認証から取得

>>>>>>> origin/front/develop
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserCharacters(userId);
      } catch (error) {
<<<<<<< HEAD
        console.error("Failed to fetch characters: ", error);
      } finally {
        setIsInitialLoading(false);
      }
    }
=======
        console.error('Failed to fetch characters: ', error);
      } finally {
        setIsInitialLoading(false);
      }
    };
>>>>>>> origin/front/develop

    fetchData();
  }, [userId, fetchUserCharacters]);

<<<<<<< HEAD
 

=======
>>>>>>> origin/front/develop
  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

<<<<<<< HEAD
  const actions = [
    { type: '食事' as const, icon: '🍖', description: 'HPが回復し、寿命が延びます' },
    { type: '睡眠' as const, icon: '😴', description: 'HPが大きく回復し、寿命が延びます' },
    { type: '運動' as const, icon: '🏃', description: 'HPが回復しますが、寿命が減ります' },
  ];

=======
>>>>>>> origin/front/develop
  if (!currentCharacter) {
    return <Navigate to="/create" replace />;
  }

<<<<<<< HEAD
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
=======
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
    <div className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('/src/assets/images/background.png')]">
      <div className="absolute inset-0"  />

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
>>>>>>> origin/front/develop
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
<<<<<<< HEAD
                  style={{ width: `${(currentCharacter.health_points / 10) * 100}%` }}
=======
                  style={{
                    width: `${(currentCharacter.health_points / 10) * 100}%`,
                  }}
>>>>>>> origin/front/develop
                />
              </div>
            </div>

<<<<<<< HEAD
            {/* 寿命 */}
=======
>>>>>>> origin/front/develop
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">寿命</span>
              <span className="text-sm">{currentCharacter.lifespan}年</span>
            </div>

<<<<<<< HEAD
            {/* 年齢 */}
=======
>>>>>>> origin/front/develop
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">年齢</span>
              <span className="text-sm">{currentCharacter.age}歳</span>
            </div>
          </div>
        </div>

<<<<<<< HEAD
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
=======
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          {GAME_ACTIONS.map((action) => (
            <ActionButton key={action.type} action={action} onClick={handleActionSelect} />
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
                {selectedAction.details.map((detail: ActionDetail) => (
                  <button
                    key={detail.value}
                    onClick={() => handleActionDetailSelect(detail.value)}
                    className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex justify-between space-x-2">
                      <p>{detail.label}</p>
                      <p className="text-slate-500 text-xs self-end justify-self-end">
                        {detail.description}
                      </p>
                    </div>
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
        {/* // キャラクター表示エリアで画像を差し替える */}
        <div className="flex-1 flex items-center justify-center">
          {/* モックキャラクター */}
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center"
            id="myImage"
          >
            <CharacterImages character={currentCharacter} />
          </div>
>>>>>>> origin/front/develop
        </div>
      </div>

      {/* アニメーションエフェクト用のコンテナ（オプション） */}
<<<<<<< HEAD
      <div className="pointer-events-none absolute inset-0" id="effects-container" />
    </div>
  );
}
=======
      <div
        className="pointer-events-none absolute inset-0"
        id="effects-container"
      />
    </div>
  );
}
>>>>>>> origin/front/develop
