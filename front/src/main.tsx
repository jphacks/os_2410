import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import { CharacterProvider } from './contexts/CharacterContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Create } from './pages/Create';
import { ErrorPage } from './pages/ErrorPage';
import './index.css';
import { MyPage } from './pages/MyPage';
import { AuthProvider } from './contexts/AuthContext';
import { SignUp } from './pages/SignUpPage';
import { SignIn } from './pages/SignInPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <AuthProvider>
          <CharacterProvider>
            <Layout />
          </CharacterProvider>
        </AuthProvider>
      }
      errorElement={<ErrorPage />}
    >
      <Route
        index
        element={<Home />}
        loader={async () => {
          // ホームページのデータ読み込み
          return null;
        }}
      />
      <Route
        path="create"
        element={<Create />}
        loader={async () => {
          // 作成ページのデータ読み込み
          return null;
        }}
        action={async ({ request }) => {
          // フォーム送信時の処理
          const formData = await request.formData();
          return { name: formData.get('name') };
        }}
      />
      <Route path="my-page" element={<MyPage />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>,
  ),
);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
