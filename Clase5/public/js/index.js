document.addEventListener('DOMContentLoaded', () => {

    const button = document.getElementById('analyze');
    const editor = document.getElementById('editor');
    const table = document.getElementById('tableBody');
    const clear = document.getElementById('clear');
    const open = document.getElementById('open');
    const save = document.getElementById('save');
    const pensums = document.getElementById('pensums');

    clear.addEventListener('click', () => {
        editor.innerHTML = '';
        table.innerHTML = '';
    });

    open.addEventListener('click', () => {

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = ".plfp";

        fileInput.addEventListener('change', () => {

            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];

                const reader = new FileReader();

                reader.onload = (e) => {
                    const fileContent = e.target.result;
                    editor.innerText = fileContent;
                }

                reader.readAsText(file);
            }

            fileInput.remove();
        });

        fileInput.click();
    });

    save.addEventListener('click', () => {
        const download = document.createElement('a');
        download.href = `data:text/plain;charset=utf-8,${encodeURIComponent(editor.innerText)}`;
        download.download = "archivo.plfp";
        download.click();
    });

    button.addEventListener('click', async () => {

        localStorage.clear();
        pensums.innerHTML = '';

        let response = await fetch('http://localhost:3000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: editor.innerText
        });

        let result = await response.json();

        let textTable = ``;

        result.tokens.forEach((token, index) => {
            textTable += `
            <tr>
                <td> ${index + 1} </td>
                <td> ${token.typeTokenString} </td>
                <td> ${token.lexeme} </td>
                <td> ${token.row} </td>
                <td> ${token.column} </td>
            </tr>
            `;
        });

        table.innerHTML = textTable;

        if (result.errors.length === 0) {

            alert('La entrada esta libre de errores');
            editor.innerHTML = result.editor;
            
            result.careers.forEach(( _, index) => {
                pensums.innerHTML += `<a class="btn btn-success btn_user" href="${'/pensum/' + (index + 1)}" target="_blank"> ${'Pensum: ' + (index + 1)} </a>\n`;
            });

            result.careers.forEach((career, index) => {
                localStorage.setItem(`pensum${index + 1}`, JSON.stringify(career.html));
            });
            
        } else {

            alert('La entrada tiene errores léxicos');

            localStorage.setItem('errors', JSON.stringify(result.errors));
        }

    });

});