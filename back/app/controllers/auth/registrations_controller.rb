class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  # DeviseTokenAuth::RegistrationsControllerで定義されたcreateメソッド実行後にset_token_infoメソッドを実行
  after_action :set_token_info, only: [:create]

  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :username)
  end

  # ユーザーデータが保存されているか確認し、保存されていれば新しいトークンを作成。
  # ヘッダーに access-token と client を設定
  def set_token_info
    return unless @resource.persisted?

    token = @resource.create_new_auth_token
    response.set_header('access-token', token['access-token'])
    response.set_header('client', token['client'])
    
  end
end
