class List < ApplicationRecord
  has_many :list_items
  validates :name, :presence => true
end
