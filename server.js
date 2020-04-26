const 
    app = require('./app'),
    c = console.log;

app.listen(
  app.get('port'),
  () => c(`Iniciando Express en el puerto ${app.get('port')}`)
)