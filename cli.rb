#!/usr/bin/env ruby

CMDS = [:angular, :rails, :rethinkdb]

mode = ARGV.empty? ? nil : CMDS[ARGV.first().to_i - 1]

begin
  require "tty-prompt"
rescue LoadError
  system "gem install tty-prompt"
end
require "tty-prompt"

if mode.nil?
  prompt = TTY::Prompt.new
  mode = prompt.select("What you want to run?") do |menu|
    menu.choice :angular
    menu.choice :rails
    menu.choice :rethinkdb
  end
end


case mode.to_sym
when :angular;   system "cd #{__dir__}/angular; yarn dev"
when :rails;     system "cd #{__dir__}/rails; bash ./dev.sh"
when :rethinkdb; system "rethinkdb --no-update-check"
end