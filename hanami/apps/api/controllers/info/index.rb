# frozen_string_literal: true

module Api
  module Controllers
    module Info
      class Index
        include Api::Action

        def call(_params)
          status 200, 'ESC API2 upsdate'
        end
      end
    end
  end
end
