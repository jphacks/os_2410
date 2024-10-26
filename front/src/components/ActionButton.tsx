import { GameAction } from '../constants/actions';

interface ActionButtonProps {
  action: GameAction;
  onClick: (action: GameAction) => void;
}

export function ActionButton({ action, onClick }: ActionButtonProps) {
  return (
    <button onClick={() => onClick(action)} className="p-20 w-screen-50 h-screen-25">
      <img
        src="/src/assets/images/bed.png"
        alt="ボタンの画像"
        className="absolute inset-0 w-full h-full object-cover
        /* スマートフォンサイズ (デフォルト) */
        rounded-lg
        /* タブレットサイズ */
        md:rounded-xl
        /* デスクトップサイズ */
        lg:rounded-2xl
        /* ホバー時のエフェクト */
        hover:scale-[1.02] transition-transform duration-300"
      />
    </button>
  );
}
