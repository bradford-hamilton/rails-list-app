Rails.application.routes.draw do
  get :dashboard, controller: :list_item, action: :index
end
