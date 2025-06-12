document.addEventListener('DOMContentLoaded', () => {

    let input = "print(19);\nprint(20);int";
    const table = document.getElementById('tableBody');

    const getTokens = async (input) => {

        let response = await fetch('http://localhost:3000/analyze', {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain'
            },
            body: input
        });

        let result = await response.json();

        result.tokens.forEach((token, index) => {

            table.innerHTML += `
            <tr>
                <td> ${index + 1} </td>
                <td> ${token.row} </td>
                <td> ${token.column} </td>
                <td> ${token.typeTokenString} </td>
                <td> ${token.lexeme}  </td>
            </tr>
            `;
        });
    }

    getTokens(input);
});