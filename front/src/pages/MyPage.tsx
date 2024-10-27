// src/pages/MyPage.tsx
import { useEffect, useState } from 'react';
import { useCharacter } from '../contexts/CharacterContext';
import { CharacterSection } from '../components/CharacterSection';
import { UserProfile } from '../components/UserProfile';
import { ActionHistorySection } from '../components/ActionHistorySection';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function MyPage() {
  const { fetchUserCharacters, currentCharacter, isLoading, error } =
    useCharacter();
    const {userInfo} = useAuth();
    const userId = userInfo?.id;

    if (!userId) {
      console.log("userIdがないため/sign-inにリダイレクト");
      return <Navigate to="/" replace />;
    }

  useEffect(() => {
    fetchUserCharacters(userId);
  }, [userId, fetchUserCharacters]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-red-50 p-4 rounded-lg mt-8">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        <UserProfile user_id={userInfo.id} user_name={userInfo.username} created_at={userInfo.created_at} email={userInfo.email}/>
        <CharacterSection />
        <ActionHistorySection />
      </div>
    </div>
  );
}
