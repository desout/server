import {Connection, createConnection} from 'mysql';

export class Database {
    private connection: Connection;

    constructor(config) {
        this.connection = createConnection(config);
    }

    query(sql, args?): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}
