export namespace AppMemoryGame {
    /**
     * Lớp trừu tượng cơ sở cho các loại trò chơi
     * Quản lý các thuộc tính chung như điểm số
     */
    abstract class BaseModel {
        public score: number = 0;
        // Phương thức trừu tượng bắt buộc các lớp con phải có logic reset riêng
        public abstract resetState(): void;
        // Phương thức dùng chung để cập nhật điểm
        public updateScore(points: number): void {
            this.score += points;
        }
    }
    /**
     * Interface định nghĩa cấu trúc dữ liệu Pokemon từ API
     */
    export interface IPokemonDetail {
        id: number;
        name: string;
        sprites: { front_default: string };
    }
    /**
     * GameModel kế thừa từ BaseModel
     * Sử dụng 'extends' để tái sử dụng logic quản lý điểm số
     */
    export class GameModel extends BaseModel {
        public matchedCount: number = 0;
        public readonly totalPairs: number = 10;
        private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon?limit=10';
        /**
         * Lấy dữ liệu từ PokeAPI và chuẩn bị danh sách thẻ bài
         */
        public async fetchPokemons(): Promise<IPokemonDetail[]> {
            try {
                const res = await fetch(this.apiUrl);
                if (!res.ok) throw new Error("Lỗi kết nối API");
                const data = await res.json();
                // Nhân đôi danh sách kết quả để tạo thành các cặp thẻ bài giống nhau
                const doubleData = [...data.results, ...data.results];
                // Gọi chi tiết từng Pokemon để lấy hình ảnh (sprites)
                const promises = doubleData.map(p =>
                    fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`).then(r => r.json())
                );
                const pokemonArr = await Promise.all(promises);
                // Trộn ngẫu nhiên vị trí các thẻ bài bằng thuật toán sort đơn giản
                return pokemonArr.sort(() => Math.random() - 0.5);
            } catch (error) {
                console.error("Lỗi lấy dữ liệu từ API:", error);
                return [];
            }
        }
        /**
         * Triển khai phương thức resetState từ lớp cha
         * Đưa điểm số và số cặp đã khớp về giá trị ban đầu
         */
        public resetState(): void {
            this.score = 0; // Thuộc tính kế thừa từ BaseModel
            this.matchedCount = 0;
        }
    }
}