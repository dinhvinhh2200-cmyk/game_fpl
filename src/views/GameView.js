"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMemoryGame = void 0;
var AppMemoryGame;
(function (AppMemoryGame) {
    /**
     * Lớp GameView chịu trách nhiệm quản lý hiển thị và tương tác DOM
     */
    var GameView = /** @class */ (function () {
        function GameView() {
            // Truy vấn các phần tử giao diện cần thiết
            this.wrapper = document.querySelector('.pokemonWrapper');
            this.scoreEl = document.querySelector('#score');
        }
        /**
         * Render danh sách các thẻ bài Pokemon lên màn hình
         * @param data Danh sách chi tiết Pokemon (IPokemonDetail) từ Model
         * @param handleFlip Hàm callback xử lý sự kiện lật thẻ truyền từ Controller
         */
        GameView.prototype.renderCards = function (data, handleFlip) {
            if (!this.wrapper)
                return;
            // Tạo cấu trúc HTML cho từng thẻ bài
            this.wrapper.innerHTML = data.map(function (p) { return "\n                <div class=\"pokemon\" data-id=\"".concat(p.id, "\">\n                    <div class=\"pokemon-card\"> \n                        <div class=\"card-face front\"></div>\n                        <div class=\"card-face back\">\n                            <img src=\"").concat(p.sprites.front_default, "\" alt=\"").concat(p.name, "\" />\n                        </div>\n                    </div>\n                </div>\n            "); }).join('');
            // Lắng nghe sự kiện click trên từng thẻ bài vừa tạo
            this.wrapper.querySelectorAll('.pokemon').forEach(function (card) {
                card.addEventListener('click', function () { return handleFlip(card); });
            });
        };
        /**
         * Cập nhật điểm số hiện tại lên giao diện
         * @param score Giá trị điểm số từ Model
         */
        GameView.prototype.updateScore = function (score) {
            if (this.scoreEl) {
                this.scoreEl.textContent = score.toString();
            }
        };
        /**
         * Hiển thị thông báo (ví dụ: chúc mừng khi thắng)
         * @param message Nội dung thông báo
         */
        GameView.prototype.showAlert = function (message) {
            // Sử dụng setTimeout để đảm bảo hiệu ứng lật thẻ hoàn tất trước khi hiện alert
            setTimeout(function () { return alert(message); }, 500);
        };
        return GameView;
    }());
    AppMemoryGame.GameView = GameView;
})(AppMemoryGame || (exports.AppMemoryGame = AppMemoryGame = {}));
