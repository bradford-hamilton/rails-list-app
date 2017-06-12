class ListItemController < ApplicationController
  def index
    @list = List.all
  end

  def show
    @list = List.find(params[:id])
    @list_item = ListItem.where("list_id = #{params[:id]}")
  end

  def create
    @list_item = ListItem.create(name: params[:value], list_id: params[:list_id])
  end

end
