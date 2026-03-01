// Import namespace AppMemoryGame từ file Model để sử dụng các Interface dữ liệu
import { AppMemoryGame as M } from "../model/GameModel";
export namespace AppMemoryGame {
    /**
     * Lớp GameView chịu trách nhiệm quản lý hiển thị và tương tác DOM
     */
    export class GameView {
        // Truy vấn các phần tử giao diện cần thiết
        private wrapper = document.querySelector('.pokemonWrapper') as HTMLElement;
        private scoreEl = document.querySelector('#score') as HTMLElement;
        /**
         * Render danh sách các thẻ bài Pokemon lên màn hình
         * @param data Danh sách chi tiết Pokemon (IPokemonDetail) từ Model
         * @param handleFlip Hàm callback xử lý sự kiện lật thẻ truyền từ Controller
         */
        public renderCards(data: M.IPokemonData[], handleFlip: (card: HTMLElement) => void): void {
            if (!this.wrapper) return;
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
                card.addEventListener('click', () => handleFlip(card as HTMLElement));
            });
        }
        /**
         * Cập nhật điểm số hiện tại lên giao diện
         * @param score Giá trị điểm số từ Model
         */
        public updateScore(score: number): void {
            if (this.scoreEl) {
                this.scoreEl.textContent = score.toString();
            }
        }
        /**
         * Hiển thị thông báo (ví dụ: chúc mừng khi thắng)
         * @param message Nội dung thông báo
         */
        public showAlert(message: string): void {
            // Sử dụng setTimeout để đảm bảo hiệu ứng lật thẻ hoàn tất trước khi hiện alert
            setTimeout(() => alert(message), 500);
        }
    }
}