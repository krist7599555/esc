Rails.application.routes.draw do
  get   "/api",                       to: "application#api"
  post  "/api/login",                 to: "auth#login"
  get   "/api/profile",               to: "auth#profile"
  get   "/api/users",                 to: "users#index"
  get   "/api/users/:id",             to: "users#get"
  post  "/api/users/:id/roles/admin", to: "users#update_role", :role => :admin
  get   "/api/rooms",                 to: "rooms#index"
  get   "/api/reservations",          to: "reservations#index"
  post  "/api/reservations",          to: "reservations#create"
end
