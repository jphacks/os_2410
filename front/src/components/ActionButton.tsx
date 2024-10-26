import { GameAction } from '../constants/actions';

interface ActionButtonProps {
  action: GameAction;
  onClick: (action: GameAction) => void;
}

export function ActionButton({ action, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={() => onClick(action)}
      className="p-20 relative w-1/2" // relativeを追加
    >
      <img
        src={action.imagePath}
        alt={`${action.type}のアイコン`}
        className="absolute inset-0
          rounded-lg
          md:rounded-xl
          lg:rounded-2xl
          hover:scale-[1.02] transition-transform duration-300"
      />
      {/* オプション: アクション名やアイコンをオーバーレイ表示 */}
      <div
        className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white rounded-b-lg
        md:rounded-b-xl lg:rounded-b-2xl"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">{action.icon}</span>
          <span className="font-medium">{action.type}</span>
        </div>
      </div>
    </button>
  );
}
