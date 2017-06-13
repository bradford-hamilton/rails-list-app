Rails.application.routes.draw do
  resources :lists, controller: :list_item, param: :id
  get :all_list_items, controller: :list_item, action: :all_list_items
end
