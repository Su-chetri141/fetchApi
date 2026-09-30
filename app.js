
const btnJs = document.getElementById('btnJs');

btnJs.addEventListener('click', (e) => {
    e.preventDefault();

    const inputJs = document.getElementById('inputJs').value.trim();

    // console.log(inputJs);

    if (inputJs) {

        // Remove previous result
        const oldResult = document.querySelector('.result');

        if (oldResult) {
            oldResult.remove();
        }
           //url  from Wikipedia API
        const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/'
                    + inputJs + '_(programming_language)';

        btnJs.disabled = true;
        btnJs.textContent = "Processing...";

        fetch(url)

            .then(response => {

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                return response.json();
            })

            .then(data => {

                // console.log(data);

                const div = document.createElement('div');
                div.className = 'result';

                if (data.extract) {
                    div.innerHTML = `
                        <h2>${data.title}</h2>
                        <p>${data.extract}</p>
                    `;
                }
                else {
                    div.innerHTML = `<p>No information found.</p>`;
                }

                document.body.appendChild(div);

            })

            .catch(error => {

                console.error('Error:', error);

                const div = document.createElement('div');
                div.className = 'result';

                div.innerHTML = `
                    <p>Error fetching data for ${inputJs}</p>
                    <p>Please check the programming language name and try again.</p>
                `;

                document.body.appendChild(div);

            })

            .finally(() => {

                btnJs.disabled = false;
                btnJs.textContent = "Process";

            });

    }
    else {
        alert('Please enter a programming language.');
    }
});

