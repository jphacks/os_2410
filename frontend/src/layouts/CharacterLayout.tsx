import { Outlet } from 'react-router-dom';
import { useCharacter } from '../contexts/CharacterContext';
import { useEffect } from 'react';

export function CharacterLayout() {
  const { fetchCharacter } = useCharacter();
  const userId = 1; // 実際の実装では認証システムから取得

  useEffect(() => {
    fetchCharacter(userId);
  }, [fetchCharacter, userId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">キャラクター管理</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}