# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])

apps = [
  %w(Facebook https://fbstatic-a.akamaihd.net/rsrc.php/v2/yf/r/wFSNrk6UZBA.css),
  %w(Twitter https://abs.twimg.com/a/1440037003/css/t1/twitter_core.bundle.css),
  %w(Time.gov http://www.time.gov/lps/includes/embed-compressed.js),
  %w(Google https://www.google.com/images/srpr/logo11w.png),
  %w(IRS http://www.irs.gov/static_assets/css/style.css)
]

apps.each do |name, url|
  App.create(name: name, url: url)
end
