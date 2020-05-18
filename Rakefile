# frozen_string_literal: true

task default: %w[push]

task :push do
  sh 'git add .'
  sh 'git pull'
  sh 'git commit -m "update"'
  sh 'git push'
end
