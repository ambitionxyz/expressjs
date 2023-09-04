"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseRepository_1 = require("./BaseRepository");
const model_1 = __importDefault(require("../model"));
const index_1 = require("../constants/index");
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(model_1.default.User, "UserRepository");
    }
    generateToken(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._db.findOne({ userName });
            return yield user.generateAuthToken();
        });
    }
    comparePassword(userName, plainPass) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._db.findOne({ userName });
            return yield user.comparePassword(plainPass);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.create(user);
        });
    }
    findByUserNameEmail(userName, emailAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this._db.findOne({ userName });
            if (user)
                return { userName: user.userName };
            let userByEmail = yield this._db.findOne({ emailAddress });
            if (userByEmail)
                return { emailAddress: userByEmail.emailAddress };
            return null;
        });
    }
    filterUserPagging(filterItems, maxResultCount, skipCount, searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            let filterOptions = filterItems.length
                ? filterItems.map((item) => ({
                    [item.propertyName]: item.value,
                }))
                : [];
            if (searchText !== "") {
                let orOpt = index_1.SEARCH_TEXT_FIELD_USER.map((item) => ({
                    [item]: { $regex: searchText },
                }));
                if (orOpt.length)
                    filterOptions.push({ $or: orOpt });
            }
            const findOpt = filterOptions.length ? { $and: filterOptions } : {};
            const items = yield this._db
                .find(findOpt)
                .skip(skipCount)
                .limit(maxResultCount);
            return {
                totalCount: items.length,
                items,
            };
        });
    }
    allUserNotPagging() {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this._db
                .find({
                roleNames: {
                    $in: ["BASICUSER", "PROJECTADMIN", "HR MANAGER", "SUPERVISOR"],
                    $nin: ["ADMIN"],
                },
            })
                .select("avatarFullPath avatarPath branch branchColor branchDisplayName branchId emailAddress id isActive jobTitle level name positionId positionName type userCode");
            return list;
        });
    }
    getAllManager() {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this._db
                .find({
                roleNames: { $in: ["MANAGER"], $nin: ["ADMIN"] },
            })
                .select("name emailAddress isActive type jobTitle level userCode avatarPath avatarFullPath branch branchColor branchDisplayName branchId positionId positionName id");
            return list;
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._db.findOne({ id: userId });
            return user;
        });
    }
    deactiveUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._db.findOneAndUpdate({ id: id }, { isActive: false });
        });
    }
    activeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._db.findOneAndUpdate({ id: id }, { isActive: true });
        });
    }
    deleteUser(idQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._db.findOneAndDelete({ id: idQuery.Id });
        });
    }
    getNameUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._db.findOne({ id: userId });
            return user.name;
        });
    }
}
module.exports = new UserRepository();
//# sourceMappingURL=UserRepository.js.map