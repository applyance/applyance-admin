module Applyance
  module Routing
    module Main
      def self.registered(app)

        api_host = app.settings.api_host

        # Home
        app.get // do
          if session[:api_key].nil?
            redirect to('/accounts/login')
          else
            @api_host = api_host
            @api_key = session[:api_key]
            @me = me(@api_key)
            erb :'main/index'
          end
        end

      end
    end
  end
end
