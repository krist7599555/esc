# frozen_string_literal: true

require 'rethinkdb'

module RethinkDB
  module BasicCollection
    # include RethinkDB::ShotCut
    include RethinkDB::Shortcuts
    # $r = RethinkDB::RQL.new
    @table = nil
    @table_name = nil

    def rethink_table(tab)
      # p $r
      @table = r.table(tab.to_s)
      @table_name = tab.to_s
    end

    def table
      @table
    end

    def find_all(query = {})
      @table.filter(query).run.to_a
    end

    def find_one(id)
      @table.get(id).run
    end

    def find_one!(id)
      find_one(id) || raise(NotFound, "#{@table_name} not exist")
    end

    def exist?(id)
      @table.get(id).count.eq(1).run
    end

    def create(obj)
      @table.insert(obj, return_changes: true).run
    end

    def upsert(id, obj)
      @table.insert(
        obj.to_h.merge({ id: id }),
        return_changes: true, conflict: 'update'
      ).run
    end
  end
end
