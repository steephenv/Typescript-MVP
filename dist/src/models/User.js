"use strict";
/* tslint:disable:variable-name */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
exports.description = 'Stores details of user info';
exports.definitions = {
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    mobile: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
};
const userSchema = new mongoose_1.Schema(exports.definitions);
// type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;
/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(candidatePassword, this.password);
    });
};
exports.User = mongoose_1.model('User', userSchema);
