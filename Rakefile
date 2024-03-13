# frozen_string_literal: true

# Copyright (c) 2024 Kk
#
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

require 'time'
require 'erb'
require 'date'
require 'rake'
require 'fileutils'

task default: %w[push]

task :push do
  Rake::Task[:fmt].invoke
  Rake::Task[:build].invoke
  system 'git add .'
  system "git commit -m 'Update #{Time.now}.'"
  system 'git pull'
  system 'git push origin main'
end

task :fmt do
  system 'rubocop -A'
end

# rake post['title']
task :post, [:title] do |_, args|
  @title = args[:title] || 'Untitled'
  @date = Date.today.strftime('%Y-%m-%d')
  template_path = 'templates/post.md.erb'
  output_directory = '_posts'
  output_filename = "#{@date}-#{@title.downcase.gsub(/\s+/, '-')}.md"
  output_path = File.join(output_directory, output_filename)
  template_content = File.read(template_path)
  template = ERB.new(template_content)
  post_content = template.result(binding)

  FileUtils.mkdir_p(output_directory)
  File.write(output_path, post_content)

  puts "New post generated at #{output_path}"
end

task :run do
  system 'jekyll serve --watch'
end

task :build do
  system 'jekyll build'
end
