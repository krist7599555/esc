class Room
  @rooms = r.table('rooms')
  
  def self.index
    @rooms.order_by(:order).run
  end

  def self.get(id)
    @rooms.get(id).run
  end
  
  def self.get!(id)
    self.get(id) or raise IndexError.new "room not found"
  end
  
end