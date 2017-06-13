class ListItemController < ApplicationController
  def index
    @list = List.all
  end

  def show
    @list = List.find(params[:id])
    @list_item = ListItem.where("list_id = #{params[:id]}")
  end

  def create
    ListItem.create(name: params['value'], list_id: params['list_id'])
    render json: "Successfully added list item."
  end

  def all_list_items
    list_items = ListItem.where("list_id = #{params[:id]}").to_json
    render json: list_items
  end
end
