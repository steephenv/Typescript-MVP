"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const got = require("got");
describe('Login functionality ==> ', () => {
    it('Login with all credentials', done => {
        got('http://localhost:7000/v1/auth/login', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            json: true,
            body: {
                username: 'stark@marvel.com',
                password: 'password',
            },
        })
            .then(() => done())
            .catch(err => {
            throw err;
        });
    });
    it('Login with all credentials - case sensitive', done => {
        got('http://localhost:7000/v1/auth/login', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            json: true,
            body: {
                username: 'STARK@MARVEL.COM',
                password: 'password',
            },
        })
            .then(() => done())
            .catch(err => {
            throw err;
        });
    });
    it('Login with field missing', done => {
        got('http://localhost:7000/v1/auth/login', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            json: true,
            body: {
                username: 'stark@marvel.com',
            },
        })
            // .then(() => done())
            .catch(err => {
            expect(err.response.statusCode).toBe(422);
            done();
        });
    });
    it('Login with invalid credentials', done => {
        got('http://localhost:7000/v1/auth/login', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            json: true,
            body: {
                username: 'stark@marvel.com',
                password: 'password7',
            },
        }).catch(err => {
            expect(err.response.statusCode).toBe(401);
            done();
        });
    });
});
