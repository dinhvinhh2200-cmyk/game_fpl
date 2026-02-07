// Import các namespace từ các file thành phần
import { AppMemoryGame as M } from "./model/GameModel.js";
import { AppMemoryGame as V } from "./views/GameView.js";
import { AppMemoryGame as C } from "./controllers/GameController.js";

/**
 * KHỞI TẠO CÁC THÀNH PHẦN THEO MÔ HÌNH MVC
 * Các lớp đều nằm trong namespace AppMemoryGame
 */

// 1. Khởi tạo Model (Quản lý dữ liệu và logic nghiệp vụ)
const model = new M.GameModel();

// 2. Khởi tạo View (Quản lý giao diện và hiển thị DOM)
const view = new V.GameView();

// 3. Khởi tạo Controller (Điều phối giữa Model và View)
// Controller nhận vào thực thể của Model và View thông qua constructor
const controller = new C.GameController(model, view);

console.log("MVC Pokemon Game với Namespace và Extends đã sẵn sàng!");