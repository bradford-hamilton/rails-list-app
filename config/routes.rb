Rails.application.routes.draw do
  resources :lists, controller: :list_item, param: :id
end
