var htmlContent ="";
var FebNumberOfDays ="";
var counter = 1;
var dateNow = new Date();
var month = dateNow.getMonth();
var day = dateNow.getDate();
var year = dateNow.getFullYear();
var nextMonth = month+1; 
var prevMonth = month-1;
var events = [5,9,12,15];
var check;

if (month == 1){
     if ( (year%100!=0) && (year%4==0) || (year%400==0)){
         FebNumberOfDays = 29;
     }else{
         FebNumberOfDays = 28;
     }
 }
 
var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday"];
var dayPerMonth = ["31", ""+FebNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"];
var nextDate = new Date(nextMonth +' 1 ,'+year);
var weekdays= nextDate.getDay();
var weekdays2 = weekdays;
var numOfDays = dayPerMonth[month];


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

function changeToNextMonth() {
	counter = 1;
	if (nextMonth == 12){
		nextMonth = 0;
	}
	
	dateNow = nextDate;
	month = nextMonth;
	
	if (month == 0){
		year+=1;
	}
	
	if (month == 1){
		if ( (year%100!=0) && (year%4==0) || (year%400==0)){
			FebNumberOfDays = 29;
		}else{
			FebNumberOfDays = 28;
		}
	 
		dayPerMonth = ["31", ""+FebNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"];
	}
	
	prevMonth = ((nextMonth - 2) + 1).mod(12);
	nextMonth = (nextMonth	+ 1).mod(13);
	

	nextDate = new Date(nextMonth +' 1 ,'+year);
	weekdays= nextDate.getDay();
	weekdays2 = weekdays;
	numOfDays = dayPerMonth[month];
	console.log(": "+ FebNumberOfDays);

	htmlContent ="";
	displayCalendar();
	console.log(": "+ monthNames[month]  + " WEEKDAYS" + weekdays + " WEEKDAYS2" + weekdays2 + " NUMOFDAYS" + numOfDays + " YEAR: " + year + " NUM: " + month);
}

Number.prototype.mod = function(n) {
return ((this%n)+n)%n;
}

function changeToPrevMonth() {
	counter = 1;
	
	if (prevMonth == 12){
		prevMonth = 11;
	}
	
	dateNow = nextDate;
	var temp = prevMonth;
	month = prevMonth;
	
	if (month == 11){
		year-=1;

	}
	
	if (month == 1){
		if ( (year%100!=0) && (year%4==0) || (year%400==0)){
			FebNumberOfDays = 29;
		}else{
			FebNumberOfDays = 28;
		}
	 
		dayPerMonth = ["31", ""+FebNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"];
	}
	
	nextMonth = ((prevMonth + 2) - 1).mod(13);
	prevMonth = (prevMonth	- 1).mod(13);

	nextDate = new Date(nextMonth +' 1 ,'+year);
	weekdays= nextDate.getDay();
	weekdays2 = weekdays;
	numOfDays = dayPerMonth[month];
	console.log(": "+ FebNumberOfDays);

	htmlContent ="";
	displayCalendar();
	console.log(": "+ monthNames[month]  + " WEEKDAYS" + weekdays + " WEEKDAYS2" + weekdays2 + " NUMOFDAYS" + numOfDays + " YEAR: " + year + " NUM: " + month + " PrevMonth: " + prevMonth+ " NextMonth: " + prevMonth);
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
			if (counter == day){
				htmlContent +="<td class='dayNow'>"+counter+"</td>";
			}else if(checkEvents(counter, 0)){
				htmlContent +="<td class='dayNow' onclick = 'location.href='#';' style='cursor: pointer;'>"+counter+"</td>";
			}else{
				console.log("NO EVENT " + check);
				htmlContent +="<td class='monthNow'>"+counter+"</td>";
			}
	 
			weekdays2++;
			counter++;
	}  
		
		var calendarBody = "<div class='col rightCol'><div class='content'><h2 class = 'year'>"+ year + "</h2><button id = 'btnSubmit2'><</button><button id = 'btnSubmit'>></button><table class='has'>";
		calendarBody +="<tr class='dayNames'>  <td>Sun</td>  <td>Mon</td> <td>Tues</td>"+
			"<td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>";
		calendarBody += "<tr>";
		calendarBody += htmlContent;
		calendarBody += "</tr></table></div></div><div class='col leftCol'><div class='content'><h1 class='date'>"+dayNames[dateNow.getDay()]+"<span>"+monthNames[month] + "   "+ day +"</span></h1><div class='notes'><p><input type='text' value='' placeholder='new note'/><a href='#' title='Add note' class='addNote animate'>+</a></p><ul class='noteList'><li>"+dateNow.getDate()+"Headbutt a lion<a href='#' title='Remove note' class='removeNote animate'>x</a></li></ul></div></div></div>";
		document.getElementById("calendar").innerHTML=calendarBody;
		document.getElementById("btnSubmit").addEventListener("click", changeToNextMonth);
		document.getElementById("btnSubmit2").addEventListener("click", changeToPrevMonth);

	
}