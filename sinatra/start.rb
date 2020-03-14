require 'sinatra'
require 'sinatra/config_file'

config_file('./settings.yml')

Dir.glob('./{initialize,lib,models,helpers,controllers}/*.rb').each do |file|
  puts 'loading %-12s - %s' % file.split('/')[1, 4]
  require file
end
