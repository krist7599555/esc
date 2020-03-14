# frozen_string_literal: true

require_relative '../helpers/rethink_basic_collection.rb'

class Rooms < ESC::Base
  extend RethinkDB::BasicCollection
  rethink_table 'rooms'

  index = -> { find_all }
  get   = -> { find_one(params[:id]) }

  namespace '/api/rooms' do
    get '/',    &index
    get '/:id', &get
  end
end
