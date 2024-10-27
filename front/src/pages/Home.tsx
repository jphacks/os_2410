import { Navigate } from 'react-router-dom';
import { useCharacter } from '../contexts/CharacterContext';
import { useEffect, useState } from 'react';
import { ActionButton } from '../components/ActionButton';
import { ActionType, GAME_ACTIONS, GameAction } from '../constants/actions';
import CharacterImages from '../components/CharacterImages';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
  const { currentCharacter, fetchUserCharacters, performAction } = useCharacter();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState<GameAction | null>(null);
  const { userInfo, token } = useAuth();
  const userId = userInfo?.id;



  if (!userId) {
    return <Navigate to="/sign-in" replace />;
  }

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
    console.log("カレントキャラクターがないため、/createにリダイレクト");
    return <Navigate to="/create" replace />;
  }

  const handleActionSelect = (action: GameAction) => {
    setSelectedAction(action);
  };

  const handleActionDetailSelect = async (detail: { value: string }) => {
    if (selectedAction) {
      try {
        await performAction(selectedAction, detail);
      } catch (error) {
        console.error('Action failed:', error);
      } finally {
        setSelectedAction(null); // モーダルを閉じる
      }
    }
  };

  console.log("home, currentCharacter: ", currentCharacter);

  return (
    <div className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('/src/assets/images/background.png')]">
      <div className="absolute inset-0" />

      <div className="relative h-full flex flex-col">
        {/* ステータス表示（右上） */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">HP</span>
                <span className="text-sm">
                  {currentCharacter.health_points}/15
                </span>
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${(currentCharacter.health_points / 15) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">寿命</span>
              <span className="text-sm">{Math.floor(currentCharacter.lifespan)}年</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">年齢</span>
              <span className="text-sm">{currentCharacter.age}歳</span>
            </div>
          </div>
        </div>

        {/* 行動一覧 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          {GAME_ACTIONS.map((action) => (
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
                    onClick={() => handleActionDetailSelect(detail)}
                    className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="font-medium">{detail.label}</div>
                    <div className="text-sm text-gray-600">
                      {detail.description}
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

        {/* キャラクター表示エリア */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center"
            id="myImage"
          >
            <CharacterImages character={currentCharacter} />
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        id="effects-container"
      />
    </div>
  );
}