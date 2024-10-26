import { GameAction } from '../constants/actions';

interface ActionButtonProps {
  action: GameAction;
  onClick: (action: GameAction) => void;
}

export function ActionButton({ action, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={() => onClick(action)}
      className="flex flex-col items-center p-3 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
    >
      <span className="text-2xl mb-1">{action.icon}</span>
      <span className="text-sm font-medium">{action.type}</span>
      <span className="text-xs text-gray-500 text-center mt-1">
        {action.description}
      </span>
    </button>
  );
}
