class RoomsRepository < RethinkDB::Repository
  def initialize
    super('rooms')
  end
end
