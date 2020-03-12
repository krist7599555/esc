require "faraday"

class SSO 
  
  private
  
  @conn = Faraday.new(
    url: 'https://account.it.chula.ac.th',
    headers: {'Content-Type' => 'application/x-www-form-urlencoded'},
    ) do |conn|
      conn.request  :url_encoded
      conn.response :json, content_type: /\bjson$/
  end

  class << self
    attr_reader :conn
  end

  def self.ticket(username, password)
    raise ArgumentError.new "username must be number string length 10" if (username =~ /[0-9]{10}/).nil?
    resp = @conn.post('/login') do |req|
      req.body = {
        :username    => username.first(username.first(2).to_i > 61 ? 10 : 8), 
        :password    => password,
        :service     => 'https://account.it.chula.ac.th',
        :serviceName => 'ESC server'
      }
    end
    resp.headers[:location][/ticket=(.+)/, 1]
  end
  
  def self.validate(ticket)
    resp = @conn.get('/serviceValidation') do |req|
      req.params = { :ticket => ticket }
      req.headers = {
        DeeAppId: 'dc2326fef061a32bea16242be5941c7d403f485fa52fdfc69d145e3c3be2fb05',
        DeeAppSecret: 'b3ed7ba73d5c455d9a9ab7a03cb11829ac141b4c07d535de281d244de779a6a847e430a8806ef6fb5e9bf928414e4c444465cbf0347eb5dab9b7a0a0b532e2e5',
      }
    end
    raise Faraday::Error.new(resp.body["content"], :status => 401) if resp.body["type"] == "error"
    {
      :id        => resp.body["ouid"],
      :nameTH    => resp.body["firstnameth"],
      :nameEN    => resp.body["firstname"],
      :surnameTH => resp.body["lastnameth"],
      :surnameEN => resp.body["lastname"],
      :faculty   => resp.body["ouid"].last(2).to_i,
      :year      => resp.body["ouid"].first(2).to_i,
    }
  end
  
  public
  
  def self.login!(username, password)
    SSO.validate(SSO.ticket(username, password))
  end
  
  def self.login(username, password)
    self.login!(username, password) rescue nil
  end
  
end

