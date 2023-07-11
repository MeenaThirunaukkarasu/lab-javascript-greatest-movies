// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    const allDirectors = moviesArray.map((movieName) => {
        return movieName.director;
      })
     
return allDirectors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    const stevenSpielbergDirector= moviesArray.filter((name) =>{
        return name.director==='Steven Spielberg' && name.genre.includes('Drama')
    });
     return stevenSpielbergDirector.length;

}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
//     // array.reduce((accumulator, currentValue) => accumulator + currentValue);
//     let result = moviesArray.reduce(function (acc, obj) { return acc + obj.score; }, 0);
// // console.log(result);
// console.log(obj.score);
// let average = result/moviesArray.length
// // console.log(average);
// return average.toFixed(2);

// return moviesArray.reduce((sum, movie) => sum + (movie.score || 0), 0)/moviesArray.length
if (moviesArray.length === 0) return 0

const average = moviesArray.reduce((sum, movie) => sum + (movie.score || 0), 0)/moviesArray.length

return parseFloat(average.toFixed(2))


}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    let dramaMovies = moviesArray.filter((movies) => movies.genre.includes("Drama") ); 
    if (dramaMovies.length === 0) 
    { return 0; } 
    let dramaSum = dramaMovies.reduce((sum, movie) => sum + movie.score, 0); 
    let roundSum = dramaSum / dramaMovies.length; 
    return Math.round(roundSum * 100) / 100;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    let yearArray = moviesArray.slice();
    return yearArray.sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      } else {
        //reference link of localeCompare : https://stackoverflow.com/questions/51165/how-to-sort-strings-in-javascript
        return a.title.localeCompare(b.title);
      }
    });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    let titleArray = moviesArray.slice();

  return titleArray
    .map((item) => item.title)
    .sort((a, b) => {
      return a.localeCompare(b);
    })
    .slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
     // first ==> split "h" duration: '3h 21min',
  let calcHour = hourString.split("h");
  return calcHour[0] * 60;
}
function convertMin(hourString) {
  // second ==> split "min" duration: '3h 21min',
  let calcMin = hourString.split("min");
  return Number(calcMin[0]);
}
// second ==> split " " duration: '3h 21min',
function convertDuration(duration) {

  let calcDuration = duration.split(' ');

  let convMinutes = calcDuration.reduce((acc, change) => {
    if (change.includes("h")) {
      return acc + convertHours(change);
    } else {
      return acc + convertMin(change);
    }
  }, 0);
  return convMinutes;

}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    //when arugment array is empty return null
  if (moviesArray.length === 0) {
    return null;
  }
  let filterYearMap = [];
  //step1 : filter all years in the array ex: [‘1978’, ‘2000’]
  let yearsArry = moviesArray.map((item) => item.year);
  //step2: remove duplicate years
  let year = yearsArry.filter((yr, index) => {
    return yearsArry.indexOf(yr) === index;
  });
  //step3: create year object to store ratings for each year  ex: [{year: ‘1980’, ratings:[]}]
  year.map((item) => {
    filterYearMap.push({ year: item, ratings: [] });
  });
  //step4: push rating of each to year object’s rating  ex: [{year: ‘1980’, ratings:[9, 8, 7.8]}]
  filterYearMap.map((item) => {
    moviesArray.map((ite) => {
      if (item.year === ite.year) {
        item.ratings.push(ite.score);
      }
    });
  });
  //step5: add all ratings in each year object’s ratings array and avarage the value by rating array’s length ex: [{year: ‘1980’, ratings:[9, 8, 7.8]} = 9+8+7.8 / 3]
  filterYearMap.map((item) => {
    item.avg = item.ratings.reduce((acc, curr) => {
      return acc + curr / item.ratings.length;
    }, 0);
  });
  //step6:  Sort array by rating
  let sortedArray = filterYearMap.sort((a, b) => b.avg - a.avg);
  if (
    filterYearMap.filter((item) => item.avg === filterYearMap[0].avg).length > 1
  ) {
    let yrs = sortedArray.sort((a, b) => a.year - b.year);
    return `The best year was ${yrs[0].year} with an average score of ${yrs[0].avg}`;
  } else {
    return `The best year was ${sortedArray[0].year} with an average score of ${sortedArray[0].avg}`;
  }
}
