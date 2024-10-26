Rails.application.routes.draw do
  # ユーザーに紐づくキャラクターの一覧を取得
  get '/users/:user_id/characters', to: 'characters#index_by_user'
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :characters, only: [:index, :show, :create, :update, :destroy]
  resources :action_logs, only: [:index, :show, :create]

  # 行動ログ取得用のエンドポイント
  get '/users/:id/action', to: 'action_logs#user_actions'
end
