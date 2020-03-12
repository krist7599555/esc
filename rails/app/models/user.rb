class User
  ROLES = [:admin]
  @users = r.table('users')
  
  def self.create(user)
    @users.insert(user).run
  end
  
  def self.index(query = {})
    @users.filter(query).run.to_a
  end
  
  def self.get(id)
    @users.get(id).run
  end
  
  def self.get!(id)
    self.get(id) or raise IndexError.new "user not found"
  end

  def self.update_role(id, role)
    raise ArgumentError.new "role #{role} is not exist" unless ROLES.include? role
    self.get!(id)
    @users.get(id).update(:return_changes => true) { |user|
      {:roles => user[:roles].default([]).set_insert(role)} 
    }.run
    self.get!(id)
  end
end

