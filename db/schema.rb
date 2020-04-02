# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131204154330) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "projects", id: :serial, force: :cascade do |t|
    t.string "title"
    t.string "video_url"
    t.string "vimeo_id"
    t.string "thumbnail_small"
    t.string "thumbnail_medium"
    t.string "thumbnail_large"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sort_index"
    t.index ["vimeo_id"], name: "index_projects_on_vimeo_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_users_on_username"
  end

end
