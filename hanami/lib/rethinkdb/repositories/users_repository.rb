# frozen_string_literal: true

class UsersRepository < RethinkDB::Repository
  def initialize
    super('users')
  end
end
