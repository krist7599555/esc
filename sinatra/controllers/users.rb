# frozen_string_literal: true

class Users < ESC::Base
  extend RethinkDB::BasicCollection
  rethink_table 'users'

  index = -> { find_all }
  get   = -> { find_one(params[:id]) }

  update_role = lambda do
    Users.table.get(params[:id]).update(return_changes: true) do |user|
      { roles: user[:roles].default([]).set_insert(params[:role]) }
    end.run
  end

  namespace '/api/users' do
    get '/',                &index
    get '/:id',             &get
    put '/:id/roles/:role', &update_role
  end
end
