document.addEventListener('DOMContentLoaded', () => {

    /*
    <tr>
        <td>
            <div id="103">
                <span class="codigo">103</span>
                <span> Mate Basica 2 </span>
                <span class="pre">
                    <p>101</p>
                </span>
            </div>
        </td>
        <td></td>
        <td></td>
    </tr>
    */

    let carreras = [
        {
            nombre: "Sistemas",
            semestres: [
                {
                    numero: 1,
                    cursos: [
                        {
                            codigo: 101,
                            nombre: "Mate Basica 1",
                            area: 4,
                            prerrequisitos: []
                        }
                    ]
                },
                {
                    numero:2,
                    cursos: [
                        {
                            codigo: 103,
                            nombre: "Mate Basica 2",
                            area: 4,
                            prerrequisitos: [101]
                        }
                    ]
                },
                {
                    numero:3,
                    cursos: [
                        {
                            codigo: 770,
                            nombre: "IPC1",
                            area: 3,
                            prerrequisitos: [103]
                        }
                    ]
                }
            ]
        }
    ];

    const tCabecera = document.getElementById('cabecera');

    carreras.forEach((carrera) => {
        let semestres = carrera.semestres;

        let th = '';
        semestres.forEach((semestre) => {
            th += `<th> ${semestre.numero} </th>\n`;
        });

        tCabecera.innerHTML = th;
    });

    carreras.forEach((carrera) => {

        let semestres = carrera.semestres;

        
        let tr = ''
        for(let i = 0; i < 6; i++) {
            tr += `<tr>`;
            let td = '';
            semestres.forEach((semestre) => {
                let cursos = semestre.cursos;

                cursos.forEach((curso) => {

                    if (curso.area == i + 1) {
                        td += `<td> ${curso.nombre} </td>`;
                    } else {
                        td += "<td> </td>"
                    }

                });
            });
            tr += '</tr>'
        }

        console.log(tr);
    });

});