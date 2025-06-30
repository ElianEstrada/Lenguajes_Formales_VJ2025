import { Token, Type } from "../analyzator/Token";
import { Career } from "../models/Career";
import { Course } from "../models/Course";
import { Semester } from "../models/Semester";

export const getCareers = (tokens: Token[]): Career[] => {

    let careers: Career[] = [];

    let flags: boolean[] = [false, false, false, false, false];
    let career: Career;
    let semester: Semester;
    let course: Course;

    tokens.forEach((token: Token, index: number) => {
        
        if (token.getLexeme() == 'Carrera') {
            flags[0] = true;
        }

        if(flags[0] && token.getTypeToken() == Type.STRING) {
            career = new Career(token.getLexeme().slice(1, token.getLexeme().length - 1));
            flags[0] = false;
        }

        if (token.getLexeme() == 'Semestre') {
            flags[1] = true;
        }

        if (flags[1] && token.getTypeToken() == Type.NUMBER) {
            semester = new Semester(Number(token.getLexeme()));
            flags[1] = false;
        }

        if (token.getLexeme() == 'Curso') {
            flags[2] = true;
        }

        if(flags[2]) {

            if (!flags[3] && !flags[4] && token.getTypeToken() == Type.NUMBER) {
                course = new Course(token.getLexeme());
            } else if (!flags[4] && token.getTypeToken() == Type.NUMBER) {
                course.setArea(Number(token.getLexeme()));
                flags[3] = false;
            } else if (token.getTypeToken() == Type.NUMBER) {
                course.addPrerequisites(token.getLexeme());
            }

            if (token.getTypeToken() == Type.STRING) {
                course.setName(token.getLexeme().slice(1, token.getLexeme().length - 1));
            }

            if (token.getLexeme() == 'Area') {
                flags[3] = true;
            }

            if (token.getTypeToken() == Type.PAR_OPEN) {
                flags[4] = true;
            }

            if (token.getTypeToken() == Type.PAR_CLOSE) {
                flags[4] = false;
            }

            if (token.getTypeToken() == Type.KEY_CLOSE) {
                course.generateHtml();
                semester.addCourse(course);
                flags[2] = false;

                flags[1] = tokens[index + 1].getLexeme() != 'Curso' ? true : false;
            }
        }

        if (flags[1] && token.getTypeToken() == Type.KEY_CLOSE) {
            semester.generateHtml();
            career.addSemester(semester);
            flags[1] = false;
        }

        if (token.getTypeToken() == Type.BRA_CLOSE) {
            career.generateHtml();
            careers.push(career);
        }
    });

    return careers;
}