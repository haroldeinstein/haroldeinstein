class Project < ActiveRecord::Base
  default_scope order("sort_index ASC")
end
