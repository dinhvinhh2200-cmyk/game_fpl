import { AppMemoryGame as M } from "../model/GameModel";
import { AppMemoryGame as V } from "../views/GameView";

export namespace AppMemoryGame {
    // 8. Custom Decorator: Ghi log bước đi
    function LogAction(target: any, key: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function(...args: any[]) {
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
        }

        // 9. Sử dụng Decorator
        @LogAction
        public async startGame(): Promise<void> {
            try {
                const name = (document.querySelector('#username') as HTMLInputElement).value;
                this.validateName(name);

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
        }
    }
}