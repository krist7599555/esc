class Rethink
#  require 'rethinkdb'
#  include RethinkDB::Shortcuts
#  
#  DB_NAME = 'esc_dev'
#  
#  r.connect(:db => DB_NAME).repl
#  r.create_db(DB_NAME).run unless r.db_list.run.include? DB_NAME
#  [:users, :rooms, :reservation].each do |t|
#    r.table_create(t).run unless r.table_list.run.include? t.to_s
#  end

  @users = r.table('users')
  @rooms = r.table('rooms')
  @reservations = r.table('reservations')
  class << self; 
    attr_reader :users, :rooms, :reservation
  end
  
end
