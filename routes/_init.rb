require_relative 'main'
require_relative 'accounts'

module Applyance
  module Routing
    module Init
      def self.registered(app)
        app.register Applyance::Routing::Accounts
        app.register Applyance::Routing::Main
      end
    end
  end
end
