/* My first scraper
* Author: Roshan Abraham
* Date: 10/13/16
*/


var cheerio = require("cheerio"),
	request = require("request");

	sequelize = require("sequelize"),
	config = require("./config.js").config,

	//connect to the DB
	
	db = new sequelize(config.mysql.db, config.mysql.user, config.mysql.pass, {dialectOptions:{ socketPath: config.mysql.socketPath}, logging: true}),

   wiki = db.import(__dirname + "/wiki_ex")

   // wiki.findorCreate({where: {title: 
  // 	"Book Title"},
//defaults: SCRAPER OBJECT
  // })

//wiki.create(SCRAPER OBJECT);



//set the URL of the page I want to scrape
//create a var called scrape that calls a function; in the function, 
//when there's a page, request a form with pay year 2015;state is executive, judicial, legislative;
//subAgencyName is every subagency
//url is , nav request is 1
var scrape = function(page){
	form = {
		PayYear: [2015],
		BranchName: ["State - Executive", "State - Judicial", "State - Legislative"],
		SubAgencyName: [
			"Adirondack Correctional Facility",
			"Albion Correctional Facility", 
			"Altona Correctional Facility", 
			"Arthur Kill Correctional Facility",
			"Attica Correctional Facility",
			"Auburn Correctional Facility",
			"Bare Hill Correctional Facility",
			"Bayview Correctional Facility",
			"Cayuga Correctional Facility",
			"Beacon Correctional Facility",
			"Cape Vincent Correctional Facility",
			"Chateaugay Correctional Facility",
			"Clinton Correctional Facility",
			"Collins Correctional Facility",
		    "Coxsackie Correctional Facility",
			"Downstate Correctional Facility",
			"Eastern NY Correctional Facility",
			"Edgecombe Correctional Facility",
			"Elmira Correctional Facility&Recep Ctr",
			"Fishkill Correctional Facility",
			"Franklin Correctional Facility",
			"Gouverneur Correctional Facility",
			"Gowanda Correctional Facility",
			"Great Meadow Correctional Facility",
			"Green Haven Correctional Facility",
			"Greene Correctional Facility",
			"Groveland Correctional Facility",
			"Hale Creek Correctional Facility",
			"Hudson Correctional Facility",
			"Lincoln Correctional Facility",
			"Livingston Correctional Facility",
		    "Marcy Correctional Facility",
			"Mid Orange Correctional Facility",
			"Mid State Correctional Facility",
			"Mohawk Correctional Facility",
			"Mt McGregor Correctional Facility",
			"NYS Commission of Correction",
			"Ogdensburg Correctional Facility",
			"Orleans Correctional Facility",
			"Otisville Correctional Facility",
			"Queensboro Correctional Facility",
			"Riverview Correctional Facility",
			"Rochester Correctional Facility",
			"Shawangunk Correctional Facility",
			"Sing Sing Correctional Facility",
			"Southport Correctional Facility",
			"Sullivan Correctional Facility",
			"Taconic Correctional Facility",
			"Ulster Correctional Facility",
			"Upstate Correctional Facility",
			"Wallkill Correctional Facility",
			"Washington Correctional Facility",
			"Watertown Correctional Facility",
			"Wende Correctional Facility",
			"Wyoming Correctional Facility",
			"Woodbourne Correctional Facility"
		],
		SortBy: "YTDPay DESC",
		current_page: page,
		url: "/tools/required/reports/payroll?action=get",
		nav_request: 1
	};

	//request the post at this URL
	//callback the functions err, response, and body
	//set a variable called body that is ??
	// load cheerio as body ??

	request.post({uri: "http://seethroughny.net/tools/required/reports/payroll?action=get",
	 headers: {Referer: "http://seethroughny.net/payrolls/state-government"}, form: form}, function (err, response, body) {
		var body = JSON.parse(body);
			$ = cheerio.load(body.html);

//log the body to the console

		console.log(body);

		//go to the table row with the id resultRow, for each element execute a function:
		// define table row for every element as
		// create an object called payment with the following values:
		// in a value called name, find the second table row with the id td,
		// look at the text in that table row but replace 's's with empty quotes
		// replace space-in with empty quotes
		// a value called facility that goes to the fifth table row and gets the text
		// a variable called payment that goes to the fourth table row called td, gets the text
		// replace any digits higher than 0-9 g with empty quotes
		// log this to the console




		$("tr[id*='resultRow']").each(function(){
			var tr = $(this),
				payment = {
					name: tr.find("td").eq(1).text().trim().replace(/\s+/, "").replace("\n", ""),
					facility: tr.find("td").eq(4).text(),
					payment: parseInt(tr.find("td").eq(3).text().replace(/[^0-9]+/g, ""))
				};
			console.log(payment);
			wiki.create(payment);
		});

		// if the page is less than the total number of pages in the body, add 1 to the page, scrape that page

		if(page < body.total_pages){
			page = page + 1;
			scrape(page);
		}

	});
}

scrape(1);




//wiki.create(SCRAPER OBJECT);







