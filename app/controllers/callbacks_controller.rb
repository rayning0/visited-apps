class CallbacksController < Devise::OmniauthCallbacksController

  %w(google_oauth2 facebook twitter linkedin).each do |provider|
  define_method(provider) do
      @user = User.from_omniauth(request.env["omniauth.auth"])
      sign_in_and_redirect @user
    end
  end

end