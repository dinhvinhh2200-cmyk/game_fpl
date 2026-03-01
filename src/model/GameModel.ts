import { plainToInstance } from "class-transformer";
import { IsString, IsInt, validate } from "class-validator";
import _ from "lodash";

export namespace AppMemoryGame {
    // 1. Interface
    export interface IPokemonData {
        id: number;
        name: string;
        sprites: {
            front_default: string;
            // Bạn có thể thêm các kiểu khác nếu cần
        };
    }

    // 2. Intersection Type
    export type PokemonEntity = IPokemonData & { sprites: { front_default: string } };

    // 3. Class & Class Validator
    export class Pokemon {
        @IsInt() id!: number;
        @IsString() name!: string;
        sprites!: { front_default: string };
    }

    // 4. Generic & Inheritance
    abstract class BaseModel<T> {
        public score: number = 0;
        public abstract items: T[];
        public abstract resetState(): void; // Đảm bảo lớp con phải triển khai
        public updateScore(points: number): void {
            this.score += points;
        }
    }

    export class GameModel extends BaseModel<Pokemon> {
        public items: Pokemon[] = [];
        public matchedCount: number = 0;
        public readonly totalPairs: number = 10;
        private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon?limit=10';

        // 5. Sử dụng Generic & Lodash
        public async fetchPokemons(): Promise<Pokemon[]> {
            try {
                const res = await fetch(this.apiUrl);
                const data = await res.json();

                // Nhân đôi mảng để tạo cặp
                const rawData = [...data.results, ...data.results];

                const promises = rawData.map(p =>
                    fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`).then(r => r.json())
                );
                const results = await Promise.all(promises);

                // 6. Class Transformer & Validation
                const instances = results.map(item => plainToInstance(Pokemon, item));

                // Kiểm tra tính hợp lệ của từng Pokemon (Kỹ thuật Validation)
                for (const pokemon of instances) {
                    const errors = await validate(pokemon);
                    if (errors.length > 0) {
                        console.error("Dữ liệu Pokemon không hợp lệ:", errors);
                        throw new Error("Dữ liệu từ API sai cấu trúc.");
                    }
                }

                this.items = instances;

                // 7. Lodash: Sử dụng _.shuffle để trộn bài chuyên nghiệp
                return _.shuffle(this.items);
            } catch (error) {
                console.error("Lỗi Model:", error);
                return [];
            }
        }

        public resetState(): void {
            this.score = 0;
            this.matchedCount = 0;
            this.items = [];
        }
    }
}