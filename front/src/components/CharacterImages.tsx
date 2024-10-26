import React, { useRef, useState, useEffect } from 'react';

interface Character {
  health_points: number;
}

interface ImageMap {
  [key: number]: string; // HPの範囲と画像パスの対応
}

const imageMap: ImageMap = {
  0: '/src/assets/images/tako_older_normal.png', // HPが5未満のとき
  5: '/src/assets/images/tako_yonger_normal.png', // HPが5以上のとき
  10: '/src/assets/images/tako_baby_normal.png', // HPが10以上のとき
};

let x, y;

function CharacterImage({ character }: { character: Character }) {
  const myRef = useRef<HTMLDivElement>(null);

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
    console.log('x:', rect.x);
    x = rect.x;
    console.log('y:', rect.y);
    y = rect.y;
    // ... その他の属性も利用可能
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

  return (
    <div ref={myRef}>
      <img
        id="Image"
        src={currentImage}
        alt="character"
        style={{
          transition: 'transform 0.5s ease-in-out',
          transform: `translate(${mousePosition.x - x}px,${mousePosition.y - y}px)`,
        }}
        onClick={handleClick}
      />
    </div>
  );
}

export default CharacterImage;
