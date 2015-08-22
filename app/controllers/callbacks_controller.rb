class CallbacksController < Devise::OmniauthCallbacksController

  %w(google_oauth2 facebook twitter linkedin).each do |provider|
    define_method(provider) do
      @user = User.from_omniauth(request.env["omniauth.auth"])
      begin
        sign_in_and_redirect @user
      rescue ActiveRecord::RecordNotUnique
        provider = User.find_by_email(@user.email).provider
        provider = " at #{provider.capitalize}" unless provider.nil?
        flash[:error] = "Email address already exists#{provider}. Log in there or, to use this different account: 1) Log in there, 2) Edit profile, 3) Cancel account, then 4) Re-login here."
        redirect_to new_user_session_path
      end
    end
  end

end