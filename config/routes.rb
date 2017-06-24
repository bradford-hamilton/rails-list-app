Rails.application.routes.draw do
  resources :list_items, controller: :list_item, param: :id
  resources :lists, controller: :list, param: :id
  get :all_list_items, controller: :list_item, action: :all_list_items
  get :all_lists, controller: :list, action: :all_lists
end
