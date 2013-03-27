#!/usr/bin/env ruby

require 'cocoapods'
require 'rake'

data = {}
Dir.glob("#{ENV['HOME']}/.cocoapods/master/*/*/*.podspec").each do |f|
  begin
    pod = eval(open(f).read)
    data[pod.name] = {description: pod.description, homepage: pod.homepage}
  rescue
  end
end

data.each_key do |k|
  puts "## [#{k}](#{data[k][:homepage]})"
  puts "#{data[k][:description]}"
end
