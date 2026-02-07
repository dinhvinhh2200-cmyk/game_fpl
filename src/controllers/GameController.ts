// Import namespace từ Model và View bằng bí danh (alias)
import { AppMemoryGame as M } from "../model/GameModel.js";
import { AppMemoryGame as V } from "../views/GameView.js";

export namespace AppMemoryGame {
    /**
     * 1. Lớp cơ sở (Base Class) định nghĩa các quy tắc chung thông qua kế thừa
     */
    abstract class BaseController {
        // Ép buộc các lớp con phải triển khai hàm khởi tạo sự kiện
        protected abstract initEvents(): void;
        /**
         * Hàm kiểm tra tên người dùng dùng chung cho các controller
         * @param name Tên nhập vào từ input
         */
        protected validatePlayerName(name: string): void {
            if (!name || name.trim() === '') {
                throw new Error("Tên người chơi không được để trống.");
            }
        }
    }
    /**
     * 2. GameController kế thừa từ BaseController
     */
    export class GameController extends BaseController {
        private flippedCards: HTMLElement[] = [];
        constructor(private model: M.GameModel, private view: V.GameView) {
            super(); // Gọi constructor của lớp cha (BaseController)
            this.initEvents();
        }
        /**
         * Triển khai hàm initEvents để lắng nghe các tương tác từ người dùng
         */
        protected initEvents(): void {
            // Sự kiện nút Bắt đầu & Reset
            document.querySelector('#start-btn')?.addEventListener('click', () => this.startGame());
            document.querySelector('#reset-btn')?.addEventListener('click', () => this.startGame());
            // Sự kiện nút Hủy: Quay lại màn hình đăng nhập và dọn dẹp dữ liệu
            document.querySelector('#cancel-btn')?.addEventListener('click', () => {
                const loginScreen = document.querySelector('#login-screen') as HTMLElement;
                const nameInput = document.querySelector('#username') as HTMLInputElement;
                const playerNameDisplay = document.querySelector('#current-player') as HTMLElement;
                const pokemonWrapper = document.querySelector('.pokemonWrapper') as HTMLElement;

                if (loginScreen) loginScreen.style.display = 'flex';
                if (nameInput) nameInput.value = '';
                if (playerNameDisplay) playerNameDisplay.textContent = '---';
                if (pokemonWrapper) pokemonWrapper.innerHTML = '';

                this.model.resetState();
                this.view.updateScore(0);
                this.flippedCards = [];
            });
        }
        /**
         * Xử lý logic bắt đầu trò chơi
         */
        public async startGame(): Promise<void> {
            const nameInput = document.querySelector('#username') as HTMLInputElement;
            const playerNameDisplay = document.querySelector('#current-player') as HTMLElement;
            const errorMessage = document.querySelector('#error-message') as HTMLElement;

            try {
                const playerName = nameInput?.value.trim();

                // Sử dụng hàm validate kế thừa từ lớp cha BaseController
                this.validatePlayerName(playerName);
                // Cập nhật giao diện nếu tên hợp lệ
                if (playerNameDisplay) playerNameDisplay.textContent = playerName;
                if (errorMessage) errorMessage.textContent = "";
                // Reset trạng thái dữ liệu
                this.model.resetState();
                this.view.updateScore(0);
                // Lấy dữ liệu Pokemon từ API
                const pokemons = await this.model.fetchPokemons();
                if (pokemons.length > 0) {
                    this.view.renderCards(pokemons, (card) => this.handleFlip(card));
                    // Ẩn màn hình đăng nhập để vào game
                    const loginScreen = document.querySelector('#login-screen') as HTMLElement;
                    if (loginScreen) loginScreen.style.display = 'none';
                }
            } catch (e: any) {
                // Hiển thị lỗi thông qua khối catch (bắt Error từ validatePlayerName)
                if (errorMessage) errorMessage.textContent = e.message;
            }
        }
        /**
         * Xử lý hiệu ứng và logic khi người dùng click lật thẻ
         */
        private handleFlip(card: HTMLElement): void {
            if (card.classList.contains('flipped') || this.flippedCards.length === 2) return;
            card.classList.add('flipped');
            this.flippedCards.push(card);
            if (this.flippedCards.length === 2) {
                this.checkMatch();
            }
        }
        /**
         * Kiểm tra xem 2 thẻ đã lật có giống nhau không
         */
        private checkMatch(): void {
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
            } else {
                // Trường hợp không khớp: Lật úp lại sau 1 giây
                setTimeout(() => {
                    c1.classList.remove('flipped');
                    c2.classList.remove('flipped');
                    this.flippedCards = [];
                }, 1000);
            }
        }
    }
}