class ChangeSortIndexToIntegerOnProject < ActiveRecord::Migration
  def change
    remove_column :projects, :sort_index
    add_column :projects, :sort_index, :integer
  end
end
