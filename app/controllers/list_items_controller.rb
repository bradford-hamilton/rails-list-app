class ListItemsController < ApplicationController
  def index
    @list_items = ListItems.all
  end
end
