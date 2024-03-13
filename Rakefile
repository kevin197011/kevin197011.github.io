# frozen_string_literal: true

# Copyright (c) 2024 Kk
#
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

require 'time'

task default: %w[push]

task :push do
  system 'git add .'
  system "git commit -m 'Update #{Time.now}.'"
  system 'git pull'
  system 'git push origin main'
end

task :fmt do
  system 'rubocop -A'
end

task :p do
  system 'jekyll post'
end

task :run do
  system 'jekyll serve --watch'
end
