class ListItemController < ApplicationController
  def index
    @list = List.all
  end

  def show
    @list = List.find(params[:id])
    @list_item = ListItem.where("list_id = #{params[:id]}")
  end

  def create

  end

end
