import { useCharacter } from '../contexts/CharacterContext';

export function CharacterStatus() {
  const { currentCharacter } = useCharacter();

  if (!currentCharacter) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">{currentCharacter.character_name}</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span>HP:</span>
            <span>{currentCharacter.health_points}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${(currentCharacter.health_points / 10) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <span>寿命:</span>
          <span>{currentCharacter.lifespan}年</span>
        </div>
        <div className="flex justify-between">
          <span>年齢:</span>
          <span>{currentCharacter.age}歳</span>
        </div>
      </div>
    </div>
  );
}