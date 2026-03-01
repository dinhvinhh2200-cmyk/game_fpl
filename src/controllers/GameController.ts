import { AppMemoryGame as M } from "../model/GameModel";
import { AppMemoryGame as V } from "../views/GameView";

export namespace AppMemoryGame {
    // 8. Custom Decorator: Ghi log bước đi
    function LogAction(target: any, key: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            console.log(`[ACTION]: ${key} đang thực thi...`);
            return original.apply(this, args);
        };
    }

    abstract class BaseController {
        protected abstract initEvents(): void;
        protected validateName(name: string): void {
            if (!name || name.trim() === "") throw new Error("Tên trống!");
        }
    }

    export class GameController extends BaseController {
        private flippedCards: HTMLElement[] = [];

        constructor(private model: M.GameModel, private view: V.GameView) {
            super();
            this.initEvents();
        }

        protected initEvents(): void {
            document.querySelector('#start-btn')?.addEventListener('click', () => this.startGame());
            // Nút Hủy (Quay lại đăng nhập)
            document.querySelector('#cancel-btn')?.addEventListener('click', () => this.cancelGame());

            // Nút Reset (Chơi lại từ đầu)
            document.querySelector('#reset-btn')?.addEventListener('click', () => this.resetGame());
        }

        // 9. Sử dụng Decorator

        @LogAction
        public cancelGame(): void {
            this.model.resetState(); // Reset dữ liệu trong model
            this.view.updateScore(0); // Reset điểm trên giao diện
            this.view.showLoginScreen(); // Hiện lại màn hình login
        }

        @LogAction
        public async resetGame(): Promise<void> {
            // Reset logic tương tự startGame nhưng không ẩn màn hình login (vì đang ở trong game)
            this.model.resetState();
            this.view.updateScore(0);
            const pokemons = await this.model.fetchPokemons();
            this.view.renderCards(pokemons, (card) => this.handleFlip(card));
        }

        @LogAction
        public async startGame(): Promise<void> {
            try {
                const name = (document.querySelector('#username') as HTMLInputElement).value;
                this.validateName(name);

                this.view.updatePlayerName(name);

                this.model.resetState();
                const pokemons = await this.model.fetchPokemons();

                this.view.renderCards(pokemons, (card) => this.handleFlip(card));
                (document.querySelector('#login-screen') as HTMLElement).style.display = 'none';
            } catch (e: any) {
                alert(e.message);
            }
        }

        @LogAction
        private handleFlip(card: HTMLElement): void {
            // Logic lật thẻ...
            // 1. Không cho lật nếu thẻ đã lật rồi, đã khớp, hoặc đang có 2 thẻ đang chờ xử lý
            if (card.classList.contains('flipped') ||
                card.classList.contains('matched') ||
                this.flippedCards.length === 2) return;

            // 2. Thêm hiệu ứng lật CSS
            card.classList.add('flipped');
            this.flippedCards.push(card);

            // 3. Nếu lật đủ 2 thẻ thì kiểm tra khớp
            if (this.flippedCards.length === 2) {
                this.checkMatch();
            }
        }

        /**
         * LOGIC KIỂM TRA TRÙNG KHỚP
         */
        private checkMatch(): void {
            const [card1, card2] = this.flippedCards;
            const id1 = card1.dataset.id;
            const id2 = card2.dataset.id;

            if (id1 === id2) {
                // TRƯỜNG HỢP KHỚP
                card1.classList.add('matched');
                card2.classList.add('matched');

                this.model.matchedCount++;
                this.model.updateScore(100); // Cộng 100 điểm
                this.view.updateScore(this.model.score);

                this.flippedCards = [];

                // Kiểm tra chiến thắng
                if (this.model.matchedCount === this.model.totalPairs) {
                    this.view.showAlert(`Chúc mừng! Bạn đã thắng với ${this.model.score} điểm!`);
                }
            } else {
                // TRƯỜNG HỢP KHÔNG KHỚP: Úp lại sau 1 giây
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    this.flippedCards = [];
                }, 1000);
            }

        }
    }
}