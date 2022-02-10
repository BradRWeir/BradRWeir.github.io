// const xhr = new XMLHttpRequest(),
//     method = "GET",
//     url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFLs5gDeXzzXeJCdGIEWAh78uop_CyogediiBVFekkPDONElLYB8PXpQsTttamYNKAwlhZUNoGH1vZ/pub?output=csv";

// xhr.open(method, url, true);
// xhr.onreadystatechange = (ev) => {
//     console.log(ev);
//     xhr.responseType = "text";
//   // In local files, status is 0 upon success in Mozilla Firefox
//   if(xhr.readyState === XMLHttpRequest.DONE) {
//     var status = xhr.status;
//     if (status === 0 || (status >= 200 && status < 400)) {
//       // The request has been completed successfully
//       console.log("got response");
//       console.log(xhr.responseText);
//     } else {
//       console.log("error");
//     }
//   }
// };
// xhr.send();

const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFLs5gDeXzzXeJCdGIEWAh78uop_CyogediiBVFekkPDONElLYB8PXpQsTttamYNKAwlhZUNoGH1vZ/pub?output=csv"
//CORRECT:https://docs.google.com/spreadsheets/d/1T5VbN6sgJBpbOO1Hy1zs5TekpkQGnUZ9uAZPmXIh2bY/pub?output=csv
async function getResumeData(url){
    let futureResponse = new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.responseType = "text";
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                let status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400))
                    resolve(xhr.response);
                else
                    reject(xhr.statusText);
            }
        }
    });
    return futureResponse;
}

//this is NOT bullet proof... plenty of ways the data in the csv can f this up
//probably should use regex
async function parseCSV(csvData){
    let rows = csvData.split('\n');
    let headers = rows.shift().split(',');
    let result = [];
    rows.forEach((row)=>{
        let cells = row.split(',');
        let column = 
        cells.forEach((cell, index)=>{
            result.push({});
        });
    });
}

getResumeData(URL).then(p)

// const REQUEST_TYPE =
//     {"": true           //defaults to text
//     ,"arraybuffer": true
//     ,"blob": true
//     ,"document": true
//     ,"json": true
//     ,"text": true};

// const REQUEST_METHOD =
//     {"GET": true           //defaults to text
//     ,"POST": true};

// class XHR extends XMLHttpRequest{
//     constructor(){
//         super();
//     }
//     handler(){

//     }

//     async asyncGet(url, responseHandler){
//         this.open("GET", url, true);
//         this.onreadystatechange = this.handler.bind;
//     }

//     validMethod(){

//     }
// }