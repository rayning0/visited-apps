class App < ActiveRecord::Base
  has_many :visits
  has_many :users, through: :visits

  validates :name, presence: true
  validates :urls, presence: true

  serialize :urls, Array
end
