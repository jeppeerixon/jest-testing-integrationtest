import axios from "axios";
import { IOmdbResponse } from "../../models/IOmdbResponse";
import { IMovie } from "../../models/Movie";
 
export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    if (searchText.length > 1) {
      resolve([{Title: "Sökarna",
      imdbID: "123asdasd",
      Type: "movie",
      Poster: "http://bildlank.se/moviePoster.jpg",
      Year: "1993"}]);
    }
    else if (searchText == "$") {
      resolve([]);
    }
    else { 
      reject("wrong"); 
    }    
  });
}
