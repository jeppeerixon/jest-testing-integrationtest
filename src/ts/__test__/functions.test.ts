import { movieSort } from "../functions";
import { IMovie } from "../models/Movie";


describe("Test for sort function", () => {

    //desc = descending order should be Z-A ???

    test("should sort in descending order", () => {

        // 1 assign
        let testSearch: IMovie[] = 
        [
            {
                Title: "bbbbbb",
                imdbID: "123asdasd",
                Type: "movie",
                Poster: "http://bildlank.se/moviePoster.jpg",
                Year: "1993"
            }, 
            {
                Title: "aaaAAA",
                imdbID: "111aaaaa",
                Type: "movie",
                Poster: "http://bildlank.se/moviePoster.jpg",
                Year: "2023"
            }, 
            {
                Title: "cccccc",
                imdbID: "qwerty123",
                Type: "movie",
                Poster: "http://annanlank.se/PosterMovie.jpg",
                Year: "1981"
            }, 
            {
                Title: "dddDDD",
                imdbID: "imdb098765",
                Type: "movie",
                Poster: "http://annanlank.se/PosterMovie.jpg",
                Year: "2002"
            }
        ];

        // 2 act
        movieSort(testSearch, true);

        // 3 assert
        expect(testSearch[0].Title).toBe("aaaAAA");
        expect(testSearch[3].Title).toBe("dddDDD");

    });

    test("should sort in other order", () => {

        // 1 assign
        let testSearch: IMovie[] = 
        [
            {
                Title: "bbbbbb",
                imdbID: "123asdasd",
                Type: "movie",
                Poster: "http://bildlank.se/moviePoster.jpg",
                Year: "1993"
            }, 
            {
                Title: "aaaAAA",
                imdbID: "111aaaaa",
                Type: "movie",
                Poster: "http://bildlank.se/moviePoster.jpg",
                Year: "2023"
            }, 
            {
                Title: "cccccc",
                imdbID: "qwerty123",
                Type: "movie",
                Poster: "http://annanlank.se/PosterMovie.jpg",
                Year: "1981"
            }, 
            {
                Title: "dddDDD",
                imdbID: "imdb098765",
                Type: "movie",
                Poster: "http://annanlank.se/PosterMovie.jpg",
                Year: "2002"
            }
        ];

        // 2 act
        movieSort(testSearch, false);

        // 3 assert
        expect(testSearch[0].Title).toBe("dddDDD");
        expect(testSearch[3].Title).toBe("aaaAAA");

    });

    //kanske lägga till mer testcases ???

})