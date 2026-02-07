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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMemoryGame = void 0;
var AppMemoryGame;
(function (AppMemoryGame) {
    /**
     * 1. Lớp cơ sở (Base Class) định nghĩa các quy tắc chung thông qua kế thừa
     */
    var BaseController = /** @class */ (function () {
        function BaseController() {
        }
        /**
         * Hàm kiểm tra tên người dùng dùng chung cho các controller
         * @param name Tên nhập vào từ input
         */
        BaseController.prototype.validatePlayerName = function (name) {
            if (!name || name.trim() === '') {
                throw new Error("Tên người chơi không được để trống.");
            }
        };
        return BaseController;
    }());
    /**
     * 2. GameController kế thừa từ BaseController
     */
    var GameController = /** @class */ (function (_super) {
        __extends(GameController, _super);
        function GameController(model, view) {
            var _this = _super.call(this) || this; // Gọi constructor của lớp cha (BaseController)
            _this.model = model;
            _this.view = view;
            _this.flippedCards = [];
            _this.initEvents();
            return _this;
        }
        /**
         * Triển khai hàm initEvents để lắng nghe các tương tác từ người dùng
         */
        GameController.prototype.initEvents = function () {
            var _this = this;
            var _a, _b, _c;
            // Sự kiện nút Bắt đầu & Reset
            (_a = document.querySelector('#start-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.startGame(); });
            (_b = document.querySelector('#reset-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.startGame(); });
            // Sự kiện nút Hủy: Quay lại màn hình đăng nhập và dọn dẹp dữ liệu
            (_c = document.querySelector('#cancel-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
                var loginScreen = document.querySelector('#login-screen');
                var nameInput = document.querySelector('#username');
                var playerNameDisplay = document.querySelector('#current-player');
                var pokemonWrapper = document.querySelector('.pokemonWrapper');
                if (loginScreen)
                    loginScreen.style.display = 'flex';
                if (nameInput)
                    nameInput.value = '';
                if (playerNameDisplay)
                    playerNameDisplay.textContent = '---';
                if (pokemonWrapper)
                    pokemonWrapper.innerHTML = '';
                _this.model.resetState();
                _this.view.updateScore(0);
                _this.flippedCards = [];
            });
        };
        /**
         * Xử lý logic bắt đầu trò chơi
         */
        GameController.prototype.startGame = function () {
            return __awaiter(this, void 0, void 0, function () {
                var nameInput, playerNameDisplay, errorMessage, playerName, pokemons, loginScreen, e_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            nameInput = document.querySelector('#username');
                            playerNameDisplay = document.querySelector('#current-player');
                            errorMessage = document.querySelector('#error-message');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            playerName = nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.trim();
                            // Sử dụng hàm validate kế thừa từ lớp cha BaseController
                            this.validatePlayerName(playerName);
                            // Cập nhật giao diện nếu tên hợp lệ
                            if (playerNameDisplay)
                                playerNameDisplay.textContent = playerName;
                            if (errorMessage)
                                errorMessage.textContent = "";
                            // Reset trạng thái dữ liệu
                            this.model.resetState();
                            this.view.updateScore(0);
                            return [4 /*yield*/, this.model.fetchPokemons()];
                        case 2:
                            pokemons = _a.sent();
                            if (pokemons.length > 0) {
                                this.view.renderCards(pokemons, function (card) { return _this.handleFlip(card); });
                                loginScreen = document.querySelector('#login-screen');
                                if (loginScreen)
                                    loginScreen.style.display = 'none';
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            // Hiển thị lỗi thông qua khối catch (bắt Error từ validatePlayerName)
                            if (errorMessage)
                                errorMessage.textContent = e_1.message;
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Xử lý hiệu ứng và logic khi người dùng click lật thẻ
         */
        GameController.prototype.handleFlip = function (card) {
            if (card.classList.contains('flipped') || this.flippedCards.length === 2)
                return;
            card.classList.add('flipped');
            this.flippedCards.push(card);
            if (this.flippedCards.length === 2) {
                this.checkMatch();
            }
        };
        /**
         * Kiểm tra xem 2 thẻ đã lật có giống nhau không
         */
        GameController.prototype.checkMatch = function () {
            var _this = this;
            var _a = this.flippedCards, c1 = _a[0], c2 = _a[1];
            if (c1.dataset.id === c2.dataset.id) {
                // Trường hợp khớp: Đánh dấu và cộng điểm
                c1.classList.add('matched');
                c2.classList.add('matched');
                this.model.matchedCount++;
                this.model.updateScore(100);
                this.view.updateScore(this.model.score);
                this.flippedCards = [];
                // Kiểm tra điều kiện thắng cuộc
                if (this.model.matchedCount === this.model.totalPairs) {
                    this.view.showAlert("Ch\u00FAc m\u1EEBng! B\u1EA1n th\u1EAFng v\u1EDBi ".concat(this.model.score, " \u0111i\u1EC3m!"));
                }
            }
            else {
                // Trường hợp không khớp: Lật úp lại sau 1 giây
                setTimeout(function () {
                    c1.classList.remove('flipped');
                    c2.classList.remove('flipped');
                    _this.flippedCards = [];
                }, 1000);
            }
        };
        return GameController;
    }(BaseController));
    AppMemoryGame.GameController = GameController;
})(AppMemoryGame || (exports.AppMemoryGame = AppMemoryGame = {}));
