<<<<<<< HEAD
import { useCharacter } from '../contexts/CharacterContext';

export function ActionButtons() {
  const { performAction, isLoading } = useCharacter();

  const actions = [
    { type: '食事' as const, detail: '食事をとる', icon: '🍖' },
    { type: '睡眠' as const, detail: '睡眠をとる', icon: '😴' },
    { type: '運動' as const, detail: '運動をする', icon: '🏃' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">アクション</h2>
      <div className="grid gap-4">
        {actions.map(action => (
          <button
            key={action.type}
            onClick={() => performAction(action.type, action.detail)}
            disabled={isLoading}
            className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex items-center gap-2"
          >
            <span className="text-xl">{action.icon}</span>
            <span>{action.detail}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
=======
import { GameAction } from '../constants/actions';

interface ActionButtonProps {
  action: GameAction;
  onClick: (action: GameAction) => void;
}

export function ActionButton({ action, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={() => onClick(action)}
      className="relative w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full bg-white text-white flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110"
    >
      <span className="text-3xl md:text-5xl lg:text-7xl">{action.icon}</span>
    </button>
  );
}
>>>>>>> origin/front/develop
