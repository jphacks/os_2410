import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [reloadTime, setReloadTime] = useState(new Date()); // リロードする日時を設定

  useEffect(() => {
    const now = new Date();

    const targetTime = new Date();
    targetTime.setHours(0, 0, 0, 0);
    const timeout = targetTime.getTime() - now.getTime();

    if (timeout > 0) {
      const timerId = setTimeout(() => {
        // 開いている時かつ日付を超えた瞬間に実行されるコード
        console.log('aaa');
      }, timeout);

      return () => clearTimeout(timerId);
    }
  }, [reloadTime]);
}

export default MyComponent;
