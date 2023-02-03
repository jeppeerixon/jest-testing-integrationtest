/**
 * @jest-environment jsdom
*/

import { IMovie } from "../models/Movie";
import { createHtml, displayNoResult } from "../movieApp";
import { getData } from "../services/movieservice";
import * as movieAppSpies from "../movieApp";

jest.mock("./../services/movieservice.ts");

beforeEach(() => {
    document.body.innerHTML = '';
})

describe("test for handleSubmit", () => {

    test("should trigger createHtml", async () => {
        // 1 assign
        document.body.innerHTML = `
        <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;
        let container: HTMLDivElement = document.getElementById(
            "movie-container"
          ) as HTMLDivElement;

        let movies: IMovie[] = [];

        let searchString: string = "hejsan";

        // 2 act
        try {
            movies = await getData(searchString);
            if (movies.length > 0) {
                createHtml(movies, container);
            }
        } catch {
            console.log("borde ej köras");
        }
        

        // 3 assert
        let titleName = document.querySelectorAll("h3");
        expect(movies.length).toBe(1);
        expect(titleName[0].innerHTML).toBe("Sökarna");

    })

    test("should simulate empty search result", async () => {
        // 1 assign
        document.body.innerHTML = `
        <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;
        let container: HTMLDivElement = document.getElementById(
            "movie-container"
          ) as HTMLDivElement;

        let movies: IMovie[] = [];

        let searchString: string = "$";

        // 2 act
        try {
            movies = await getData(searchString);
            if (movies.length > 0) {
                console.log("borde ej köras ett");
            } else {
                displayNoResult(container);
            }
        } catch {
            console.log("borde ej köras två");
        }
        

        // 3 assert
        let errorMsg = document.querySelectorAll("p");
        expect(movies.length).toBe(0);
        expect(errorMsg[0].innerHTML).toBe("Inga sökresultat att visa");

    })

    test("should simulate wrong search input", async () => {
        // 1 assign
        document.body.innerHTML = `
        <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;
        let container: HTMLDivElement = document.getElementById(
            "movie-container"
          ) as HTMLDivElement;

        let movies: IMovie[] = [];
        let catchError: unknown = [];

        let searchString = "";

        // 2 act
        try {
            movies = await getData(searchString); 
            if (movies.length > 0) {
                console.log("borde ej köras ett");
            } else {
                console.log("borde ej köras två");
            }
        } catch (e: any) {
            catchError = e;
            displayNoResult(container);            
        }
        

        // 3 assert
        let errorMsg = document.querySelectorAll("p");
        expect(catchError).toBe("wrong");
        expect(errorMsg[0].innerHTML).toBe("Inga sökresultat att visa");

    })

})

describe("Tests for createHTML", () => {

    test("Should run createHtml and make divs", () => {

        // 1 assign
        let testSearch: IMovie[] = 
        [
            {
                Title: "Sökarna",
                imdbID: "123asdasd",
                Type: "movie",
                Poster: "http://bildlank.se/moviePoster.jpg",
                Year: "1993"
            }, 
            {
                Title: "Sällskapsresan",
                imdbID: "qwerty123",
                Type: "movie",
                Poster: "http://annanlank.se/PosterMovie.jpg",
                Year: "1981"
            }, 
            {
                Title: "Ondskan",
                imdbID: "imdb098765",
                Type: "movie",
                Poster: "http://annanlank.se/PosterMovie.jpg",
                Year: "2002"
            }
        ];

        document.body.innerHTML = `
        <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;
        let container: HTMLDivElement = document.getElementById(
            "movie-container"
          ) as HTMLDivElement;

        // 2 act
        createHtml(testSearch, container);
        let allMovies = document.querySelectorAll(".movie");
        let movieTitle = document.querySelectorAll("h3")[0];

        // 3 assert
        expect(allMovies.length).toBe(3);
        expect(movieTitle.innerHTML).toBe("Sökarna");


    });

    test("Should not print any divs", () => {

        // 1 assign
        let testSearch: IMovie[] = [];

        document.body.innerHTML = `
        <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;
        let container: HTMLDivElement = document.getElementById(
            "movie-container"
          ) as HTMLDivElement;

        // 2 act
        createHtml(testSearch, container);
        let allMovies = document.querySelectorAll(".movie");
        let movieTitle = document.querySelectorAll("h3")[0];

        // 3 assert
        expect(allMovies.length).toBe(0);
        expect(container.innerHTML).toBe("");

    });

});

describe("Tests for init", () => {

    test("Should trigger handleSubmit", () => {

        // 1 assign
        document.body.innerHTML = `
        <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;

        let formButton = document.getElementById("search") as HTMLButtonElement;

        let spy = jest.spyOn(movieAppSpies, "handleSubmit").mockReturnValue(new Promise<void>((resolve, reject) => {}));

        // 2 act
        movieAppSpies.init();
        formButton.click();
        
        // 3 assert
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockReset();

    });

describe("Tests for displayNoRes", () => {

    test("Should run trigger handleSubmit", () => {
        
        // 1 assign
        document.body.innerHTML = `
        <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;

        let container: HTMLDivElement = document.getElementById(
            "movie-container"
          ) as HTMLDivElement;

        // 2 act
        displayNoResult(container);
        
        // 3 assert
        expect(container.innerHTML).toBe("<p>Inga sökresultat att visa</p>");
        



    });
});

});

