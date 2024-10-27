import { useEffect, useState } from 'react';
import { useCharacter } from '../contexts/CharacterContext';

export function ActionHistorySection() {
  const { currentCharacter } = useCharacter();
  const [actions, setActions] = useState<
    Array<{
      log_id: number;
      action_type: string;
      detail: string;
      action_time: string;
    }>
  >([]);

  console.log("currentCharacter: ",currentCharacter?.character_name);

  useEffect(() => {
    const fetchActions = async () => {
      if (!currentCharacter) return;

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/characters/${currentCharacter.character_id}/actions`,
        );
        if (!response.ok) throw new Error('行動履歴の取得に失敗しました');

        const data = await response.json();
        setActions(data);
      } catch (error) {
        console.error('Failed to fetch actions:', error);
      }
    };

    // fetchActions();
  }, [currentCharacter]);

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case '食事':
        return '🍖';
      case '睡眠':
        return '😴';
      case '運動':
        return '🏃';
      default:
        return '📝';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">行動履歴</h2>
      {actions.length === 0 ? (
        <div className="text-gray-500">行動履歴がありません</div>
      ) : (
        <div className="divide-y">
          {actions.map((action) => (
            <div
              key={action.log_id}
              className="py-4 flex items-center space-x-4"
            >
              <div className="text-2xl">
                {getActionIcon(action.action_type)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{action.detail}</div>
                <div className="text-sm text-gray-500">
                  {new Date(action.action_time).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
