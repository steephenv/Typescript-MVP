"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticatedUserRoles = [
    'super-admin',
    'high-authority-admin',
    'low-authority-admin',
    'manufacturer',
    'distributor',
];
exports.assigning = {
    'GET:/assigning/call-schedules': {
        allow: authenticatedUserRoles,
    },
    'POST:/assigning/new': {
        allow: ['super-admin', 'high-authority-admin', 'low-authority-admin'],
    },
    'GET:/assigning/suggestions': {
        allow: ['manufacturer', 'distributor'],
    },
    'GET:/assigning/distributer': {
        allow: authenticatedUserRoles,
    },
    'POST:/assigning/requests': {
        allow: ['manufacturer'],
    },
    'POST:/assigning/schedule-call': {
        allow: ['manufacturer'],
    },
    'PATCH:/assigning/call-request/(\\d+)': {
        allow: authenticatedUserRoles,
    },
    'POST:/assigning/update-interest': {
        allow: authenticatedUserRoles,
    },
    'POST:/assigning/visitors/schedule-call': {
        allow: ['all'],
    },
};
