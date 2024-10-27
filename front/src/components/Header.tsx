import { Link, useLocation } from 'react-router-dom';
import { useCharacter } from '../contexts/CharacterContext';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const location = useLocation();
  const { currentCharacter } = useCharacter();
  const {userInfo, signOut} = useAuth();

  const handleSignOut = () => {
    signOut()
  }

  const navigation = [
    { name: 'ホーム', path: '/' },
    { name: 'マイページ', path: '/my-page' },
    { name: 'サインイン', path: '/sign-in' },
    { name: 'サインアップ', path: '/sign-up' },
  ];

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Title */}
          <div className='flex space-x-2'>
            <p>userid:{userInfo?.id}</p>
            <p>name:{userInfo?.username}</p>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  text-sm font-medium transition-colors
                  ${
                    location.pathname === item.path
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div>
            <button className='hover:bg-gray-300 p-2 rounded-md' onClick={handleSignOut}>サインアウト</button>
          </div>

          {/* Character Status Summary */}
          <div className="flex items-center space-x-4">
            {currentCharacter ? (
              <div className="flex items-center space-x-3 py-1 px-3 bg-gray-50 rounded-full">
                <span className="text-sm font-medium text-gray-600">
                  {currentCharacter.character_name}
                </span>
                <div className="flex items-center space-x-1 text-sm">
                  <span className="text-gray-500">HP:</span>
                  <span
                    className={`font-medium ${
                      currentCharacter.health_points > 7
                        ? 'text-green-600'
                        : currentCharacter.health_points > 3
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    {currentCharacter.health_points}/10
                  </span>
                </div>
              </div>
            ) : (
              <Link
                to="/create"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                キャラクター作成
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
