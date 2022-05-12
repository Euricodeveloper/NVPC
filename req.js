var appForm = document.querySelector("#app form");
var listaEl = document.querySelector("#app ul");

var xhttp = new XMLHttpRequest();
var url_base = 'https://api.github.com/';

var lista = [];

appForm.onsubmit = buscarRepo;

function buscarRepo(e) {
    e.preventDefault();

    var user = document.getElementById("input_user").value;
    var language = document.getElementById("input_language").value;
    if (user.length === 0) {
        alert("Por favor, preencha o nome do usuário");
        return;
    }

    var url = url_base + 'users/' + user + '/repos';
    xhttp.open('GET', url);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {

                var result = JSON.parse(xhttp.responseText);
                lista = result.map(function (item) {
                    return {
                        name: item.name,
                        description: item.description,
                        html_url: item.html_url,
                        language: item.language,
                        archived: item.archived
                    };
                });

                listas = result.filter((item) => {
                    if (item?.language?.toLowerCase() == language.toLowerCase()) {
                        return item.language;
                    }
                })

                if (language.length === 0) {
                    renderSearch(lista);
                } else {
                    renderSearch(listas);
                }

            }
            else {
                alert('Falha ao buscar usuário. Tente novamente mais tarde.');
            }
        }
    }
}


function renderSearch(params) {
    listaEl.innerHTML = '';

    for (item of params) {
        var nameEl = document.createElement('strong');
        nameEl.appendChild(document.createTextNode(item.name));

        var descriptionEl = document.createElement('p');
        descriptionEl.appendChild(document.createTextNode(item.description));

        var languageEl = document.createElement('span');
        languageEl.setAttribute('class', 'language');
        languageEl.appendChild(document.createTextNode(item.language));

        var urlEl = document.createElement('a');
        urlEl.setAttribute('href', item.html_url);
        urlEl.setAttribute('target', '_blank');
        urlEl.appendChild(document.createTextNode(item.html_url));

        var itemEl = document.createElement('li');
        itemEl.appendChild(nameEl);
        itemEl.appendChild(descriptionEl);
        itemEl.appendChild(languageEl);
        itemEl.appendChild(urlEl);


        listaEl.appendChild(itemEl);
    }
}