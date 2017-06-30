/*
This is empty on purpose! Your code to build the resume will go here.
 */
var bio = {
    "name": "Bishwajit Kumar",
    "role": "Front-End Web Developer",
    "welcomeMessage": "Hi, I am Bishwajit, a enthusiastic Front-End Engineer. I have  adequate knowledge in HTML5, CSS3, and Javascript. I have completed many online moocs and i am in search of some intersting and really challenging website Development jobs",
    "biopic": "images/logo.jpg",
    "contacts": {
        "mobile": "+91 790 373 5102",
        "twitter": "bishwajit987",
        "github": "bishwajit987",
        "location": "Haldia,West Bengal",
        "email": "bishwajit987@gmail.com"
    },
    "skills": ["Web Development", "programming", "Web designs", "Bootstrap","Wordpress"]
};

var work = {
    "jobs": [{
        "employer": "Travis pvt ltd.",
        "title": "Web designs",
        "dates": "2014-Present",
        "location": "Mumbai, India",
        "description": "Making a user interface for their portal"
    }, {
        "employer": "Dhanbad Bootstrap",
        "title": "Bootstrap website",
        "dates": "2016-feb",
        "location": "Dhanbad, India",
        "description": "Develop a Bootstrap website"
    }, {
        "employer": "Haldia web-builders",
        "title": "Javascript programming",
        "dates": "2017-may",
        "location": "Haldia, West Bengal",
        "description": "Develop a Javascript app for their work"
    }]
};

var projects = {
    "projects": [{
        "title": "Online Portfolio",
        "dates": "2017",
        "description": "Online Portfolio as a part of Front-End nanodegree program at Udacity",
        "images": ["images/port.png", "images/port1.png", "images/port2.png"]
    }, {
        "title": "Online Resume",
        "dates": "2017",
        "description": "Online Resume as a part of Front-End nanodegree program at Udacity",
        "images": ["images/res.png", "images/res1.png", "images/res2.png"]
    }, {
        "title": "Arcade Game",
        "dates": "2017",
        "description": "Arcade Game as a part of Front-End nanodegree program at Udacity",
        "images": ["images/game.png", "images/game1.png", "images/game2.png"]
    }]
};

var education = {
    "schools": [{
        "name": "Haldia institute of technology",
        "location": "Haldia,West Bengal",
        "degree": "B.TECH",
        "majors": ["Electronics and communication"],
        "dates": "2014-2018",
        "url": "http://hithaldia.in/main/"
    }, 
    {
        "name": "Chinmaya Vidyala",
        "location": "Bokaro, Jharkhand",
        "degree": "Higher Secendory",
        "majors": ["Higher Secendory"],
        "dates": "2011-2013",
        "url": "http://chinmayabokaro.org/"
    }],
    "onlineCourses": [{
        "title": "Front-End Web Developer Nanodegree",
        "school": "Udacity",
        "dates": "2017",
        "url": "https://www.udacity.com/nanodegree"
    }, {
        "title": "Introduction to HTMLskills and CSS3",
        "school": "Coursera",
        "dates": "2017",
        "url": "https://www.coursera.org/"
    }]
};

//Bio
bio.display = function() {
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    var formattedImage = HTMLbioPic.replace("%data%", bio.biopic);
    var formattedMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    $("#header").prepend(formattedName, formattedRole).append(formattedImage, formattedMessage);
    $("#header").append(HTMLskillsStart);
    for (var skill = 0; skill < bio.skills.length; skill++) {
        var formattedSkills = HTMLskills.replace("%data%", bio.skills[skill]);
        $("#header").append(formattedSkills);
    }
    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    var formattedgithub = HTMLcontactGeneric.replace("%contact%", "github").replace("%data%", bio.contacts.github);
    $("#topContacts").append(formattedMobile, formattedEmail, formattedTwitter, formattedgithub);
    $("#footerContacts").append(formattedMobile, formattedEmail, formattedTwitter, formattedgithub);

};


education.display = function() {
    for (var school=0;school<education.schools.length;school++) {
        $("#education").append(HTMLschoolStart);
        var formattedName = HTMLschoolName.replace("%data%", education.schools[school].name);
        var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
        var formattedDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
        var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
        var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[school].majors);
        $(".education-entry:last").append(formattedName + formattedDegree, formattedDates, formattedLocation, formattedMajor);
    }
    
    if (education.onlineCourses.length !== 0) {
        $("#education").append(HTMLonlineClasses);
    }
    for (var course=0;course<education.onlineCourses.length;course++) 
    {
        $("#education").append(HTMLschoolStart);
        var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
        var formattedSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
        
        var formattedURL = HTMLonlineURL.replace("%data%", education.onlineCourses[course].url);
        $(".education-entry:last").append(formattedTitle + formattedSchool,formattedURL);
    }
};



work.display = function() {
    for (var job=0;job<work.jobs.length;job++) {
        $("#workExperience").append(HTMLworkStart);
        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
        var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
        var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
        var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
        $(".work-entry:last").append(formattedEmployer + formattedTitle, formattedDates, formattedLocation, formattedDescription);
    }
};

projects.display = function() {
    for (var item=0;item<projects.projects.length;item++) {
        $("#projects").append(HTMLprojectStart);
        var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[item].title);
        var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[item].dates);
        var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[item].description);
        $(".project-entry:last").append(formattedTitle, formattedDates, formattedDescription);
        for (var image=0;image<projects.projects[item].images.length;image++) {
            var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[item].images[image]);
            $(".project-entry:last").append(formattedImage);
        }
    }
};

bio.display();
education.display();
work.display();
projects.display();



$("#main").append(internationalizeButton);
$("#mapDiv").append(googleMap);