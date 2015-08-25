# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])

App.delete_all

apps = [
  ['Facebook', ['https://fbstatic-a.akamaihd.net/rsrc.php/v2/yf/r/wFSNrk6UZBA.css']],
  ['Twitter', ['https://abs.twimg.com/a/1440364555/css/t1/twitter_core.bundle.css']],
  ['Time.gov', ['http://www.time.gov/lps/includes/embed-compressed.js',
                'http://www.time.gov/nist_time.lzx.js']],
  ['GitHub', ['https://assets-cdn.github.com/assets/github2/index-9f11074052a3551cd7bae2fba8b949844d2d7329927a7f1cb5a2c2a821f016e0.css']],
  ['This American Life', ['http://www.thisamericanlife.org/sites/default/files/js/js_8616ee480b34739f5bdf8d18679e22fe.js']]
]

apps.each do |name, urls|
  App.create(name: name, urls: urls)
end
