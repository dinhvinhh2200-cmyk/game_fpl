"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMemoryGame = void 0;
var AppMemoryGame;
(function (AppMemoryGame) {
    /**
     * Lớp trừu tượng cơ sở cho các loại trò chơi
     * Quản lý các thuộc tính chung như điểm số
     */
    var BaseModel = /** @class */ (function () {
        function BaseModel() {
            this.score = 0;
        }
        // Phương thức dùng chung để cập nhật điểm
        BaseModel.prototype.updateScore = function (points) {
            this.score += points;
        };
        return BaseModel;
    }());
    /**
     * GameModel kế thừa từ BaseModel
     * Sử dụng 'extends' để tái sử dụng logic quản lý điểm số
     */
    var GameModel = /** @class */ (function (_super) {
        __extends(GameModel, _super);
        function GameModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.matchedCount = 0;
            _this.totalPairs = 10;
            _this.apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';
            return _this;
        }
        /**
         * Lấy dữ liệu từ PokeAPI và chuẩn bị danh sách thẻ bài
         */
        GameModel.prototype.fetchPokemons = function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, data, doubleData, promises, pokemonArr, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, fetch(this.apiUrl)];
                        case 1:
                            res = _a.sent();
                            if (!res.ok)
                                throw new Error("Lỗi kết nối API");
                            return [4 /*yield*/, res.json()];
                        case 2:
                            data = _a.sent();
                            doubleData = __spreadArray(__spreadArray([], data.results, true), data.results, true);
                            promises = doubleData.map(function (p) {
                                return fetch("https://pokeapi.co/api/v2/pokemon/".concat(p.name)).then(function (r) { return r.json(); });
                            });
                            return [4 /*yield*/, Promise.all(promises)];
                        case 3:
                            pokemonArr = _a.sent();
                            // Trộn ngẫu nhiên vị trí các thẻ bài bằng thuật toán sort đơn giản
                            return [2 /*return*/, pokemonArr.sort(function () { return Math.random() - 0.5; })];
                        case 4:
                            error_1 = _a.sent();
                            console.error("Lỗi lấy dữ liệu từ API:", error_1);
                            return [2 /*return*/, []];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Triển khai phương thức resetState từ lớp cha
         * Đưa điểm số và số cặp đã khớp về giá trị ban đầu
         */
        GameModel.prototype.resetState = function () {
            this.score = 0; // Thuộc tính kế thừa từ BaseModel
            this.matchedCount = 0;
        };
        return GameModel;
    }(BaseModel));
    AppMemoryGame.GameModel = GameModel;
})(AppMemoryGame || (exports.AppMemoryGame = AppMemoryGame = {}));
