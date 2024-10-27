import React, { useRef, useState, useEffect } from 'react';

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

function CharacterImage({ character }: { character: Character }) {
  const myRef = useRef<HTMLDivElement>(null);

  if (character.status == 1) {
    imageMap = babyImage;
  } else if (character.status == 2) {
    imageMap = yongerImage;
  } else if (character.status == 3) {
    imageMap = olderImage;
  }

  const [currentImage, setCurrentImage] = useState<string>(
    // 初期画像の設定
    imageMap[
      Object.keys(imageMap)
        .reverse()
        .find((key) => character.health_points >= +key)
    ],
  );
  const [isAnimated, setIsAnimated] = useState(false);

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
    // HPが変化したときの画像更新
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
  }, [character.health_points]);

  const handleClick = () => {
    setIsAnimated(!isAnimated);
  };

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
    <div ref={myRef}>
      <img
        id="Image"
        src={currentImage}
        alt="character"
        style={{
          transition: 'transform 0.5s ease-in-out',
          transform: `translate(${char_x}px,${char_y}px)`,
        }}
        onClick={handleClick}
      />
    </div>
  );
}

export default CharacterImage;
