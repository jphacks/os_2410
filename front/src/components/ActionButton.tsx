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
