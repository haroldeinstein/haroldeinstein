class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :video_url
      t.string :vimeo_id
      t.string :thumbnail_small
      t.string :thumbnail_medium
      t.string :thumbnail_large
      t.string :sort_index

      t.timestamps
    end

    add_index :projects, :vimeo_id
  end
end
