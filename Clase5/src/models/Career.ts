import { Semester } from "./Semester";

export class Career {

    private name: string;
    private semesters: Semester[];
    private html: string;

    constructor(name: string) {
        this.name = name;
        this.semesters = [];
        this.html = '';
    }

    getName(): string {
        return this.name;
    }

    addSemester(semester: Semester) {
        this.semesters.push(semester);
    }

    getSemesters(): Semester[] {
        return this.semesters;
    }

    generateHtml() {
        this.html = `
            <h1> Ingenería: ${this.name} </h1>

            <table id="${this.name}" class="table_pensum table table-striped">
                <thead>
                    <tr>
                        ${this.semesters.map((item) => {
                            return `<th> Semestre No.${item.getNum()} </th>`
                        }).join('\n')}
                    </tr>
                </thead>
                <tbody>
        `;

        for (let i = 0; i < 6; i++) {

            this.html += `<tr>`;

            for (const semester of this.semesters) {
                this.html += `${semester.getHtml()[i]}`;
            }

            this.html += `</tr>\n`;
        }

        this.html += `
            </tbody>
        </table>
        `;
    }

    getHtml(): string {
        return this.html;
    }

}