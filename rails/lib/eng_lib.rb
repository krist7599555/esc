class EngLib
  @conn = Faraday.new(
    url: "https://www.library.eng.chula.ac.th",
    headers: {'Content-Type' => 'application/x-www-form-urlencoded'},
    ) do |conn|
      conn.request  :url_encoded
      conn.response :json, content_type: /\bjson$/
  end
  def self.user(id)
    resp = @conn.post("/api/user/verify-student", {"studentID": id})
    body = resp.body.with_indifferent_access
    {
      :id         => body["studentId"],
      :nameEN     => body["fName"],
      :surnameEN  => body["lName"],
      :email      => body["email"],
      :department => body["department"],
      :tel        => body["tel"]
    } if body["message"] == "valid"
  end
end