import { useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">エラーが発生しました</h1>
        <p className="text-gray-600 mb-4">
          申し訳ありません。予期せぬエラーが発生しました。
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  );
}