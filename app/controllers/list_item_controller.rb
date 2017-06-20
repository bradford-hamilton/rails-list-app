class ListItemController < ApplicationController
  def index
    @list = List.all
  end

  def show
    @list = List.find(params[:id])
    @list_item = ListItem.where("list_id = #{params[:id]}")
  end

  def create
    item = ListItem.create(name: params['value'], list_id: params['list_id'])
    render json: {
      message: "Successfully added list item #{params['value']}.",
      id: item.id
    }
  end

  def destroy
    itemId = ListItem.where(id: params[:id])[0].id
    ListItem.destroy(itemId)
    render json: "Successfully deleted ListItem record with name: #{params[:id]}"
  end

  def all_list_items
    list_items = ListItem.where("list_id = #{params[:id]}")
    render json: list_items
  end

  private

  def decode_utf8_b64(string)
    URI.unescape(CGI::escape(Base64.decode64(string)))
  end
end
