export function UserProfile({ userId }: { userId: number }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">プロフィール</h2>
      <div className="grid gap-4">
        <div>
          <div className="font-medium text-gray-500">ユーザーID</div>
          <div>{userId}</div>
        </div>
        {/* 他のユーザー情報があれば追加 */}
      </div>
    </div>
  );
}