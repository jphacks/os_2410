import React, { useState, useEffect, useRef } from 'react';

// interface ImageChangeButtonProps {
//   originalImagePath: string;
//   changedImagePath: string;
//   5: '/src/assets/images/tako_yonger_normal.png', // HPが5以上のとき
//   10: '/src/assets/images/tako_yonger_happy.png', // HPが10以上のとき
// }



export function ImageChangeButtonProps(){
  const [isImageChanged, setIsImageChanged] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);



  const handleClick = () => {
    setIsImageChanged(true);
    setTimeout(() => {
      setIsImageChanged(false);
    }, 5000);
  };

  useEffect(() => {
    if (isImageChanged && imageRef.current) {
      imageRef.current.classList.add('fade-in');
      setTimeout(() => {
        imageRef.current.classList.remove('fade-in');
      }, 5000);
    }
  }, [isImageChanged]);

  return (
    <div>
      <button onClick={handleClick}>画像変更</button>
      <img
        ref={imageRef}
        src={isImageChanged ? "/src/assets/images/tako_yonger_happy.png" : "/src/assets/images/tako_yonger_normal.png"}
        alt="変更される画像"
        className="transition duration-500 ease-in-out"
      />
    </div>
  );
};

export default ImageChangeButtonProps;