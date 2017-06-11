class CreateListItems < ActiveRecord::Migration[5.0]
  def change
    create_table :list_items do |t|
      t.text :name, null: false
      t.references :list, null: false
      t.timestamps
    end
  end
end
