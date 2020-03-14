# frozen_string_literal: true

class HttpError < StandardError; end

class OK < HttpError
  CODE = 200
end
class Created < HttpError
  CODE = 201
end
class NoContent < HttpError
  CODE = 204
end

class BadRequest < HttpError
  CODE = 400
end
class Unauthorized < HttpError
  CODE = 401
end
class Forbidden < HttpError
  CODE = 403
end

class NotFound < HttpError
  CODE = 404
end
class Conflict < HttpError
  CODE = 409
end

class InternalServerError < HttpError
  CODE = 500
end
