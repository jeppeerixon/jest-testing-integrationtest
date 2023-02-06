import { IMovie } from "../models/Movie";
import { getData } from "../services/movieservice";


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
                Title: "Sökarna II",
                imdbID: "qwerty123",
                Type: "movie",
                Poster: "http://annanlank.se/PosterMovie.jpg",
                Year: "1998"
            }, 
        ];


// 1 assign för alla tester
jest.mock("axios", () => ({
    get: async (url: string) => {
        return new Promise ((resolve, reject) => {
        if (!url.endsWith("error")) {
            resolve({ data: {Search: testSearch}});
        }
        else {
            reject({ data: [], status: 500 });
        }
        });
    }
}));

describe("test for Axios.get", () => {

    test("Should fetch mock Data correctlty", async () => {
        // 2 act
        let data = await getData("Sökarna");

        // 3 assert
        expect(data.length).toBe(2);
        
    })

    test("Should get error from Fetch", async () => {
        // 2 act
        let data = await getData("error");

        // 3 assert
        expect(data.length).toBe(0);
        //expect(status).toBe(500); hur fixar man denna, provat och googlar allt?!
        
    })
})
