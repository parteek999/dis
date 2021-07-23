require('dotenv').config();
const Hapi = require('@hapi/hapi'),
    path = require('path'),
    Config = require('./Config'),
    winston = require('winston');

// const hbs = require('hbs')   

Routes = require('./Routes');
Plugins = require('./Plugins');
Bootstrap = require('./Utils/Bootstrap')


process.env.NODE_CONFIG_DIR = __dirname + '/Config/';

const init = async () => {


    const server = Hapi.Server({
        app: {
            name: Config.APP_CONSTANTS.SERVER.APP_NAME
        },
        port: process.env.PORT,
        routes: {
            cors: true
        }
    });

    // Register All Plugins
    await server.register(Plugins);

    // API Routes
    await server.route(Routes);

    server.views({
        engines: {
            html: require('handlebars')
        },
        path: './public',

    })

    // server.views({
    //     engines: {
    //         hbs: require('hbs')  
    //     },
    //     relativeTo: __dirname,
    //     path: 'templates'
    // });



    server.route(
        [{
            method: 'GET',
            path: '/{file*}',
            handler: {
                directory: {
                    path: './uploads'
                }
            },
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/resetPassword/{file*}',
            handler: {
                directory: {
                    path: './public'
                }
            },
            config: {
                auth: false
            }
        }
        ]
    );


    try {
        await server.start();
        // SocketManager.connectSocket();
        // Scheduler.resetPrice()

    } catch (error) {
        winston.log("info", error);
    }
};


process.on('uncaughtException', (code) => {
    console.log(`About to exit with code: ${code}`);
});

process.on('unhandledRejection', (code) => {
    console.log(`About to exit with code: ${code}`);
});

init();
