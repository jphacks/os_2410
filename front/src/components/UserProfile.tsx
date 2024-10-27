import { UserInfo } from "../contexts/AuthContext";

type UserProfileProps = {
  user_id: number;
  user_name: string;
  created_at: string;
  email: string;
}

export function UserProfile({user_id, user_name, created_at, email}: UserProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8  ">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">プロフィール</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-500">ユーザーID</label>
            <div className="text-gray-800 font-medium">{user_id}</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-500">ユーザー名</label>
            <div className="text-gray-800 font-medium">{user_name}</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-500">アカウント作成日</label>
            <div className="text-gray-800 font-medium">{created_at}</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-500">メールアドレス</label>
            <div className="text-gray-800 font-medium">{email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}