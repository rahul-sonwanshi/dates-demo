interface DictionaryX {
    date: string;
    value: number;
    [key: string] : any;
}

var monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
import * as readline from 'readline';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input : ', (answer) => {
    // answer = answer.replace(/'/g, '"');
  let dictionaryObj = JSON.parse(answer.replace(/'/g, '"'));
  
  console.log(solution(dictionaryObj));
  rl.close();
});

var solution = function(dictionaryObj) {
  let result = {};
  let prevDate = '';
  for (var key in dictionaryObj) {
    if(dictionaryObj.hasOwnProperty(key)) {
        let current = key;
        var val = dictionaryObj[key];
        if(prevDate.length > 0) {
            let diffDays = calculateNumberOfDays(prevDate, key);
            let avg = (dictionaryObj[key] - dictionaryObj[prevDate]) / diffDays;
            let resObj = getResultDates(prevDate, diffDays, avg, dictionaryObj[prevDate]);

            result = {...result, ...resObj};
        }
        prevDate = key;
    }
  }
  return result;
}

// This function returns number of days between two given 
// dates

var getResultDates = function(prevDate: string, diffDays, avg, value) {

    let resObj = {};

    let prevDateArr: number[] = prevDate.split("-").map(Number);
    let skipDateChange = false;
    for (let i=0; i < diffDays + 1; i++) {
        if(prevDateArr[2] > monthDays[prevDateArr[1]-1]) {
            if(isLeapYear(prevDateArr[0]) && prevDateArr[2] === monthDays[prevDateArr[1]-1] + 1) {
                if(prevDateArr[1] === 2) {
                    skipDateChange = true;
                }
            }

            if(!skipDateChange) {
                prevDateArr[2] = 1;
            
                prevDateArr[1] = (prevDateArr[1] + 1)%13;
                if(prevDateArr[1] === 0) {
                    prevDateArr[1] = 1;
                    prevDateArr[0]++;
                }
            }
            
        }
        
        prevDate = prevDateArr.join('-');
        let resObjNew = {
            [prevDate] : Math.floor(value + avg*i)
        }
        // value = value + avg;
        resObj = {...resObj, ...resObjNew};

        prevDateArr[2]++;
        skipDateChange = false;
    }
    
    return resObj;
}

var calculateNumberOfDays = function (prevDate, currentDate) {
    // COUNT TOTAL NUMBER OF DAYS BEFORE FIRST DATE 'dt1' 
    let prevDateArr = prevDate.split("-").map(Number);
    let currentDateArr = currentDate.split("-").map(Number);
    // initialize count using years and day 
    let n1 = prevDateArr[0]*365 + prevDateArr[2]; 
    // console.log(n1, monthDays[0], prevDateArr);
  
    // Add days for months in given date 
    for (let i=0; i<prevDateArr[1] - 1; i++) 
        n1 += monthDays[i]; 
    // console.log(n1);
    // Since every leap year is of 366 days, 
    // Add a day for every leap year 
    n1 += countLeapYears(prevDate);
    // console.log(n1); 
  
    // SIMILARLY, COUNT TOTAL NUMBER OF DAYS BEFORE 'dt2' 
  
    let n2 = currentDateArr[0]*365 + currentDateArr[2]; 
    for (let i=0; i<currentDateArr[1] - 1; i++) 
        n2 += monthDays[i]; 
    n2 += countLeapYears(currentDate); 
  
    // return difference between two counts 
    return (n2 - n1); 
}

var countLeapYears = function(date: string) 
{ 
    let currDate = date.split('-').map(Number);
    let years: number = currDate[0]; 
  
    // Check if the current year needs to be considered 
    // for the count of leap years or not 
    if (currDate[1] <= 2) 
        years--; 
  
    // An year is a leap year if it is a multiple of 4, 
    // multiple of 400 and not a multiple of 100. 
    return Math.floor(years / 4) - Math.floor(years / 100) + Math.floor(years / 400); 
}

var isLeapYear = function(year) {
    if(year%4 === 0 && year%100 != 0 || year%400 === 0)
        return true;
}
