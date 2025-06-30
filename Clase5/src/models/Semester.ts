import { Course } from "./Course";

export class Semester {

    private num: number;
    private courses: Course[];
    private html: string[];

    constructor(num: number) {
        this.num = num;
        this.courses = [];
        this.html = [];
    }

    getNum(): number {
        return this.num;
    }

    addCourse(course: Course) {
        this.courses.push(course);
    }

    getCourses(): Course[] {
        return this.courses;
    }

    generateHtml() {

        for (let i = 0; i < 6; i++) {
            this.html[i] = `
                <td>
                    ${this.getCourseArea(i + 1)}
                </td>
            `;
        }

    }

    private getCourseArea(area: number): string {
        let htmlCourse = '';

        for (const course of this.courses) {
            if (course.getArea() == area) {
                htmlCourse += `${course.getHtml()}\n`;
            }
        }

        return htmlCourse;
    }

    getHtml(): string[] {
        return this.html;
    }

}