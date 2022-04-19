var htmlContent ="";
var FebNumberOfDays ="";
var counter = 1;
var dateNow = new Date();
var month = dateNow.getMonth();
var day = dateNow.getDate();
var year = dateNow.getFullYear();
var currentYear = year;
var nextMonth = month+1; 
var prevMonth = month-1;
var events = [5,9,12,15,23];
var check;
var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday"];
var dayPerMonth = ["31", ""+FebNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"];
var nextDate = new Date(nextMonth +' 1 ,'+year);
var weekdays= nextDate.getDay();
var weekdays2 = weekdays;
var numOfDays = dayPerMonth[month];
var eventDayCheck = 0;
var tempChange = "";


Number.prototype.mod = function(n) {
return ((this%n)+n)%n;
}

function daysInFeb(){
	if (month == 1){
		if ( (year%100!=0) && (year%4==0) || (year%400==0)){
			FebNumberOfDays = 29;
		}else{
			FebNumberOfDays = 28;
		}
	}
	
	dayPerMonth = ["31", ""+FebNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"];
}

function checkEvents(counter,  index){
	if (counter == events[index]){
		return true;
	}else if(counter < events[index] || index >= events.length){
		return false;
	}else{
		check = checkEvents(counter, index + 1);
		return check;
	}
}

var myLink;

function dayCheck() {
	if(month == dateNow.getMonth() && eventDayCheck == 0 && year == dateNow.getFullYear()){
		return dateNow.getDay();
	}
	if (eventDayCheck > 0){
		var dateString = monthNames[month] + " " + eventDayCheck + ", " + year;
		var tempDate = new Date(dateString);
		console.log(dateString);
		return tempDate.getDay();
	}else {
		return nextDate.getDay();
	}
}

function dateCheck(){
	if(month == dateNow.getMonth() && eventDayCheck == 0 && year == dateNow.getFullYear()){
		return dateNow.getDate();
	}
	if (eventDayCheck > 0){
		return eventDayCheck;
	}else {
		return nextDate.getDate();
	}
}

function monthChange(nextOrPrev){
	counter = 1;
	tempChange = nextOrPrev;
	if(tempChange == 'NEXT'){
		changeToNextMonth();
	}else if(tempChange == 'PREV'){
		changeToPrevMonth();
	}
	
	nextDate = new Date(nextMonth +' 1 ,'+year);
	weekdays= nextDate.getDay();
	weekdays2 = weekdays;
	numOfDays = dayPerMonth[month];
	eventDayCheck = 0;
	htmlContent ="";
	displayCalendar();
	tempChange = "";
}

function changeToNextMonth() {
	
	if (nextMonth == 12){
		nextMonth = 0;
	}
	
	month = nextMonth;
	
	if (month == 0){
		year+=1;
	}
	
	daysInFeb();
	
	prevMonth = ((nextMonth - 2) + 1).mod(12);
	nextMonth = (nextMonth	+ 1).mod(13);
	tempChange = "";
}

function changeToPrevMonth() {
	
	if (prevMonth == 12){
		prevMonth = 11;
	}
	
	var temp = prevMonth;
	month = prevMonth;
	
	if (month == 11){
		year-=1;
	}
	
	daysInFeb();
	
	nextMonth = ((prevMonth + 2) - 1).mod(13);
	prevMonth = (prevMonth	- 1).mod(13);
	tempChange = "";
}

$.ajax({

	url: "app.py/test",
	type: "GET",
	dataType: "text",
	success: function(data){
		console.log("python test" + data);
	}
});

var eventDes;
var eventTitle;
var eventSubtitle;
var eventUrl;
var eventBody;
function showEvents(dayNumber){
	if(dayNumber == 5)
	{
		eventTitle = "CommunityIT";
		eventSubtitle = "In this tutorial, we have learned to create a button with CSS.";
		eventDes = "In this tutorial, we have learned to create a button with CSS. We have used a border-radius property to do so. The fully rounded buttons take less space on the webpage. We can use these to make the web page good to see.";
		eventUrl = "<a href='https://brightspace.tudublin.ie/d2l/home'>event1</a>";
	}
	else if (dayNumber == 9)
	{
		eventTitle = "CommunityIT";
		eventSubtitle = "In this tutorial, we have learned to create a button with CSS.";
		eventDes = "In this tutorial, we have learned to create a button with CSS. We have used a border-radius property to do so. The fully rounded buttons take less space on the webpage. We can use these to make the web page good to see.";
		eventUrl = "<a href='https://brightspace.tudublin.ie/d2l/home'>event1</a>";
	}
	else if (dayNumber ==12)
	{
		eventTitle = "CommunityIT";
		eventSubtitle = "In this tutorial, we have learned to create a button with CSS.";
		eventDes = "In this tutorial, we have learned to create a button with CSS. We have used a border-radius property to do so. The fully rounded buttons take less space on the webpage. We can use these to make the web page good to see.";
		eventUrl = "<a href='https://brightspace.tudublin.ie/d2l/home'>event1</a>";
	}
	else if (dayNumber ==15)
	{
		eventTitle = "CommunityIT";
		eventSubtitle = "In this tutorial, we have learned to create a button with CSS.";
		eventDes = "In this tutorial, we have learned to create a button with CSS. We have used a border-radius property to do so. The fully rounded buttons take less space on the webpage. We can use these to make the web page good to see.";
		eventUrl = "<a href='https://brightspace.tudublin.ie/d2l/home'>event1</a>";
	}
	else if (dayNumber == 23)
	{
		eventTitle = "CommunityIT";
		eventSubtitle = "In this tutorial, we have learned to create a button with CSS.";
		eventDes = "In this tutorial, we have learned to create a button with CSS. We have used a border-radius property to do so. The fully rounded buttons take less space on the webpage. We can use these to make the web page good to see.";
		eventUrl = "<a href='https://brightspace.tudublin.ie/d2l/home'>event1</a>";
	}
	else {
		eventDes ="choose a day";
	}
	eventDayCheck = dayNumber;
	eventBody = "<h2>"+eventTitle+"</h2>" + "<h3>"+eventSubtitle+"</h3>" + "<p>"+eventDes+"</p>" + eventUrl;
	displayCalendar();
}

function displayCalendar(){

	while (weekdays>0){
		htmlContent += "<td class='monthPre'></td>";
	 
		weekdays--;
	}

	while (counter <= numOfDays){
	 
			var check = 0;
			if (weekdays2 > 6){
				weekdays2 = 0;
				htmlContent += "</tr><tr>";
			}
	 
			check = checkEvents(counter, 0);
			if (counter == day && month == dateNow.getMonth() && year == dateNow.getFullYear()){
				
				htmlContent +="<td class='dayNow'>"+counter+"</td>";
			}else if(checkEvents(counter, 0)){
				htmlContent +="<td class='eventNow' onclick = 'showEvents("+counter+")' style='cursor: pointer;'>"+counter+"</td>";
			}else{
				console.log("NO EVENT " + check);
				htmlContent +="<td class='monthNow'>"+counter+"</td>";
			}
			weekdays2++;
			counter++;
	}  
		
		
		var calendarBody = "<div class='col rightCol'><div class='content'><button id = 'btnSubmit2' method = 'GET'><</button><h2 class = 'year'>"+ year +" "+monthNames[month] +" </h2><button id = 'btnSubmit'>></button><table class='has'>";
		calendarBody +="<tr class='dayNames'>  <td>Sun</td>  <td>Mon</td> <td>Tues</td>"+
			"<td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>";
		calendarBody += "<tr>";
		calendarBody += htmlContent;
		calendarBody += "</tr></table></div></div><div class='col leftCol'><div class='content'><h1 class='date'>"+dayNames[dayCheck()]+"<span>"+monthNames[month] + "   "+ dateCheck() +"</span></h1><h2 class = 'year'>"+ year + "</h2><ul class='noteList'><li>"+eventBody+"</li></ul></div></div></div>";
		document.getElementById("calendar").innerHTML=calendarBody;
		document.getElementById("caldate").innerHTML= "<span class='cal'></span><span class='calmonth'>"+monthNames[month]+"</span><h1 class='calday'>"+day+"</h1>";
		document.getElementById("btnSubmit").addEventListener("click", function() {
			monthChange("NEXT");
		}, false);
		document.getElementById("btnSubmit2").addEventListener("click", function() {
			monthChange("PREV");
		}, false);

	
}
daysInFeb();




{/* <div class='notes'><p><input type='text' value='' placeholder='new note'/> */}
{/* <div class='notes'><p><input type='text' value='' placeholder=''/><a href='#' title='Add note' class='addNote animate'></a></p> */}