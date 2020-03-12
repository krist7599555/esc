load "#{Rails.root}/config/initializers/rethinkdb.rb"
class Admin
  def self.update_user_tel
    r.table('users').run.each do |user|
      r.table('users').get(user["id"]).update(
        EngLib.user(user["id"]).select!(:tel, :email)
      ).run unless user.key? "tel"
    end
    r.table('users').run
  end
end