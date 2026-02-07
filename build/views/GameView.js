export var AppMemoryGame;
(function (AppMemoryGame) {
    /**
     * Lớp GameView chịu trách nhiệm quản lý hiển thị và tương tác DOM
     */
    class GameView {
        constructor() {
            // Truy vấn các phần tử giao diện cần thiết
            this.wrapper = document.querySelector('.pokemonWrapper');
            this.scoreEl = document.querySelector('#score');
        }
        /**
         * Render danh sách các thẻ bài Pokemon lên màn hình
         * @param data Danh sách chi tiết Pokemon (IPokemonDetail) từ Model
         * @param handleFlip Hàm callback xử lý sự kiện lật thẻ truyền từ Controller
         */
        renderCards(data, handleFlip) {
            if (!this.wrapper)
                return;
            // Tạo cấu trúc HTML cho từng thẻ bài
            this.wrapper.innerHTML = data.map((p) => `
                <div class="pokemon" data-id="${p.id}">
                    <div class="pokemon-card"> 
                        <div class="card-face front"></div>
                        <div class="card-face back">
                            <img src="${p.sprites.front_default}" alt="${p.name}" />
                        </div>
                    </div>
                </div>
            `).join('');
            // Lắng nghe sự kiện click trên từng thẻ bài vừa tạo
            this.wrapper.querySelectorAll('.pokemon').forEach(card => {
                card.addEventListener('click', () => handleFlip(card));
            });
        }
        /**
         * Cập nhật điểm số hiện tại lên giao diện
         * @param score Giá trị điểm số từ Model
         */
        updateScore(score) {
            if (this.scoreEl) {
                this.scoreEl.textContent = score.toString();
            }
        }
        /**
         * Hiển thị thông báo (ví dụ: chúc mừng khi thắng)
         * @param message Nội dung thông báo
         */
        showAlert(message) {
            // Sử dụng setTimeout để đảm bảo hiệu ứng lật thẻ hoàn tất trước khi hiện alert
            setTimeout(() => alert(message), 500);
        }
    }
    AppMemoryGame.GameView = GameView;
})(AppMemoryGame || (AppMemoryGame = {}));
