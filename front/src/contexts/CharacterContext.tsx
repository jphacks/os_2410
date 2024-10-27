// src/types/api.ts
export interface User {
  user_id: number;
  username: string;
  email: string;
  created_at: string;
  last_login: string;
}

export interface Character {
  id: number;
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
import axios from 'axios';
import { useAuth } from './AuthContext';
import { GameAction } from '../constants/actions';
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

const API_URL = 'http://localhost:3000';

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(
    null,
  );
  const [actions, setActions] = useState<Action[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchUserCharacters = useCallback(async (userId: number) => {
    console.log('fetchUserCharacterを実行');
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_URL}/users/${userId}/characters`,
        {
          headers: {
            Authorization: token?.Authorization,
          },
        },
      );

      const characters = await response.data;

      console.log("characters: ", characters);
      setCharacters(characters);
      console.log("currentCharacter: ", currentCharacter);
      if (characters.length > 0) {
        setCurrentCharacter(characters[0]);
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
        const data = {
          character_name: characterName,
        };
        console.log("token: ", token?.Authorization);
        const response = await axios.post(`${API_URL}/characters`, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token?.Authorization,
          },
        });

        const created = await response.data;
        console.log(created);
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

  const performAction = useCallback(
    async (action: GameAction, selectedDetail: { value: string }) => {
      if (!currentCharacter) return;
      setIsLoading(true);
      setError(null);
  
      try {
        // APIに送信するデータを準備
        const data = {
          user_id: currentCharacter.user_id,
          character_id: currentCharacter.id,
          action_type: action.type,
          detail: selectedDetail.value,
        };

        console.log("data: ", data);
  
        // /action_logsエンドポイントを呼び出し
        const response = await axios.post(`${API_URL}/action_logs`, data, {
          headers: { Authorization: token?.Authorization },
        });
  
        // レスポンスから更新されたキャラクター情報を取得
        const character = await response.data;

        console.log("character: ", character);
  
        // 現在のキャラクター情報を更新
        setCurrentCharacter(character);
  
        // キャラクター一覧を更新
        setCharacters((prevCharacters) =>
          prevCharacters.map((char) =>
            char.id === character.id ? character : char,
          ),
        );
  
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
    [currentCharacter, token],
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
