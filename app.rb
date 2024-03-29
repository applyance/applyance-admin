require 'sinatra/base'
require 'sinatra/config_file'
require 'sinatra/content_for'
require 'sinatra/multi_route'
require 'rack-flash'

require 'json'
require 'rest_client'

require_relative 'helpers/_init'
require_relative 'routes/_init'

module Applyance
  class Admin < Sinatra::Base

    helpers Sinatra::ContentFor
    register Sinatra::MultiRoute

    # Load config file
    register Sinatra::ConfigFile
    config_file 'config/config.yml'

    # Config
    set :root, File.dirname(__FILE__)
    enable :sessions, :logging
    disable :static

    configure :development do
      enable :static
      set :show_exceptions, :after_handler
    end

    # Enable rack flash
    use Rack::Flash, :sweep => true

    # Helpers
    helpers Applyance::Helpers::API

    # Routing
    register Applyance::Routing::Init

  end
end
