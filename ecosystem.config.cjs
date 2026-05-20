module.exports = {
  apps: [{
    name: 'sparkmind-v7',
    script: 'npx',
    // D1 binding enabled — `--local` auto-creates SQLite in .wrangler/state/v3/d1
    args: 'wrangler pages dev dist --d1=DB --local --ip 0.0.0.0 --port 3000',
    env: { NODE_ENV: 'development', PORT: 3000 },
    watch: false,
    instances: 1,
    exec_mode: 'fork'
  }]
}
