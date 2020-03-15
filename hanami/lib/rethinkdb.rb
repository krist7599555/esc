# frozen_string_literal: true

module RethinkDB
  class Entity
  end

  class Repository
    @r = RethinkDB::RQL.new
    @table = nil
    attr_reader :r, :table
    def initialize(table_name)
      @table = @r.table(table_name)
    end

    # create(data) – Create a record for the given data and return an entity
    def create(data)
      @table.insert(data, return_changes: true, conflict: 'error').run
    end

    # update(id, data) – Update the record corresponding to the id and return the updated entity
    def update(id, data)
      @table.get(id).update(data, return_changes: true).run
    end

    # delete(id) – Delete the record corresponding to the given entity
    def delete(id)
      @table.get(id).delete(return_changes: true).run
    end

    # all - Fetch all the entities from the collection
    def all
      @table.run
    end

    # find(id) - Fetch an entity from the collection by its ID
    def find(id)
      @table.get(id).run
    end

    # first - Fetch the first entity from the collection
    def first
      raise NotImplementedError, 'RethinkDB::Repository#last is not implement'
    end

    # last - Fetch the last entity from the collection
    def last
      raise NotImplementedError, 'RethinkDB::Repository#last is not implement'
    end

    # clear - Delete all the records from the collection
    def clear
      @table.delete(return_changes: true).run
    end
  end
end
