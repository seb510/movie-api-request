const searchBtn = document.getElementById('search-btn');
const fieldInputSearch = document.getElementById('msearch');
const dataWrapper = document.getElementById('data-wrapper');
const tagString = document.querySelector('.tag');
let requestField = 'auto';

searchBtn.addEventListener('click', () => {
    requestField = fieldInputSearch.value;
    console.log(requestField)
    if (requestField == '') {
        return false
    }
    renderCatalog();
})

const createTemplate = data => {
    let genres = [];
    let description = '';

    if (data.show.genres.length) {
        genres = data.show.genres.reduce((acc, item) => {
            return acc + ", " + item;
        })
    } else {
        genres = 'Without info';
    }

    if (data.show.summary) {
        description = data.show.summary
    } else {
        description = 'Without Description';
    }

    return `
	 <div class="data-item">
		<div class="image">
			<img src="${data.show.image ? data.show.image.medium : 'default.jpg'}" loading="lazy" alt="movie wallpaper">
		</div>
		<div class='data-info'>
		<div>
			<span>Name:</span>
			${data.show.name}
		</div>
		<div>
			<span>Premiered:</span>
			${data.show.premiered}
		</div>
		<div>
			<span>Type:</span>
			${data.show.type}
		</div>
		<div>
			<span>Score:</span>
			${data.score}
		</div>
		<div>
			<span>Genres:</span>
			${genres}
		</div>
		<div>
			<span>Language:</span>
			${data.show.language}
		</div>
		<div>
			<span>Description:</span>
			${description}
		</div>
		</div>
 	</div>
	`
}

function renderCatalog() {
    fetch("https://api.tvmaze.com/search/shows?" + new URLSearchParams({
            'q': requestField,
        }))
        .then(response => response.json())
        .then(data => {
            if (data) {
                dataWrapper.innerHTML = '';
                tagString.innerHTML = requestField;
                console.log(data);
                data.forEach(item => {
                    dataWrapper.innerHTML += createTemplate(item);
                });
            }
        })
}

renderCatalog();