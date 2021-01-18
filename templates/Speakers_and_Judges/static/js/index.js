//import { speakers } from './speakers.js'

import { speakers } from "./speakers.js";

function showSpeakersAndHideJudges() {
  document.querySelector("#judges").style.display = "none";
  document.querySelector("#speakers").style.display = "grid";
  document.querySelector("#info").style.display = "none";
}

function showJudgesAndHideSpeakers() {
  document.querySelector("#speakers").style.display = "none";
  document.querySelector("#judges").style.display = "grid";
  document.querySelector("#info").style.display = "none";
}

function showInfoAndHideCards() {
  //console.log("Showing info hiding cards");
  document.querySelector("#speakers").style.display = "none";
  document.querySelector("#info").style.display = "block";
}
function showJudgeAndHideInfo() {
  document.querySelector("#judges").style.display = "none";
  document.querySelector("#info").style.display = "block";
}

// let imgperson1 = document.getElementById('imgperson1');
// imgperson1.addEventListener("click", showInfoAndHideCards);

speakers.init();

function createSpeakerCardsInDOM(){
  console.log("Hi");
  let speakerWrapper = document.getElementById("speakers");

  let pageHeader = document.createElement("h1");
  pageHeader.classList.add("header");
  pageHeader.textContent = "Speakers";
  speakerWrapper.append(pageHeader);

  for(let person of speakers.getSpeakerObjects()){
    console.log('hi');
    let personContainer = document.createElement("div");
    personContainer.classList.add = "person";
    
    let personImg = document.createElement("img");
    personImg.classList.add("imgperson");
    personImg.src = `${person.imgSrc}`;
    personImg.addEventListener("click", personOnClick.bind(person));
    personContainer.append(personImg);

    let cardsContainer = document.createElement("div");
    cardsContainer.classList.add("cards");

    let socialMedias = [ 
      [person.insta, "./static/images/insta.png", "insta"], 
      [person.linkedin, "./static/images/link.png", "link"], 
      [person.github, "./static/images/git.png", "git"]
    ]

    let socialMediaLink, socialMediaImgSrc, socialMediaImgClass;
    for([socialMediaLink, socialMediaImgSrc, socialMediaImgClass] of socialMedias){
      let socialMediaContainer = document.createElement("div");
      socialMediaContainer.classList.add("icon");

      let link = document.createElement("a");
      link.href = socialMediaLink;
      link.target = "_blank";

      let img = document.createElement("img");
      img.classList.add(socialMediaImgClass);
      img.src = socialMediaImgSrc;
      link.append(img);

      socialMediaContainer.append(link);
      cardsContainer.append(socialMediaContainer);
    }

    personContainer.append(cardsContainer);

    let personNameHeader = document.createElement("h5");
    personNameHeader.classList.add("title");
    personNameHeader.textContent = `${person.name}`;
    personContainer.append(personNameHeader);

    

    // cardsContainer.classList.add("icon");

    // let instaContainer = document.createElement("icon").classList.add("icon");
    
    // let instaLink = 


    speakerWrapper.append(personContainer);
  }
}

let currentSpeakerOnInfoPage = speakers.getSpeakerObjects()[0];
createSpeakerCardsInDOM();
showSpeakersAndHideJudges();
addEventListenersToInfoArrows();

function getCurrentSpeakerOnInfoPage(){
  return currentSpeakerOnInfoPage;
}

function setCurrentSpeakerOnInfoPage(speaker){
  currentSpeakerOnInfoPage = speaker;
}


function personOnClick(){
  setCurrentSpeakerOnInfoPage(this);

  console.log(currentSpeakerOnInfoPage);
  console.log("I was clicked");
  // Update the info-box-card with information unique to each person

  let infoHeading1 = document.getElementById("info-heading-1");
  infoHeading1.textContent = this.name;

  let infoHeading2 = document.getElementById("info-heading-2");
  infoHeading2.textContent = this.infoHeading2;

  let infoDate = document.getElementById("info-date");
  infoDate.textContent = this.infoDate;

  let infoPlatformAndTime = document.getElementById("info-platform-and-time");
  infoPlatformAndTime.textContent = this.infoPlatformAndTime;

  let infoSummary = document.getElementById("info-summary");
  infoSummary.textContent = this.infoSummary;

  let infoImg = document.getElementById("info-img");
  infoImg.src = this.imgSrc;


  // After updating info-box-card with the information of the person clicked, 
  // hide the cards view and enable the info view
  showInfoAndHideCards();

  // this.id stores the index of the selected person in the speakerObjects/judgeObjects array
  // on clicking the left arrow, the info of the person prior to it in the array should be shown
  // if it is not the first element. If it is the first element, the info of the last person in the array
  // should be shown

  // TODO : Make id a randomised but unique string, and here search for the index at which an object with that is present

  // let leftArrow = document.getElementById("info-left-arrow");
  // console.log(this.id);
  // if(this.id === 0){
  //   leftArrow.display = "none";
  // }
  // let previousPerson = (this.id !== 0)? speakers.getSpeakerObjects()[this.id-1] 
  //                                     : speakers.getSpeakerObjects()[speakers.getSpeakerTotalNumber() -1]; 
  // leftArrow.addEventListener("click", personOnClick.bind(previousPerson));

  // let rightArrow = document.getElementById("info-right-arrow");
  // let nextPerson = (this.id !== speakers.getSpeakerTotalNumber() -1)? speakers.getSpeakerObjects()[this.id+1]
  //                                                                : speakers.getSpeakerObjects()[0];
  // rightArrow.addEventListener("click", personOnClick.bind(nextPerson));


  
}

// A conscious decision was taken to add event listeners to the arrows outside the personOnClick()
// The alternative would involve reduntant arrow event listeners every time, despite the fact that their functionality remains the same
// More importantly, it would also involve recursive calls to personOnClick(), with the end result being 2^n personClick() executions 
// for the nth arrow click, which is highly inefficient 
function addEventListenersToInfoArrows(){
  let leftArrow = document.getElementById("info-left-arrow");
  leftArrow.addEventListener("click", () => {
    let currentSpeaker = getCurrentSpeakerOnInfoPage();

    // currentSpeaker.id stores the index of the currentSpeakerin the speakerObjects array.
    // Now, on clicking the left arrow, the info of the person prior to it in the array should be shown
    // if it is not the first element. If it is the first element, the info of the last person in the array
    // should be shown
    let previousPerson = (currentSpeaker.id !== 0)? speakers.getSpeakerObjects()[currentSpeaker.id-1] 
                                      : speakers.getSpeakerObjects()[speakers.getSpeakerTotalNumber() -1]; 

    // .call() calls a function but by binding this of the function to the first argument of the call function
    // Here, we call the personOnClick function with its this bounded to previousPerson, and hence the details of
    // the previousPerson are displayed                                    
    personOnClick.call(previousPerson);
  });

  let rightArrow = document.getElementById("info-right-arrow");
  rightArrow.addEventListener("click", () => {
    let currentSpeaker = getCurrentSpeakerOnInfoPage();

    // currentSpeaker.id stores the index of the currentSpeakerin the speakerObjects array.
    // Now, on clicking the right arrow, the info of the person next to it in the array should be shown
    // if it is not the last element. If it is the last element, the info of the first person in the array
    // should be shown
    let nextPerson = (currentSpeaker.id !== speakers.getSpeakerTotalNumber() -1)? 
      speakers.getSpeakerObjects()[currentSpeaker.id+1] : speakers.getSpeakerObjects()[0];

    // .call() calls a function but by binding this of the function to the first argument of the call function
    // Here, we call the personOnClick function with its this bounded to nextPerson, and hence the details of
    // the nextPerson are displayed   
    personOnClick.call(nextPerson);
  })
}




// Adds the general template for the info page to the DOM, but without any
// unique information, which is then updated as and when a speaker/judge is clicked on

// function initialiseInfoPageInDOM(){
//   let infoContainerDiv = document.createElement("div");
//   infoContainerDiv.classList.add("info");
//   infoContainerDiv.id = "info";
//   infoContainerDiv.style = "display: none";

//   let arrowDiv = document.createElement("div");

//   let arrowLeft = document.createElement("img");
//   arrowLeft.classList.add("arrowleft")
//   arrowLeft.src = "static/images/arrow-left.png";
//   arrowDiv.append(arrowLeft);

//   let arrowLeft = document.createElement("img");
//   arrowRight.classList.add("arrowright")
//   arrowRight.src = "static/images/arrow-right.png";
//   arrowDiv.append(arrowRight);

//   infoContainerDiv.append(arrowDiv);

//   let boxContainerDiv = document.createElement("div");
//   boxContainerDiv.classList.add("box");

//   let textContainerDiv = document.createElement("div");
//   textContainerDiv.classList.add("text1");


// }






