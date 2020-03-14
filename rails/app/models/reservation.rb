class Reservation
  include RethinkDB::Shortcuts
  @reservations = r.table('reservations')

  def self.create!(args)
    User.get!(args[:userid])
    Room.get!(args[:roomid])
    @resv = {
      userid: args[:userid].to_s,
      roomid: args[:roomid].to_s,
      organization: args[:organization].to_s,
      time_start: Time.at(Integer(args[:time_start])),
      time_end: Time.at(Integer(args[:time_end])),
      status: :pending
    }
    @resv.each do |k, v|
      raise ArgumentError.new "params #{k} is not defined" if v.nil?
    end
    @reservations.insert(@resv, return_changes: true).run['changes'].first[
      'new_val'
    ]
  end

  def self.create(args)
    begin
      self.create!(args)
    rescue StandardError
      nil
    end
  end

  def self.index(query = {})
    @reservations.filter(query).eq_join(:roomid, r.table(:rooms)).map do |lr|
      lr[:left].merge({ room: lr[:right] })
    end.eq_join(:userid, r.table(:users))
      .map { |lr| lr[:left].merge({ user: lr[:right] }) }.run
      .to_a
  end

  def self.update(id, obj)
    @reservations.get(id).update(obj, return_changes: true).run['changes'][0][
      'new_val'
    ]
  end
end
