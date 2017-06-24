class ListItemController < ApplicationController
  def show
    @list = List.find(params[:id])
  end

  def create
    item = ListItem.create(name: params['value'], list_id: params['list_id'])

    render json: {
      message: "Successfully added list item #{params['value']}.",
      id: item.id
    }
  end

  def destroy
    itemId = ListItem.find(params[:id]).id

    ListItem.destroy(itemId)

    render json: "Successfully deleted ListItem record with name: #{params[:id]}"
  end

  def all_list_items
    list_items = ListItem.where(list_id: params[:id])

    render json: list_items
  end
end
