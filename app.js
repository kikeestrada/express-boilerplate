const
    express             = require('express'),
    createError         = require('http-errors'),
    logger              = require('morgan'),
    cookieParser        = require('cookie-parser'),
    favicon             = require('serve-favicon'), 
    session             = require('express-session'),
    sassMiddleware      = require('node-sass-middleware'),
    browserify_express  = require('babelify-express'), 
    routes              = require('./routes/index'), 
    app                 = express();
    
app
    .set('views', `${__dirname}/src/pug/pages`)
    .set('view engine', 'pug')

    .set('port', (process.env.PORT || 3000))
    .use(favicon(`${__dirname}/public/img/favicon.png`))
    .use(logger('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(session({
        secret              : 'ssshhhhh',
        saveUninitialized   : true,
        resave              : true
    })) 
    .use(sassMiddleware({
        src                 : `${__dirname}./src/scss/styles.scss`,
        dest                : `${__dirname}./public/css`,
        debug               : true,
        indentedSyntax      : false, // true = .sass and false = .scss
        outputStyle         : 'compressed',      
        sourceMap           : true,
    })) 
    .use(browserify_express({
        entry               : `${__dirname}/src/scripts/index.js`,
        watch               : `${__dirname}/src/scripts/**/*.js`,
        mount               : `${__dirname}/public/js/scripts.js`,
        verbose             : true,
        minify              : false,
        bundle_opts         : { debug: true },
        write_file          : `${__dirname}/public/js/scripts.js`,
        ignore: ['optional.js'] // optional array of files to ignore
    }))
    .use(express.static(`${__dirname}/public`))
    .use(routes)
    .use((req, res, next) => next(createError(404)))
    .use((err, req, res, next) => {
        res.status(err.status || 500)
        res.render('error', { err })
    });
module.exports = app;  