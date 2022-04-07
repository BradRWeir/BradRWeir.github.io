//maybe fixes print on github:
//if(/chrome/i.test(navigator.userAgent) {
//     document.write('<link rel="stylesheet" href="printChrome.css" media="print">');
// }

//format mm/dd/yy
function formatDate(dateString) {
    let date = new Date(dateString);
    let dateObj = {dayOfWeek: "", month:"",day:"",year:""};
    [dateObj.dayOfWeek, dateObj.month, dateObj.day ,dateObj.year] = date.toDateString().split(' ');
    return [dateObj.month, dateObj.year].join(' ');
}

//Experience (rows)
const EXP_URL = "https://gsx2json.com/api?id=1T5VbN6sgJBpbOO1Hy1zs5TekpkQGnUZ9uAZPmXIh2bY&sheet=Experience&columns=false";
//Duties (columns)
const DUT_URL = "https://gsx2json.com/api?id=1T5VbN6sgJBpbOO1Hy1zs5TekpkQGnUZ9uAZPmXIh2bY&sheet=Duties&rows=false";
//Education (rows)
const EDU_URL = "https://gsx2json.com/api?id=1T5VbN6sgJBpbOO1Hy1zs5TekpkQGnUZ9uAZPmXIh2bY&sheet=Education&columns=false";
//Duties (columns)
const COU_URL = "https://gsx2json.com/api?id=1T5VbN6sgJBpbOO1Hy1zs5TekpkQGnUZ9uAZPmXIh2bY&sheet=Coursework&rows=false";
//Skills (columns)
const SKI_URL = "https://gsx2json.com/api?id=1T5VbN6sgJBpbOO1Hy1zs5TekpkQGnUZ9uAZPmXIh2bY&sheet=Skills&rows=false";

var exp = document.getElementById("exp");

function handleDuties(rows, columns) {
    rows.forEach((row)=>{
        let employer = row.Employer;
        let location = row.Location;
        let title = row.Title;
        let startDate = formatDate(row.StartDate);
        let endDate = formatDate(row.EndDate);
        
        let h3 = document.createElement("h3");
        let spanEmployer = document.createElement('span');
        spanEmployer.classList.add("establishment");
        spanEmployer.innerText=employer;
        let spanLocation = document.createElement('span');
        spanLocation.classList.add("location");
        spanLocation.innerText=location;
        h3.appendChild(spanEmployer);
        h3.appendChild(spanLocation); 
        
        let h4 = document.createElement("h4");
        let spanTitle = document.createElement('span');
        spanTitle.classList.add("status");
        spanTitle.innerText=title;
        spanDate = document.createElement('span');
        spanDate.classList.add("date");
        spanDate.innerText = startDate + " - " + endDate;
        h4.appendChild(spanTitle);
        h4.appendChild(spanDate);

        let ul = document.createElement("ul");
        columns[employer].forEach((cell)=>{
            if(cell) { //handles 0 return for uneven rows
                let li = document.createElement("li");
                li.innerText = cell;
                ul.appendChild(li);
            }
        });
        exp.appendChild(h3);
        exp.appendChild(h4);
        exp.appendChild(ul);
    });
}

function handleExperience(rows){
    fetch(DUT_URL)
        .then(response => response.json())
        .then(json => handleDuties(rows, json.columns));
}

fetch(EXP_URL)
        .then(response => response.json())
        .then(json => handleExperience(json.rows));

//---------------------------------

var edu = document.getElementById("edu");
function handleCoursework(rows, columns) {
    rows.forEach((row)=>{
        let school = row.School;
        let location = row.Location;
        let certification = Boolean(row.Certification) ? row.Certification : ""; //handle blank
        let startDate = formatDate(row.StartDate);
        let endDate = formatDate(row.EndDate);
        
        let h3 = document.createElement("h3");
        let spanSchool = document.createElement('span');
        spanSchool.classList.add("establishment");
        spanSchool.innerText=school+'\n';
        let spanLocation = document.createElement('span');
        spanLocation.classList.add("location");
        spanLocation.innerText=location;
        h3.appendChild(spanSchool);
        //h3.appendChild(spanLocation); 

        let h4 = document.createElement("h4");
        let spanCertification = document.createElement('span');
        spanCertification.classList.add("status");
        spanCertification.innerText=certification+'\n';
        spanDate = document.createElement('span');
        spanDate.classList.add("date");
        spanDate.innerText = startDate + " - " + endDate;
        h4.appendChild(spanCertification);
        h4.appendChild(spanDate);

        let ul = document.createElement("ul");
        columns[school].forEach((cell)=>{ //pivot
            if(cell) { //handles 0 return for uneven rows
                let li = document.createElement("li");
                li.innerText = cell;
                ul.appendChild(li);
            }
        });
        edu.appendChild(h3);
        edu.appendChild(h4);
        edu.appendChild(ul);
    });
}

function handleEducation(rows){
    console.log(rows);
    fetch(COU_URL)
        .then(response => response.json())
        .then(json => handleCoursework(rows, json.columns));
}

fetch(EDU_URL)
        .then(response => response.json())
        .then(json => handleEducation(json.rows));

//---------------------------------

var ski = document.getElementById("ski");
function handleSkills(columns){
    //TODO: use columns keys
    console.log(columns);
    let skillTypes = ["Programming"];
    skillTypes.forEach((skillType)=>{
        console.log(skillType);
        let h3 = document.createElement("h3");
        let skillTypeSpan = document.createElement('span');
        skillTypeSpan.classList.add("skill");
        skillTypeSpan.innerText = skillType;
        h3.appendChild(skillTypeSpan);
        let ul = document.createElement("ul");
        console.log(columns[skillType]);
        columns[skillType].forEach((cell)=>{
            console.log(cell);
            if(cell) { //handles 0 return for uneven rows
                let li = document.createElement("li");
                li.innerText = cell;
                ul.appendChild(li);
            }
        });
        //ski.appendChild(h3);
        ski.appendChild(ul);
    });
}

fetch(SKI_URL)
        .then(response => response.json())
        .then(json => handleSkills(json.columns));

//----------------------------------
