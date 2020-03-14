# frozen_string_literal: true

require 'rethinkdb'
# r = RethinkDB::Shortcuts
r = RethinkDB::RQL.new
DB_NAME = 'esc_dev'

begin
  r.connect(db: DB_NAME).repl
rescue Errno::ECONNREFUSED => e
  puts e.class
  puts e.message
  puts "Rethinkdb database = #{DB_NAME}"
  puts 'Rethinkdb might running incorrect port ?'
  exit 1
end

r.db_create(DB_NAME).run unless r.db_list.run.include? DB_NAME
%i[users rooms reservations].each do |t|
  r.table_create(t).run unless r.table_list.run.include? t.to_s
end

r.table('rooms').delete.run
r.table('rooms').insert(
  [
    { order: 1, id: 'pj2', label: 'ห้องประชุม 2', capacity: 10 },
    { order: 2, id: 'pj3', label: 'ห้องประชุม 3', capacity: 10 },
    { order: 3, id: 'pj4', label: 'ห้องประชุม 4', capacity: 10 },
    { order: 4, id: 'pj5', label: 'ห้องประชุม 5', capacity: 10 },
    { order: 5, id: 'pjbig', label: 'ห้องประชุม กวศ', capacity: 15 },
    { order: 6, id: 'pjesc', label: 'ห้องประชุม ใหญ่', capacity: 30 }
  ]
).run
