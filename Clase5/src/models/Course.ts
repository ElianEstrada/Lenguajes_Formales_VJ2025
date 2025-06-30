export class Course {

    private code: string;
    private name: string;
    private area: number;
    private prerequisites: string[];
    private html: string;

    constructor(code: string) {
        this.code = code;
        this.name = '';
        this.area = 0;
        this.prerequisites = [];
        this.html = '';
    }

    getCode(): string {
        return this.code;
    }

    setName(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setArea(area: number) {
        this.area = area;
    }

    getArea(): number {
        return this.area
    }

    addPrerequisites(code: string) {
        this.prerequisites.push(code);
    }

    getPrerequisites(): string[] {
        return this.prerequisites;
    }

    generateHtml() {
        this.html = `
            <div id="${this.code}">
                <span class="codigo">${this.code}</span>
                <span>${this.name}</span>
                <span class="pre">
                    ${this.prerequisites.map((item) => {
                        return `<p>${item}</p>`
                    }).join('\n\t')}
                </span>
            </div>
        `;
    }

    getHtml(): string {
        return this.html;
    }

}