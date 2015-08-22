class CreateApps < ActiveRecord::Migration
  def change
    create_table :apps do |t|
      t.string :name
      t.string :url

      t.timestamps null: false
    end

    add_index :apps, :name
  end
end
