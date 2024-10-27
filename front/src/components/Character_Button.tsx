import React, { useRef, useState, useEffect } from 'react';

import { GAME_ACTIONS } from '../constants/actions';
import { GameAction } from '../constants/actions';
import { ActionButton } from './ActionButton';

interface CharacterImageProps {
  // action: GameAction;
  character: Character;
  onClick: (action: GameAction) => void;
  text: string;
}

interface Character {
  health_points: number;
  status: number;
}

interface ImageMap {
  [key: number]: string; // HPの範囲と画像パスの対応
}

const babyImage = {
  0: '/src/assets/images/tako_baby_sad.png', // HPが5未満のとき
  5: '/src/assets/images/tako_baby_normal.png', // HPが5以上のとき
  10: '/src/assets/images/tako_baby_happy.png', // HPが10以上のとき
};

const yongerImage = {
  0: '/src/assets/images/tako_yonger_sad.png', // HPが5未満のとき
  5: '/src/assets/images/tako_yonger_normal.png', // HPが5以上のとき
  10: '/src/assets/images/tako_yonger_happy.png', // HPが10以上のとき
};

const olderImage = {
  0: '/src/assets/images/tako_older_sad.png', // HPが5未満のとき
  5: '/src/assets/images/tako_older_normal.png', // HPが5以上のとき
  10: '/src/assets/images/tako_older_happy.png', // HPが10以上のとき
};

// 寿命を基準にif文で分岐する
let imageMap: ImageMap = babyImage;

let x, y;

let isliveflg = true;

function CharacterImage({ character, onClick, text }: CharacterImageProps) {
  const myRef = useRef<HTMLDivElement>(null);
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);

  // const [isliveflg, setIsliveFlg] = useState<true>

  if (character.status == 1) {
    imageMap = babyImage;
  } else if (character.status == 2) {
    imageMap = yongerImage;
  } else if (character.status == 3) {
    imageMap = olderImage;
  } else if (character.status == 0) {
    isliveflg = false;
  }

  const [currentImage, setCurrentImage] = useState<string>(
    // 初期画像の設定
    imageMap[
      Object.keys(imageMap)
        .reverse()
        .find((key) => character.health_points >= +key)
    ],
  );

  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  if (myRef.current) {
    const rect = myRef.current.getBoundingClientRect();
    x = rect.x;
    y = rect.y;
  }

  useEffect(() => {
    if (isBubbleVisible && bubbleRef.current) {
      bubbleRef.current.classList.add('animate-fadeIn');
    }

    // HPが変化したときの画像更新
    if (!isliveflg) {
      console.log('a');
      char_x = window.innerWidth / 2 - 60;
      char_y = window.innerHeight / 2 - 50;
    } else {
      const newImage =
        imageMap[
          Object.keys(imageMap)
            .reverse()
            .find((key) => character.health_points >= +key)
        ];
      setCurrentImage(newImage);

      const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [character.health_points, isBubbleVisible]);

  let char_x, char_y;

  if (+(window.innerWidth / 2) >= mousePosition.x) {
    char_x = mousePosition.x - x;
  } else {
    char_x = mousePosition.x - x - 125;
  }
  if (+(window.innerHeight / 2) >= mousePosition.y) {
    char_y = mousePosition.y - y;
  } else {
    char_y = mousePosition.y - y - 100;
  }

  return (
    <>
      {isliveflg && (
        <div className="flex justify-center items-center h-screen">
          {/* モックキャラクター */}
          <div className="w-32 h-32" id="myImage">
            <div ref={myRef}>
              <img
                id="Image"
                src={currentImage}
                alt="character"
                style={{
                  transition: 'transform 0.5s ease-in-out',
                  transform: `translate(${char_x}px,${char_y}px)`,
                }}
              />
            </div>
          </div>
          <div className="absolute bottom-0 overflow-x-auto left-1/4 right-1/4 md:left-1/4 md:right-1/4 lg:left-1/3 lg:right-1/3 m-auto">
            <ol className="flex grid-cols-6">
              {GAME_ACTIONS.map((action) => (
                <ActionButton
                  key={action.type}
                  action={action}
                  onClick={onClick}
                />
              ))}
            </ol>
          </div>
        </div>
      )}
      {!isliveflg && (
        <div ref={myRef}>
          <img
            id="Image"
            src={currentImage}
            alt="character"
            className="w-32 h-32"
            style={{
              transition: 'transform 0.5s ease-in-out',
            }}
          />
        </div>
      )}
    </>
  );
}

export default CharacterImage;
