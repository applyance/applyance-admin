module Applyance
  module Routing
    module Accounts
      def self.registered(app)

        api_host = app.settings.api_host

        # Logout
        app.get '/accounts/logout' do
          session.clear
          redirect to('/')
        end

        # GET Login
        app.get '/accounts/login' do
          erb :'accounts/login', :layout => :'layouts/bare'
        end

        # POST Login
        app.post '/accounts/login' do

          auth = authenticate({
            "email" => params[:account][:email],
            "password" => params[:account][:password]
          })

          @errors = collect_errors(auth['raw'])
          if @errors.length > 0
            return erb :'accounts/login', :layout => :'layouts/bare'
          end

          session[:api_key] = auth['api_key']

          redirect_to = '/'
          if params[:redirect_to]
            redirect_to = params[:redirect_to]
            session[:redirect_to] = nil
          end

          redirect to(redirect_to)

        end

      end
    end
  end
end
