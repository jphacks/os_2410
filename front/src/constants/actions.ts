// src/constants/actions.ts
export type ActionType = '食事' | '睡眠' | '運動';

export type ActionDetail = {
  label: string;
  value: string;
};

export interface GameAction {
  type: ActionType;
  icon: string;
  description: string;
  details: ActionDetail[];
  position: 'top' | 'right' | 'bottom' | 'left' | 'center';
  order?: number; // 同じposition内での順序
}

export const GAME_ACTIONS: GameAction[] = [
  {
    type: '食事',
    icon: '🍖',
    description: 'HPが回復し、寿命が延びます',
    position: 'right',
    order: 1,
    details: [
      { label: 'ちゃんと取った', value: 'ちゃんと取った' },
      { label: '軽い食事', value: '軽い食事' },
      { label: '不健康な食事', value: '不健康な食事' },
      { label: '食べてない', value: '食べてない' },
    ],
  },
  {
    type: '睡眠',
    icon: '😴',
    description: 'HPが大きく回復し、寿命が延びます',
    position: 'left',
    order: 1,
    details: [
      { label: '6時間未満', value: '5' },
      { label: '7-9時間', value: '8' },
      { label: '10時間以上', value: '11' },
    ],
  },
  {
    type: '運動',
    icon: '🏃',
    description: 'HPが回復しますが、寿命が減ります',
    position: 'bottom',
    order: 1,
    details: [
      { label: '軽い運動', value: '軽い運動' },
      { label: '適度な運動', value: '適度な運動' },
      { label: '激しい運動', value: '激しい運動' },
    ],
  },
];
