class ListItemController < ApplicationController
  def index
    @list_item = ListItem.all
  end
end
