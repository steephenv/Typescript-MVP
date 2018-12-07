"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const got = require("got");
describe('test', () => {
    test('testing for humans', done => {
        got('http://localhost:7000/humans.txt', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
            .then(() => done())
            .catch(err => {
            throw err;
        });
    });
});
