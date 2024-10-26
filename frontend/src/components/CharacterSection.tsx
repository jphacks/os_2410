import { useCharacter } from "../contexts/CharacterContext";

// Character Section
export function CharacterSection() {
  const { currentCharacter } = useCharacter();

  if (!currentCharacter) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">キャラクター情報</h2>
        <div className="text-gray-500">
          キャラクターが存在しません。新しく作成してください。
        </div>
      </div>
    );
  }

  // ステータスバーのスタイルを計算する関数
  const getStatusBarStyle = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    const getColor = () => {
      if (percentage > 66) return 'bg-green-500';
      if (percentage > 33) return 'bg-yellow-500';
      return 'bg-red-500';
    };
    return `${getColor()} h-2 rounded-full transition-all duration-300`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">キャラクター情報</h2>
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
          最終更新: {new Date(currentCharacter.last_updated).toLocaleString()}
        </span>
      </div>

      <div className="grid gap-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">{currentCharacter.character_name}</span>
            <span>Lv. {Math.floor(currentCharacter.age / 5) + 1}</span>
          </div>
          
          {/* HP */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>HP</span>
              <span>{currentCharacter.health_points}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={getStatusBarStyle(currentCharacter.health_points, 10)}
                style={{ width: `${(currentCharacter.health_points / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Age & Lifespan */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-sm text-gray-500">年齢</div>
              <div className="text-lg font-medium">{currentCharacter.age}歳</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">寿命</div>
              <div className="text-lg font-medium">{currentCharacter.lifespan}年</div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="pt-4 border-t">
          <div className="text-sm text-gray-500 mb-2">ステータス</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded">
              体力: {currentCharacter.health_points}
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded">
              状態: {currentCharacter.status === 1 ? '健康' : '不調'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}