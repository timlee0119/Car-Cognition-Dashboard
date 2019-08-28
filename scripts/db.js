var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');

var defaultConfig = {
    authentication: {
        options: {
            userName: 'car', // update me
            password: 'Admin123' // update me
        },
        type: 'default'
    },
    server: 'carcognitionsql.database.windows.net', // update me
    options: {
        database: 'TimTestDB', //update me
        encrypt: true
    }
};

class DatabaseWriter {
    constructor(config = defaultConfig) {
        this.config = config;
        this.connection = undefined;
    }

    async connectDB() {
        this.connection = new Connection(this.config);
        return await new Promise((res, rej) => {
            this.connection.on('connect', err => {
                if (err) {
                    rej('DB connection failed');
                } else {
                    res('Connected to database: ' + this.config.options.database);
                }
            })
        });
    }

    async writeData(data) {
        let request;
        const requestCallback = (err, rowCount) => {
            if (err) {
                console.log('Insert data fail, error: ' + err);
            }
            else {
                console.log(rowCount + ' rows inserted to table.');
            }
        };
        // Person or Dog deteced, write to InCarTable
        if (data.Position) {
            request = new Request(
                "INSERT INTO dbo.InCarTable (DeviceID, FrameID, Name, Label, Age, Gender, Emotion, Behavior, Confidence, X1, Y1, X2, Y2, TimeStamp) VALUES (@DeviceID, @FrameID, @Name, @Label, @Age, @Gender, @Emotion, @Behavior, @Confidence, @X1, @Y1, @X2, @Y2, @TimeStamp);",
                requestCallback
            );
    
            request.addParameter('DeviceID', TYPES.NVarChar, data.DeviceID, {length:50});
            request.addParameter('FrameID', TYPES.BigInt, data.FrameID);
            request.addParameter('Name', TYPES.NVarChar, data.Name, {length:50});
            request.addParameter('Label', TYPES.NVarChar, data.Label, {length:50});
            request.addParameter('Age', TYPES.NVarChar, data.Age, {length:10});
            request.addParameter('Gender', TYPES.NVarChar, data.Gender, {length:8});
            request.addParameter('Emotion', TYPES.NVarChar, data.Emotion, {length:12});
            request.addParameter('Behavior', TYPES.NChar, data.Behavior, {length:12});
            request.addParameter('Confidence', TYPES.Float, data.Confidence);
            request.addParameter('X1', TYPES.Int, data.Position[0]);
            request.addParameter('Y1', TYPES.Int, data.Position[1]);
            request.addParameter('X2', TYPES.Int, data.Position[2]);
            request.addParameter('Y2', TYPES.Int, data.Position[3]);
            request.addParameter('TimeStamp', TYPES.DateTime, new Date());
        }
        // ALERT detected, wrtie to AlertTable
        else if (data.ALERT) {
            request = new Request(
                "INSERT INTO dbo.AlertTable (DeviceID, FrameID, Alert, TimeStamp) VALUES (@DeviceID, @FrameID, @Alert, @TimeStamp);",
                requestCallback
            );

            request.addParameter('DeviceID', TYPES.NVarChar, data.DeviceID, {length:50});
            request.addParameter('FrameID', TYPES.BigInt, data.FrameID);
            request.addParameter('ALERT', TYPES.NVarChar, data.ALERT, {length:50});
            request.addParameter('TimeStamp', TYPES.DateTime, new Date());
        }
        // Unexpected data
        else {
            console.error('Write db fail (Unexpcted data: )' + JSON.stringify(data));
            return Promise.reject();
        }

        this.connection.execSql(request);
        await new Promise((res) => {
            request.on('requestCompleted', res);
        });
    }
};

module.exports = DatabaseWriter;
