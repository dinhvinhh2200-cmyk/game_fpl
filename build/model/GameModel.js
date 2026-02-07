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
     * Lớp trừu tượng cơ sở cho các loại trò chơi
     * Quản lý các thuộc tính chung như điểm số
     */
    class BaseModel {
        constructor() {
            this.score = 0;
        }
        // Phương thức dùng chung để cập nhật điểm
        updateScore(points) {
            this.score += points;
        }
    }
    /**
     * GameModel kế thừa từ BaseModel
     * Sử dụng 'extends' để tái sử dụng logic quản lý điểm số
     */
    class GameModel extends BaseModel {
        constructor() {
            super(...arguments);
            this.matchedCount = 0;
            this.totalPairs = 10;
            this.apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';
        }
        /**
         * Lấy dữ liệu từ PokeAPI và chuẩn bị danh sách thẻ bài
         */
        fetchPokemons() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const res = yield fetch(this.apiUrl);
                    if (!res.ok)
                        throw new Error("Lỗi kết nối API");
                    const data = yield res.json();
                    // Nhân đôi danh sách kết quả để tạo thành các cặp thẻ bài giống nhau
                    const doubleData = [...data.results, ...data.results];
                    // Gọi chi tiết từng Pokemon để lấy hình ảnh (sprites)
                    const promises = doubleData.map(p => fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`).then(r => r.json()));
                    const pokemonArr = yield Promise.all(promises);
                    // Trộn ngẫu nhiên vị trí các thẻ bài bằng thuật toán sort đơn giản
                    return pokemonArr.sort(() => Math.random() - 0.5);
                }
                catch (error) {
                    console.error("Lỗi lấy dữ liệu từ API:", error);
                    return [];
                }
            });
        }
        /**
         * Triển khai phương thức resetState từ lớp cha
         * Đưa điểm số và số cặp đã khớp về giá trị ban đầu
         */
        resetState() {
            this.score = 0; // Thuộc tính kế thừa từ BaseModel
            this.matchedCount = 0;
        }
    }
    AppMemoryGame.GameModel = GameModel;
})(AppMemoryGame || (AppMemoryGame = {}));
