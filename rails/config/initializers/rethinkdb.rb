require 'rethinkdb'
include RethinkDB::Shortcuts

DB_NAME = 'esc_dev'

r.connect(:db => DB_NAME).repl
r.db_create(DB_NAME).run unless r.db_list.run.include? DB_NAME
[:users, :rooms, :reservations].each do |t|
  r.table_create(t).run unless r.table_list.run.include? t.to_s
end

r.table('rooms').delete.run
r.table('rooms').insert([
  {order: 1, id: "pjtre", label: "ห้องประชุม 3",   capacity: 10},
  {order: 2, id: "pjfor", label: "ห้องประชุม 4",   capacity: 10},
  {order: 3, id: "pjfiv", label: "ห้องประชุม 5",   capacity: 10},
  {order: 4, id: "pjbig", label: "ห้องประชุม กวศ", capacity: 15},
  {order: 5, id: "pjesc", label: "ห้องประชุม ใหญ่", capacity: 30},
]).run

puts "=> Init RethinkDB #{r}"