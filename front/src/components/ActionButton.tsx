import { GameAction } from '../constants/actions';

interface ActionButtonProps {
  action: GameAction;
  onClick: (action: GameAction) => void;
}

export function ActionButton({ action, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={() => onClick(action)}
      className="relative w-32 md:w-40 lg:w-56 h-24 md:h-32 lg:h-40 transition-all duration-300 ease-in-out"
    >
      <img
        src={action.imagePath}
        alt={`${action.type}のアイコン`}
        className="absolute inset-0 w-full h-full object-cover
          rounded-lg
          md:rounded-xl
          lg:rounded-2xl
          hover:scale-[1.02] transition-transform duration-300"
      />
      {/* オーバーレイ表示 */}
      <div
        className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white
        rounded-b-lg md:rounded-b-xl lg:rounded-b-2xl"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">{action.icon}</span>
          <span className="text-sm md:text-base lg:text-lg font-medium">
            {action.type}
          </span>
        </div>
      </div>
    </button>
  );
}
