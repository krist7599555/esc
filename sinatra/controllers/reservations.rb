# frozen_string_literal: true

require_relative '../helpers/rethink_basic_collection.rb'

class Reservations < ESC::Base
  extend RethinkDB::BasicCollection
  rethink_table 'reservations'

  list = lambda do
    table
      .eq_join(:roomid, r.table(:rooms))
      .map { |lr| lr[:left].merge({ room: lr[:right] }) }
      .eq_join(:userid, r.table(:users))
      .map { |lr| lr[:left].merge({ user: lr[:right] }) }
      .run
      .to_a
  end

  reserve = lambda do
    args[:userid] = nil # TODO: assign me
    Users.get!(args[:userid])
    Rooms.get!(args[:roomid])

    @resv = {
      userid: args[:userid].to_s,
      roomid: args[:roomid].to_s,
      organization: args[:organization].to_s,
      time_start: Time.at(Integer(args[:time_start])),
      time_end: Time.at(Integer(args[:time_end])),
      status: :pending
    }

    @resv.each do |k, v|
      raise BadRequest, "params #{k} is not defined" if v.nil?
    end
    create(@resv)['changes'].first['new_val']
  end

  update_status = lambda do
    @reserv = update(params[:id], { status: params[:status] })
    render json: @reserv
  end

  namespace '/api/reservations' do
    get  '/',                   &list
    post '/',                   &reserve
    put  '/:id/status/:status', &update_status
  end
end
