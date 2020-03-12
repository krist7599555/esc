class Reservation
  
  include RethinkDB::Shortcuts
  @reservations = r.table('reservations')
  
  def self.create!(args)
    User.get!(args[:userid])
    Room.get!(args[:roomid])
    @resv = {
      :userid       => args[:userid].to_s,
      :roomid       => args[:roomid].to_s,
      :organization => args[:organization].to_s,
      :time_start   => Time.at(Integer(args[:time_start])),
      :time_end     => Time.at(Integer(args[:time_end])),
      :status       => :pending
    }
    @resv.each do |k, v| 
      raise ArgumentError.new "params #{k} is not defined" if v.nil?
    end
    @reservations
      .insert(@resv, :return_changes => true)
      .run["changes"].first["new_val"]
  end
  
  def self.create(args)
    self.create!(args) rescue nil
  end

  def self.index(query = {})
    @reservations.filter(query)
      .eq_join(:roomid, r.table(:rooms)).map {|lr| lr[:left].merge({room: lr[:right]})}
      .eq_join(:userid, r.table(:users)).map {|lr| lr[:left].merge({user: lr[:right]})}
      .run.to_a
  end
  
end