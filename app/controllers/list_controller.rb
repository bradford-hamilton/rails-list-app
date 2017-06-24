class ListController < ApplicationController
  def index
    @list = List.all
  end

  def show
    # @list = List.find(params[:id])
    # @list_item = ListItem.where(list_id: params[:id])
  end

  def create
    list = List.create(name: params['value'])
    render json: {
      message: "Successfully added list #{params['value']}.",
      id: list.id
    }
  end

  def destroy
    list_id = List.find(params[:id]).id
    List.destroy(list_id)
    render json: "Successfully deleted list record with id: #{params[:id]}"
  end

  def all_lists
    lists = List.all
    render json: lists
  end
end
