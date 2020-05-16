module.exports = {
  apps : [{
    name: 'esc',
    script: 'nestjs/dist/main.js',
    instances: 1,
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '128.199.216.159',
      ref  : 'origin/neo',
      repo : 'https://github.com/krist7599555/esc.git',
      path : '/root/esc',
      'post-deploy' : 'make'
    }
  }
};
