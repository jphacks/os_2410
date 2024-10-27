// src/constants/actions.ts
export type ActionType = '食事' | '睡眠' | '運動' | 'タバコ' | '酒' | 'エナドリ';

export type ActionDetail = {
  label: string;
  value: string;
  description: string;
};

// アクションの型定義を拡張
export interface GameAction {
  type: ActionType;
  icon: string;
  description: string;
  position: 'top' | 'right' | 'bottom' | 'left' | 'center';
  order: number;
  details: ActionDetail[];
  imagePath: string;
  feature: boolean;
}

export const GAME_ACTIONS: GameAction[] = [
  {
    type: '食事',
    icon: '🍖',
    feature: false,
    description: 'HPが回復し、寿命が延びます',
    position: 'right',
    order: 1,
    imagePath: '/src/assets/images/kitchen.png', // 各アクションの画像パス
    details: [
      { label: 'ちゃんと取った', value: 'ちゃんと取った', description: "栄養バランスの整った食事をした" },
      { label: '軽い食事', value: '軽い食事' , description: "おやつとかパン１個とか"},
      { label: '不健康な食事', value: '不健康な食事', description: "ジャンクフード、..." },
      { label: '食べてない', value: '食べてない' ,description: "食べろ"},
    ],
  },
  {
    type: '睡眠',
    icon: '😴',
    feature: false,
    description: 'HPが大きく回復し、寿命が延びます',
    position: 'left',
    order: 1,
    imagePath: '/src/assets/images/bed.png', // 各アクションの画像パス
    details: [
      { label: '6時間未満', value: '5', description: "" },
      { label: '7-9時間', value: '8', description: "" },
      { label: '10時間以上', value: '11' , description: ""},
    ],
  },
  {
    type: '運動',
    icon: '🏃',
    feature: false,
    description: 'HPが回復しますが、寿命が減ります',
    position: 'bottom',
    order: 1,
    imagePath: '/src/assets/images/exercise.png', // 各アクションの画像パス
    details: [
      { label: '軽い運動', value: '軽い運動' , description: ""},
      { label: '適度な運動', value: '適度な運動' , description: ""},
      { label: '激しい運動', value: '激しい運動' , description: ""},
    ],
  },
  {
    type: 'タバコ',
    icon: '🚬',
    feature: true,
    description: '体力と寿命が減ります',
    position: 'bottom',
    order: 1,
    imagePath: '/src/assets/images/.png', // 各アクションの画像パス
    details: [
      { label: '吸った', value: '吸った' , description: ""},
      { label: '吸ってない', value: '吸ってない' , description: ""},
    ],
  },
  {
    type: '酒',
    icon: '🍺',
    feature: true,
    description: '体力と寿命が減ります',
    position: 'bottom',
    order: 1,
    imagePath: '/src/assets/images/.png', // 各アクションの画像パス
    details: [
      { label: '吐き気がくるまで飲んだ', value: '吐き気がくるまで飲んだ' , description: ""},
      { label: '飲んだ', value: '飲んだ' , description: ""},
      { label: '飲んでない', value: '飲んでない' , description: ""},
    ],
  },
  {
    type: 'エナドリ',
    icon: '🧃',
    feature: true,
    description: '体力が増える代わりに寿命が減ります',
    position: 'bottom',
    order: 1,
    imagePath: '/src/assets/images/.png', // 各アクションの画像パス
    details: [
      { label: '吐き気がくるまで飲んだ', value: '吐き気がくるまで飲んだ' , description: ""},
      { label: '飲んだ', value: '飲んだ' , description: ""},
      { label: '飲んでない', value: '飲んでない' , description: ""},
    ],
  },
];
