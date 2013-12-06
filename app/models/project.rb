class Project < ActiveRecord::Base
  scope :sorted, -> { order("sort_index ASC") }
end
