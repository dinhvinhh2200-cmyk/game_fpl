import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { IsString, IsInt, validate } from "class-validator";
import _ from "lodash"; // Sử dụng Lodash

export namespace AppMemoryGame {
    // 1. Interface
    export interface IPokemonData {
        id: number;
        name: string;
    }

    // 2. Intersection Type: Kết hợp dữ liệu API và hình ảnh
    export type PokemonEntity = IPokemonData & { sprites: { front_default: string } };

    // 3. Class & Class Validator: Định nghĩa Model chuẩn hóa
    export class Pokemon {
        @IsInt() id!: number;
        @IsString() name!: string;
        sprites!: { front_default: string };
    }

    // 4. Generic & Inheritance: Lớp cơ sở dùng Generic
    abstract class BaseModel<T> {
        public score: number = 0;
        public abstract items: T[];
        public updateScore(points: number): void { this.score += points; }
    }

    export class GameModel extends BaseModel<Pokemon> {
        public items: Pokemon[] = [];
        public matchedCount: number = 0;
        public readonly totalPairs: number = 10;

        // 5. Sử dụng Generic trong Method và Lodash để trộn
        public async fetchPokemons(): Promise<Pokemon[]> {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
            const data = await res.json();
            
            // Nhân đôi mảng
            const rawData = [...data.results, ...data.results];
            
            const promises = rawData.map(p => 
                fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`).then(r => r.json())
            );
            const results = await Promise.all(promises);

            // 6. Class Transformer: Chuyển đổi dữ liệu thô sang Class Instance
            this.items = results.map(item => plainToInstance(Pokemon, item));

            // 7. Lodash: Sử dụng _.shuffle thay vì sort ngẫu nhiên
            return _.shuffle(this.items);
        }

        public resetState(): void {
            this.score = 0;
            this.matchedCount = 0;
        }
    }
}