Rails.application.routes.draw do
  resources :list_items, controller: :list_item, param: :id
  get :all_list_items, controller: :list_item, action: :all_list_items
  resources :lists, controller: :list, param: :id
  get :all_lists, controller: :list, action: :all_lists
end
