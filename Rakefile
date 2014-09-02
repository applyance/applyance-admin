desc "Start server (via rerun)"
task :start do
  sh "rerun --dir routes,helpers,lib,config --signal KILL -- thin start --debug --port 3003 --environment development"
end
