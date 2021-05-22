const Hapi = require('@hapi/hapi'),
    path = require('path'),
    Config = require('./Config'),
    winston = require('winston'),
    mongoose = require('mongoose');
const { REPL_MODE_SLOPPY } = require('repl');
const Models = require('./Models/'),
    DAO = require('./DAOManager').queries,
    SocketManager = require('./Libs/SocketManager');
Scheduler = require('./Libs/Scheduler');



if (process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'testing'
    && process.env.NODE_ENV !== 'client') {
    process.env.NODE_ENV = 'development'
}

Routes = require('./Routes');
Plugins = require('./Plugins');
Bootstrap = require('./Utils/Bootstrap')


process.env.NODE_CONFIG_DIR = __dirname + '/Config/';



const init = async () => {

    const server = Hapi.Server({
        app: {
            name: Config.APP_CONSTANTS.SERVER.APP_NAME
        },
        port: Config[process.env.NODE_ENV].port,
        routes: {
            cors: true
        }
    });
    await server.register(Plugins);

    await server.route(Routes);

    server.views({
        engines: {
          html: require('handlebars')
        },
        path: './public',
        
      })
    

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
            path: '/qwe/{file*}',
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


    server.events.on('response', request => {
    });


    try {
        await server.start();
        SocketManager.connectSocket();
        Scheduler.resetPrice()

    } catch (error) {
    }
};


process.on('uncaughtException', (code) => {
});

process.on('unhandledRejection', (code) => {
});

init();
