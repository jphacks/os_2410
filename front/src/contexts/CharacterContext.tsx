// src/types/api.ts
export interface User {
  user_id: number;
  username: string;
  email: string;
  created_at: string;
  last_login: string;
}

export interface Character {
  character_id: number;
  user_id: number;
  character_name: string;
  age: number;
  lifespan: number;
  health_points: number;
  status: number;
  last_updated: string;
}

export interface Action {
  log_id: number;
  user_id: number;
  character_id: number;
  action_type: '食事' | '睡眠' | '運動';
  detail: string;
  action_time: string;
}

import {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from 'react';
// import { User, Character, Action } from '../types/api';

interface CharacterContextType {
  characters: Character[];
  currentCharacter: Character | null;
  isLoading: boolean;
  error: string | null;
  fetchUserCharacters: (userId: number) => Promise<void>;
  fetchCharacter: (characterId: number) => Promise<void>;
  createCharacter: (userId: number, characterName: string) => Promise<void>;
  performAction: (
    actionType: Action['action_type'],
    detail: string,
  ) => Promise<void>;
  fetchActions: (characterId: number) => Promise<void>;
}

// 初期値の定義
const initialContext: CharacterContextType = {
  characters: [],
  currentCharacter: null,
  isLoading: false,
  error: null,
  fetchUserCharacters: async () => {},
  fetchCharacter: async () => {},
  createCharacter: async () => {},
  performAction: async () => {},
  fetchActions: async () => {},
};

// CharacterContextの作成
const CharacterContext = createContext<CharacterContextType>(initialContext);

const API_URL = 'http://127.0.0.1:5000';

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(
    null,
  );
  const [actions, setActions] = useState<Action[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserCharacters = useCallback(async (userId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/users/${userId}/characters`);
      if (!response.ok) throw new Error('キャラクター一覧の取得に失敗しました');

      const data = await response.json();
      console.log(data);
      setCharacters(data);
      if (data.length > 0) {
        setCurrentCharacter(data[0]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '不明なエラーが発生しました',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCharacter = useCallback(async (characterId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/characters/${characterId}`);
      if (!response.ok) throw new Error('キャラクター情報の取得に失敗しました');

      const character = await response.json();
      setCurrentCharacter(character);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '不明なエラーが発生しました',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCharacter = useCallback(
    async (userId: number, characterName: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/characters`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            character_name: characterName,
          }),
        });

        if (!response.ok) throw new Error('キャラクターの作成に失敗しました');

        const created = await response.json();
        setCharacters([created]);
        setCurrentCharacter(created);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '不明なエラーが発生しました',
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // performAction を新しいAPIに合わせて修正
  const performAction = useCallback(
    async (actionType: Action['action_type'], detail: string) => {
      if (!currentCharacter) return;
      setIsLoading(true);
      setError(null);

      try {
        // /actions/create エンドポイントを呼び出し
        const response = await fetch(`${API_URL}/actions/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: currentCharacter.user_id,
            character_id: currentCharacter.character_id,
            action_type: actionType,
            detail: detail,
          }),
        });

        if (!response.ok) {
          throw new Error('アクションの実行に失敗しました');
        }

        // レスポンスには更新されたアクションと キャラクター情報の両方が含まれる
        const { action, character } = await response.json();

        // 現在のキャラクター情報を更新
        setCurrentCharacter(character);

        // キャラクター一覧を更新
        setCharacters((prevCharacters) =>
          prevCharacters.map((char) =>
            char.character_id === character.character_id ? character : char,
          ),
        );

        // アクション履歴を更新
        setActions((prevActions) => [...prevActions, action]);

        // キャラクターが死亡した場合の処理
        if (character.status === 0) {
          setError('キャラクターが死亡しました');
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '不明なエラーが発生しました',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [currentCharacter],
  );

  // アクション履歴取得
  const fetchActions = useCallback(async (characterId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}/characters/${characterId}/actions`,
      );
      if (!response.ok) throw new Error('行動履歴の取得に失敗しました');

      const data = await response.json();
      setActions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '不明なエラーが発生しました',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CharacterContext.Provider
      value={{
        characters,
        currentCharacter,
        isLoading,
        error,
        fetchUserCharacters,
        fetchCharacter,
        createCharacter,
        performAction,
        fetchActions,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
}
