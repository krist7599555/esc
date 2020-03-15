class ReservationsRepository < RethinkDB::Repository
  def initialize
    super('reservations')
  end
end
