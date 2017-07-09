require 'rails_helper'

describe ListItemController do
  let!(:shopping_list) { List.create(name: 'Shopping List') }

  describe '#show' do
    before { get :show, id: shopping_list.id }

    it 'assigns the correct list to the list instance variable' do
      expect(assigns(:list)).to eq(List.find(shopping_list.id))
    end
  end

  describe '#create' do
    it 'creates a new list item' do
      new_item_name = 'eggs'

      post :create, :params => { :value => new_item_name, :list_id => shopping_list.id }

      expect(response.status).to eq(200)
      expect(response.body).to include("{\"message\":\"Successfully added list item #{new_item_name}.\",\"id\":")
      expect(ListItem.find_by(name: new_item_name, list_id: shopping_list.id)).to_not eq(nil)
    end
  end
end