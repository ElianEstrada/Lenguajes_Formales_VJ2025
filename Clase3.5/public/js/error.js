document.addEventListener('DOMContentLoaded', () => {

    const table = document.getElementById('tableBody');

    const errors = JSON.parse(localStorage.getItem('errors'));

    console.log(errors);

    if (errors === null) {
        alert("No hay Errores para mostrar");
        window.location.href='/'
    }

    let contentTable = '';
    errors.forEach((error, index) => {

        contentTable += `
        <tr>
            <td> ${index + 1} </td>
            <td> ${error.typeTokenName} </td>
            <td> ${error.lexeme} </td>
            <td> ${error.row} </td>
            <td> ${error.column} </td>
        </tr>
        `;
    });

    table.innerHTML = contentTable;
});