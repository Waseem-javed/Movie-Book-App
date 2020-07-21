// declares all variables first
const addbtn = document.querySelector('.add-book');
const movie_name = document.querySelector('#input-name');
const release_date = document.querySelector('#date-picker');
const movie_banner = document.querySelector("#image-url");
const description = document.querySelector("#description"); 
const display = document.querySelector(".display-Movie");
const loadMovies = document.querySelector(".show-movies");
// call event handling method
AllEventsHandling();

// Event handling method below
function AllEventsHandling() {

    // when view book button click on the top of  guest book then below event occur
    loadMovies.addEventListener('click', loadLocalStorageMoviesData);
    // when add button click below function execute
    addbtn.addEventListener("click", addBtnProcess);
}

// when view button click the below will execute
function loadLocalStorageMoviesData() {
       
    setTimeout(loaderCall, 3000);
 
    document.querySelector("#loader").classList.remove("d-none");

}

// when loader executed and the same time exceute this code
function loaderCall() {
    let movies;
    document.querySelector("#loader").classList.add("d-none");
		if (localStorage.getItem("movies") === null) {
			movies = [];
		} else {
            movies = JSON.parse(localStorage.getItem("movies"));
            loadData(movies);
            function loadData(movies) {
                movies.forEach((movie, index) => {
                        // we create our card here for insertion in book list
                        const card = document.createElement("card");
                        card.className = "mb-2 text-left";
                        const img = document.createElement("img");
                        img.className = "card-img-top";
                        img.src = movie[2];
                        card.appendChild(img);
                        const cardBody = document.createElement("div");
                        cardBody.className = "card-body";
                        card.appendChild(cardBody);
                        const heading = document.createElement("h5");
                        heading.className =
                            "card-title font-weight-bold text-primary";
                        heading.appendChild(document.createTextNode(movie[0]));
                        cardBody.appendChild(heading);
                        const paragraph = document.createElement("p");
                        paragraph.className = "card-text";
                        paragraph.appendChild(document.createTextNode(movie[3]));
                        cardBody.appendChild(paragraph);
                        display.appendChild(card);
                    
                });
                document.querySelector("#loader").classList.add("d-none");
            }
		}

    
}

// when add button click then call this below function
function addBtnProcess(e) {

    // ADD to book when fields is not empty
    if (
			movie_name.value.length != 0 &&
			release_date.value.length != 0 &&
			movie_banner.value.length != 0 &&
			description.value.length != 0
		) {
			//    when not empty call this function
			AddToBook(type='alert-success');
		} else {
        setTimeout(ErrorAlert(type='alert-danger'), 1000);
		}
			
    
    e.preventDefault();
}

function AddToBook() {
    // we create our card here for insertion in book list
    const card = document.createElement("card");
    card.className = "mb-2";
    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = movie_banner.value;
    card.appendChild(img);
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);
    const heading = document.createElement("h5");
    heading.className =
        "card-title font-weight-bold text-primary";
    heading.appendChild(
        document.createTextNode(movie_name.value)
    );
    cardBody.appendChild(heading);
    const paragraph = document.createElement("p");
    paragraph.className = "card-text";
    paragraph.appendChild(
        document.createTextNode(description.value)
    );
    cardBody.appendChild(paragraph);
    display.appendChild(card);

    // store data into localstorage chrome browser ,call Stored function
    const data_fields = [
			movie_name.value,
			release_date.value,
			movie_banner.value,
			description.value,
		];
    storedLocalStorage(
        data_fields
    );

    // Successful Alert function below
    InsertionDoneAlert(type);
}

// local storage function below
function storedLocalStorage(datas) {
    let movies;
    if (localStorage.getItem('movies') === null) {
        movies = [];
    } else {
        movies = JSON.parse(localStorage.getItem("movies"));
    }
    movies.push(datas);
    localStorage.setItem("movies", JSON.stringify(movies));
} 

// Insertion done alert function show to top of the page
function InsertionDoneAlert() {
   
    // call alert function with alert type
    alert(type);

    // clear alert after some second
    setTimeout(clearAlert, 1000);
    
    // clear fields function call below
    clearFields();
}
// Empty alert message show top
function ErrorAlert(type) {
	
    // here we call just alert function with alert type;
    alert(type);

	// clear alert function
	setTimeout(clearAlert, 2000);
}

// alert code
function alert(type) {
    // below code create alert container javascript DOM CREATION;
    const colId = document.querySelector("#row-col-id");
    const card = document.querySelector(".card");
    const div = document.createElement("div");
    div.className = `alert ${type}`;
    const textNode = document.createTextNode("Please Fill the Fields..");
    div.appendChild(textNode);
    colId.insertBefore(div, card);
}


// when insertion done after alert excute this below function which will clear all fields
function clearFields() {
    movie_name.value = '';
    release_date.value = '';
    movie_banner.value = '';
    description.value = '';
}

// clear alert function
function clearAlert() {
    document.querySelector('.alert').remove();
}

// javascript for input field image
$(".custom-file-input").on("change", function () {
	var fileName = $(this).val().split("\\").pop();
	$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
