"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import các namespace từ các file thành phần
var GameModel_js_1 = require("./model/GameModel.js");
var GameView_js_1 = require("./views/GameView.js");
var GameController_js_1 = require("./controllers/GameController.js");
/**
 * KHỞI TẠO CÁC THÀNH PHẦN THEO MÔ HÌNH MVC
 * Các lớp đều nằm trong namespace AppMemoryGame
 */
// 1. Khởi tạo Model (Quản lý dữ liệu và logic nghiệp vụ)
var model = new GameModel_js_1.AppMemoryGame.GameModel();
// 2. Khởi tạo View (Quản lý giao diện và hiển thị DOM)
var view = new GameView_js_1.AppMemoryGame.GameView();
// 3. Khởi tạo Controller (Điều phối giữa Model và View)
// Controller nhận vào thực thể của Model và View thông qua constructor
var controller = new GameController_js_1.AppMemoryGame.GameController(model, view);
console.log("MVC Pokemon Game với Namespace và Extends đã sẵn sàng!");
