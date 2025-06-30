class Pokemon {

    private name: string;
    private type: string;
    private health: number;
    private attack: number;
    private defense: number;
    private ivs: number;

    constructor(name: string) {
        this.name = name;
        this.type = '';
        this.health = 0;
        this.attack = 0;
        this.defense = 0;
        this.ivs = 0;
    }

    setName(name: string) {
        this.name = name;
    }

    setType(type: string) {
        this.type = type;
    }

    setHealth(health: number) {
        this.health = health;
    }

    setAttack(attack: number) {
        this.attack = attack;
    }

    setDefense(defense: number) {
        this.defense = defense;
    }

    calculateIvs() {
        this.ivs = Math.ceil((this.health + this.attack + this.defense) / 45 * 100);
    }

    getName(): string {
        return this.name;
    }

    getType(): string {
        return this.type;
    }

    getHealth(): number {
        return this.health;
    }

    getAttack(): number {
        return this.attack;
    }

    getDefense(): number {
        return this.defense;
    }

    getIvs(): number {
        return this.ivs;
    }

}

export { Pokemon }