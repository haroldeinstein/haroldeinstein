class ChangeSortIndexToIntegerOnProject < ActiveRecord::Migration[5.0]
  def change
    remove_column :projects, :sort_index
    add_column :projects, :sort_index, :integer
  end
end
