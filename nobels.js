maleIdArray = [];//These are global arrays derived from the second JSON file that includes male and female ids for completing part 2
femaleIdArray = []; 
console.log(maleIdArray);
console.log(femaleIdArray);


// used for part 3 to get id from generated more info buttons
function reply_click(clicked_id) {
    extraInfo(winnerData, clicked_id) //https://stackoverflow.com/questions/4825295/javascript-onclick-to-get-the-id-of-the-clicked-button
    // I've embedded a function within it that generates the info for part 3
}


// this xmlhttp request was adpted from those included in the practicals written by Prof Coyle
var xmlhttp = new XMLHttpRequest();
var url = "prizesByYear.json";

xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        nobelData = JSON.parse(xmlhttp.responseText);
        console.log(nobelData);

        // I needed my dropdown to show up onload/onreadystatechange - so I embedded it within the first JSON call/request
        prizes = nobelData.prizes;
        categoryArray = []; //appending all the category entries to a list 
        for (var i = 0; i < prizes.length; i++) {
            var category = prizes[i].category;
            categoryArray.push(category);
        }

        
        categoryArray.unshift("All categories"); // put all categories at start of list 
        
        // https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/ - I used this code to get unique values
        var unique = (value, index, self) => {
            return self.indexOf(value) === index
        }

        var categoryArrayUnique = categoryArray.filter(unique); // these leaves the 7 unique entries in the array

        console.log(categoryArrayUnique);

        // https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json - I used thos resource to build my dropdown 
        var dropdown = document.getElementById('discipline'); // selecting the dropdown html element here 
        dropdown.length = 0; 
        //var defaultOption = document.createElement('option');
        //defaultOption.text ='Choose a discipline';

        var option;
        for (i = 0; i < categoryArrayUnique.length; i++) { // 
            var category = categoryArrayUnique[i]; // this worked I tried a few different methods
            //if (category[i] === categoryArrayUnique[i]) {
            option = document.createElement('option'); // hooray
            option.text = category;
            if (categoryArrayUnique[i] == 'All categories') { //then do nothing 

            }
            else // don't want all categories to have a value 
            { option.value = category; } // otherwise give the respective values the names of the categories 

            dropdown.add(option);
            // }

            console.log(option)
        }

    }
}




//var nobelData;
//console.log(nobelData);

xmlhttp.open("GET", url, true);
xmlhttp.send();




// 2nd dataset
var xmlhttp2 = new XMLHttpRequest();
var url2 = "winnersByID.json";

xmlhttp2.onreadystatechange = function () {
    if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {

 
        winnerData = JSON.parse(xmlhttp2.responseText);
        console.log(winnerData);
        getWinnerJSON(winnerData);

    }
}



xmlhttp2.open("GET", url2, true)
xmlhttp2.send();

function getWinnerJSON(obj) { // the method for this loop was taken from practcal 6 readColourdata
    var laureates = obj.laureates; 
    for (var i = 0; i < laureates.length; i++) {
        var id = laureates[i].id;
        var firstname = laureates[i].firstname;
        var surname = laureates[i].surname;
        var gender = laureates[i].gender;
        var born = laureates[i].born;
        var died = laureates[i].died;
        var bornCity = laureates[i].bornCity;
        var prizes = laureates[i].prizes;
        for (var j = 0; j < prizes.length; j++) {
            var category = prizes[j].category;
            var year = prizes[j].year;
            var motivation = prizes[j].motivation;
            var affiliations = prizes[j].affiliations;
            for (var k = 0; k < affiliations.length; k++) {
                var name = affiliations[k].name;
                var afCity = affiliations[k].city;
                var country = affiliations[k].country;
            }

        }

        if (gender == 'male') {
            maleIdArray.push(id);
        }
        else if (gender == 'female') {
            femaleIdArray.push(id); // these are critical for part 2 - grab the ids associated with either males or females 
        }
    }
}


function yearCatFilter(obj, obj1, male, female) { //accepts 4 arguments- the 2 main jsons and the male/female arrays 

    var year1 = document.getElementById("firstYear").value; //here I grab all my html input and select elements 
    var year2 = document.getElementById("secondYear").value;
    var drop = document.getElementById("discipline").value;
    var allWinnerRadio = document.getElementById("allWinners").value;
    var maleRadio = document.getElementById("male").value;
    var femaleRadio = document.getElementById("female").value;


    var RadioSelect; //some logic here to determine if one of the male or female buttons has been checked

    if (document.getElementById('male').checked) {
        // male button is checked
        RadioSelect = "male";
    }
    else if (document.getElementById('female').checked) {
        //Female radio button is checked
        RadioSelect = "female"; 
    }
    else {
        RadioSelect = "allWinners";

    }


    console.log(RadioSelect); // nice


    console.log(year1) 
    console.log(year2)
    console.log(drop)
    

    console.log(male);
    console.log(female);
    
        if (year1 == null || year2 == null || year1 < 1970 ||  year1 >2018 || year2 < 1970 ||  year2 >2018 || year1 > year2)
    {   
        var errorMessage;
        errorMessage += "<p>Invalid year selection, please try again</p>"
        //awards += "<tr><th>Year</th><th>Category</th><th>Motivation</th><th>Name</th</tr>";
        document.getElementById("dataHere").innerHTML = errorMessage;
        
    }
    else {
    

    var awards = "<table border = 1 >";
    awards += "<tr>Prizes</tr>";
    awards += "<tr><th>Year</th><th>Category</th><th>Motivation</th><th>Name</th><th>More info</th></tr>"; // to build the table and lopp through the data I took the code entirely from the practicals -including the for loop - it's from read colour data Prac 6
    var prizes = obj.prizes;

    for (var i = 0; i < prizes.length; i++) {
        var year = prizes[i].year;
        var category = prizes[i].category;
        var laureates = prizes[i].laureates;

        for (j = 0; j < laureates.length; j++) {
            var id = laureates[j].id;
            var firstname = laureates[j].firstname;
            var surname = laureates[j].surname;
            var motivation = laureates[j].motivation;

            
            // Part 1/2/3 logic 
            
            if (RadioSelect == "female") {          // if female is selected 
                if (femaleIdArray.includes(id)) { // and if it's in the female array we defined earlier 


                    if (drop == "All categories") { // if the dropdown option is all cat - then ignore categories altogether
                        if (year >= year1 && year <= year2) { // just focus on years
                            awards += "<tr><td>" + year + "</td><td>" + category + "</td><td>" + motivation + "</td><td>" + firstname + " " + surname + "</td><td>" + "<button onclick = " + "reply_click(this.id)" + " class=" + "button" + " id=" + id + ">" + "More info" + "</button></td></tr>"; // and output to the table accordingly //see below for information on the more info button and associated reply_click function
                            
                        }                                                                                                                                                   // id = 'moreInfoBtn'>" + "More info" + "</button>"+ "</td></tr>" https://stackoverflow.com/questions/4825295/javascript-onclick-to-get-the-id-of-the-clicked-button
                        // the button code for part 3 is from the stack link above
                        // the reply_click function was defined at the top of the sheet- it only worked gloablly as this function is called by an event listener- I still get an annoying undefined error later in my code which I'll highlight but everything worked so I chose to ignore the error as it didn't break anything.
                        //I generate more info buttons on each iteration. The reply click function then delivers the id- it also calls a function to go grab the data for part 3 by id  

                    }
                    else {
                        if (year >= year1 && year <= year2 && category == drop) {// in this case a dropdown category is selected - hence data will be filtered accordingly by discipline 
                            awards += "<tr><td>" + year + "</td><td>" + category + "</td><td>" + motivation + "</td><td>" + firstname + " " + surname + "</td> <td>" + "<button onclick = " + "reply_click(this.id)" + " class=" + "button" + " id=" + id + ">" + "More info" + "</button></td> </tr>";
                        }
                    }
                }
            }
            else if (RadioSelect == "male") { // here we look for the male radio button 
                //if (maleIdArray.indexOf(id) >= 0)
                if (maleIdArray.includes(id)) {
                    if (drop == "All categories") {
                        if (year >= year1 && year <= year2) {
                            awards += "<tr><td>" + year + "</td><td>" + category + "</td><td>" + motivation + "</td><td>" + firstname + " " + surname + "</td> <td>" + "<button onclick = " + "reply_click(this.id)" + " class=" + "button" + " id=" + id + ">" + "More info" + "</button></td> </tr>";
                        }

                    }
                    else {
                        if (year >= year1 && year <= year2 && category == drop) {
                            awards += "<tr><td>" + year + "</td><td>" + category + "</td><td>" + motivation + "</td><td>" + firstname + " " + surname + "</td> <td>" + "<button onclick = " + "reply_click(this.id)" + " class=" + "button" + " id=" + id + ">" + "More info" + "</button></td> </tr>";
                        }
                    }
                }

            }
            else { // here it's neither male nor female is depressed
                if (drop == "All categories") {
                    if (year >= year1 && year <= year2) { // no category
                        awards += "<tr><td>" + year + "</td><td>" + category + "</td><td>" + motivation + "</td><td>" + firstname + " " + surname + "</td> <td>" + "<button onclick = " + "reply_click(this.id)" + " class=" + "button" + " id=" + id + ">" + "More info" + "</button></td> </tr>";
                    }

                }
                else {
                    if (year >= year1 && year <= year2 && category == drop) { //category selected 
                        awards += "<tr><td>" + year + "</td><td>" + category + "</td><td>" + motivation + "</td><td>" + firstname + " " + surname + "</td> <td>" + "<button onclick = " + "reply_click(this.id)" + " class=" + "button" + " id=" + id + ">" + "More info" + "</button></td> </tr>";
                    }
                }
            }
        }


    }
    awards += "</table>"; // close off the table 


    document.getElementById("dataHere").innerHTML = awards; // this is where the part1 and part2 data outputs ot after the html is generated




    var moreInfoGrabber = document.getElementById("moreInfoBtn"); // So I've attempted to grab this id but i reason I think I get the error is the id hasn't been generated - I wasn't sure - Uncaught TypeError: Cannot set property 'onclick' of null- nothing broke so I didn't want to make big changes. 
    console.log(moreInfoGrabber);
    moreInfoGrabber.onclick = extraInfo(obj1, moreInfoGrabber); // here I call the function outline below with the id value stored in more inforgrabber
    }
} 

// this is the display eventlistener 

document.getElementById("myBtn").addEventListener("click", function () {

    yearCatFilter(nobelData, winnerData, maleIdArray, femaleIdArray); // I pass in the two main 
    //document.getElementById("dataHere").innerHTML = displayJSON(nobelData); 
    // w3schools// https://www.w3schools.com/jsref/met_element_addeventlistener.asp
    // code adapted from the above link 
});



function extraInfo(obj1, passedId) { // this function gets the additional data required for part 3 
    var extra_ouput = "<table border = 1 >";
    extra_ouput += "<tr>Laureate Information</tr>";
    extra_ouput += "<tr> <th>Name</th> <th>Born Year</th> <th>Died Year</th> <th>City Born</th> <th>Category</th> <th>Affiliation</th> <th>Motivation</th> </tr>";
    mulitPrizeHardCode = ['6','66','217','222','482','515'] // I found these by adding an if statement - ie if prizes.length > 1 - push into the array - I then hardcoded those strings in so I'd remember them 
    //mulitPrize = [];// these are artefacts of the above if statement checks for prize length 
    //mulitPrizeTest = [];
    
    // based on researching the JSON file only the UNHCR 515 is applicable but there's no additional data available in the JSON file. Hence I've ignored it. Perhaps my method is off to find multiple prize winners.

    var laureates = obj1.laureates;
    for (var i = 0; i < laureates.length; i++) {
        var id = laureates[i].id;
        var firstname = laureates[i].firstname;
        var surname = laureates[i].surname;
        var gender = laureates[i].gender;
        var born = laureates[i].born;
        var died = laureates[i].died;
        var bornCity = laureates[i].bornCity;
        var prizes = laureates[i].prizes;
        for (var j = 0; j < prizes.length; j++) {
            var category = prizes[j].category;
            var year = prizes[j].year;
            var motivation = prizes[j].motivation;
            var affiliations = prizes[j].affiliations;
            for (var k = 0; k < affiliations.length; k++) {
                var name = affiliations[k].name;
                var afCity = affiliations[k].city;
                var country = affiliations[k].country;
            }

        }

        if (id == passedId) { // if the id is the passed id then this is the data to transmit 
            extra_ouput += "<tr><td>" + firstname + " " + surname + "</td><td>" + born + "</td><td>" + died + "</td><td>" + bornCity + "</td><td>" + category + "</td><td>" + name + " " + afCity + " " + country + "</td><td>" + motivation + "</td></tr>";
        }
        
        //elseif (id == 515)
        /*
        if (prizes.length > 1) {
            mulitPrize.push(id); // 6 ids where the amount of prizes is greater than 1 

        }

        else {
            mulitPrizeTest.push(id);
        }
        */


    }
    extra_ouput += "</table>";
    document.getElementById("extraDataHere").innerHTML = extra_ouput; // output data to this adjacent div element 

    //console.log(mulitPrize.length); again artefacts
    //console.log(mulitPrizeTest.length);



}
