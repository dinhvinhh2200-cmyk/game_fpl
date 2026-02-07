var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var AppMemoryGame;
(function (AppMemoryGame) {
    /**
     * 1. Lớp cơ sở (Base Class) định nghĩa các quy tắc chung thông qua kế thừa
     */
    class BaseController {
        /**
         * Hàm kiểm tra tên người dùng dùng chung cho các controller
         * @param name Tên nhập vào từ input
         */
        validatePlayerName(name) {
            if (!name || name.trim() === '') {
                throw new Error("Tên người chơi không được để trống.");
            }
        }
    }
    /**
     * 2. GameController kế thừa từ BaseController
     */
    class GameController extends BaseController {
        constructor(model, view) {
            super(); // Gọi constructor của lớp cha (BaseController)
            this.model = model;
            this.view = view;
            this.flippedCards = [];
            this.initEvents();
        }
        /**
         * Triển khai hàm initEvents để lắng nghe các tương tác từ người dùng
         */
        initEvents() {
            var _a, _b, _c;
            // Sự kiện nút Bắt đầu & Reset
            (_a = document.querySelector('#start-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.startGame());
            (_b = document.querySelector('#reset-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.startGame());
            // Sự kiện nút Hủy: Quay lại màn hình đăng nhập và dọn dẹp dữ liệu
            (_c = document.querySelector('#cancel-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                const loginScreen = document.querySelector('#login-screen');
                const nameInput = document.querySelector('#username');
                const playerNameDisplay = document.querySelector('#current-player');
                const pokemonWrapper = document.querySelector('.pokemonWrapper');
                if (loginScreen)
                    loginScreen.style.display = 'flex';
                if (nameInput)
                    nameInput.value = '';
                if (playerNameDisplay)
                    playerNameDisplay.textContent = '---';
                if (pokemonWrapper)
                    pokemonWrapper.innerHTML = '';
                this.model.resetState();
                this.view.updateScore(0);
                this.flippedCards = [];
            });
        }
        /**
         * Xử lý logic bắt đầu trò chơi
         */
        startGame() {
            return __awaiter(this, void 0, void 0, function* () {
                const nameInput = document.querySelector('#username');
                const playerNameDisplay = document.querySelector('#current-player');
                const errorMessage = document.querySelector('#error-message');
                try {
                    const playerName = nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.trim();
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
                    // Lấy dữ liệu Pokemon từ API
                    const pokemons = yield this.model.fetchPokemons();
                    if (pokemons.length > 0) {
                        this.view.renderCards(pokemons, (card) => this.handleFlip(card));
                        // Ẩn màn hình đăng nhập để vào game
                        const loginScreen = document.querySelector('#login-screen');
                        if (loginScreen)
                            loginScreen.style.display = 'none';
                    }
                }
                catch (e) {
                    // Hiển thị lỗi thông qua khối catch (bắt Error từ validatePlayerName)
                    if (errorMessage)
                        errorMessage.textContent = e.message;
                }
            });
        }
        /**
         * Xử lý hiệu ứng và logic khi người dùng click lật thẻ
         */
        handleFlip(card) {
            if (card.classList.contains('flipped') || this.flippedCards.length === 2)
                return;
            card.classList.add('flipped');
            this.flippedCards.push(card);
            if (this.flippedCards.length === 2) {
                this.checkMatch();
            }
        }
        /**
         * Kiểm tra xem 2 thẻ đã lật có giống nhau không
         */
        checkMatch() {
            const [c1, c2] = this.flippedCards;
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
                    this.view.showAlert(`Chúc mừng! Bạn thắng với ${this.model.score} điểm!`);
                }
            }
            else {
                // Trường hợp không khớp: Lật úp lại sau 1 giây
                setTimeout(() => {
                    c1.classList.remove('flipped');
                    c2.classList.remove('flipped');
                    this.flippedCards = [];
                }, 1000);
            }
        }
    }
    AppMemoryGame.GameController = GameController;
})(AppMemoryGame || (AppMemoryGame = {}));
