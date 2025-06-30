document.addEventListener('DOMContentLoaded', () => {

    const pensum = document.getElementById('pensum');
    let id = pensum.classList.item(0);

    let carrera = JSON.parse(localStorage.getItem(`pensum${id}`));

    if (carrera !== null) {
        pensum.innerHTML = carrera;

        let cursos = pensum.querySelectorAll('div');

        const limpiarDivs = () => {
            for (const curso of cursos) {
                curso.classList.remove('pre_curso');
            }
        }

        const marcarCursos = (pres) => {
            if (pres.length !== 0) {

                for(const pre of pres ){
                    const pre_curso = document.getElementById(pre.innerText);

                    pre_curso.classList.add('pre_curso');

                    marcarCursos(pre_curso.children[2].children);
                }

                return;
            }
        }

        const getCurso = (event) => {

            limpiarDivs();

            const curso = event.currentTarget;
            curso.classList.add('pre_curso');

            // recorro los pre-requisitos
            const pre = curso.children[2].children;

            if (pre.length === 0) alert('El curso no tiene prerrequisitos');

            marcarCursos(pre);
            
        }

        for (const curso of cursos) {
            curso.addEventListener('click', getCurso);

            let pre = curso.children[2].children;

            if (pre.length > 3) {
                curso.children[2].classList.add('pre_font');
            }

        }

    }

});