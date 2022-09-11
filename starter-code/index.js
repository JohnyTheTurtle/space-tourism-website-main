////define background img size
const BackgroundImgSize = function() {
    let sizeword
    if(window.innerWidth < 768){
        sizeword = "mobile.jpg"
    }else if(window.innerWidth >= 768 && window.innerWidth < 1440){
        sizeword = "tablet.jpg"
    } else if(window.innerWidth >= 1440){
        sizeword = "desktop.jpg"
    }
    return sizeword
}


////resize background img
const resizeBackgroundImg = function() {
    window.addEventListener('resize', ()=>{
        let sizeword = BackgroundImgSize()
        ///resize background
        const wrapperDiv = document.querySelector(".wrapper")
        const wrapperBackground = wrapperDiv.style.backgroundImage.split("-")
        wrapperBackground[2] = sizeword
        wrapperDiv.style.backgroundImage = wrapperBackground.join("-")
    })
}
resizeBackgroundImg()
////change background img on window resize


////show navigation bar in mobile mode
const showMobileNavBar = function() {
    const navButtonMobile = document.querySelector(".navbar button")
    const navListMobile = document.querySelector(".wrapper ul")
    const navListCloseMobile = document.querySelector(".wrapper ul img")
    window.addEventListener('resize', ()=>{
        if(window.innerWidth > 750){
            hideMobileNavBar()
        }
    });
    navButtonMobile.addEventListener("click", ()=> {
        navButtonMobile.style.display = "none"
        navListMobile.style.left = "121px"
        navListMobile.style.transition= "left 1s ease-out"
    })
    navListCloseMobile.addEventListener("click", ()=> {
        hideMobileNavBar()
    })
}



////hide navigation bar in mobile mode
const hideMobileNavBar = function() {
    const navButtonMobile = document.querySelector(".navbar button")
    const navListMobile = document.querySelector(".wrapper ul")
    navButtonMobile.style.display = null
    navListMobile.style.left = null
}
////Find clicked navigation link

const navbarClicked = function() {
    let nextSite
    const navbarLinks = document.querySelectorAll(".wrapper li")
    navbarLinks.forEach(a=> a.addEventListener("click", () => {
        const clickedNavLink = a.innerText
    ////Check if clicked navigation link is the current site
        const currentSite = document.querySelector(".content")
        try{
            if(!clickedNavLink.includes(currentSite.id)) {
                nextSite = a.id
                destroyCurrrentSite()
                fetchChatData(nextSite)
            } else {
                nextSite = ""
            }
        }catch(err){
            renderHomePage()
        }
    }))   
    
}

///Destroy current site
const destroyCurrrentSite = function() {
    const currentSite = document.querySelector(".content")
    hideMobileNavBar()
    currentSite.remove()
}


///Render home page
const renderHomePage = function() {
    const wrapperDiv = document.querySelector(".wrapper")
    wrapperDiv.style.backgroundImage = "url(./assets/home/background-home-"+BackgroundImgSize()+")"
    const contentDiv = document.createElement("div")
    contentDiv.className = "content"
    contentDiv.setAttribute("id", "HOME")
    const h2 = document.createElement("h2")
    h2.innerText = "So, you want to travel to"
    h2.className = "h2home"
    const h1 = document.createElement("h1")
    h1.innerText = "Space"
    h1.className = "h1home"
    const p = document.createElement("p")
    p.className = "phome"
    p.innerText = "Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!"
    const explorediv = document.createElement("div")
    explorediv.className = "explorediv"
    const exploreBtn = document.createElement("button")
    exploreBtn.className = "explore"
    exploreBtn.innerText = "Explore"
    exploreBtn.onclick = function() {
        destroyCurrrentSite()
        fetchChatData("1")
      }
    explorediv.append(exploreBtn)
    contentDiv.append(h2, h1, p, explorediv)
    wrapperDiv.append(contentDiv)
}
///Render Destination site
const renderDestination = function(inputData, planetnumber) {
    const wrapperDiv = document.querySelector(".wrapper")
    wrapperDiv.style.backgroundImage = "url(./assets/destination/background-destination-"+BackgroundImgSize()+")"
    const contentDiv = document.createElement("div")
    contentDiv.className = "content"
    contentDiv.setAttribute("id", "DESTINATION")
    const subsiteTitle = document.createElement("h2")
    subsiteTitle.className = "subsiteTitle"
    subsiteTitle.innerHTML = "<span>01 </span>Pick your destination"
    const planetdiv = document.createElement("div")
    planetdiv.className = "planetdiv"
    planetdiv.src = inputData[planetnumber].images.png
    const planet = document.createElement("img")
    planet.className = "planet"
    planet.src = inputData[planetnumber].images.png
    planetdiv.append(planet)
    const planetTypes = document.createElement("div")
    planetTypes.className = "planetTypes"
    planetTypes.innerHTML = "<p id='0'>moon</p><p id='1'>mars</p><p id='2'>europa</p><p id='3'>titan</p>"
    underscoreClicked(planetTypes.children[planetnumber])
    const planetName = document.createElement("h1")
    planetName.className = "planetName"
    planetName.innerText =inputData[planetnumber].name
    const planetDescription = document.createElement("p")
    planetDescription.className = "planetDescription"
    planetDescription.innerText = inputData[planetnumber].description
    const DistanceTitle = document.createElement("p")
    const distancesContainer = document.createElement("div")
    distancesContainer.className = "distancesContainer"
    DistanceTitle.className = "DistanceTitle"
    DistanceTitle.innerText = "Avg. distance"
    const distance = document.createElement("p")
    distance.className = "distance"
    distance.innerText = inputData[planetnumber].distance
    const estTravelTimeTiltle = document.createElement("p")
    estTravelTimeTiltle.className = "estTravelTimeTiltle"
    estTravelTimeTiltle.innerText = "est. travel time"
    const estTravelTime = document.createElement("p")
    estTravelTime.className = "estTravelTime"
    distancesContainer.append(DistanceTitle, distance, estTravelTimeTiltle, estTravelTime)
    estTravelTime.innerText = inputData[planetnumber].travel
    contentDiv.append(subsiteTitle, planetdiv, planetTypes, planetName, planetDescription, distancesContainer)

    wrapperDiv.append(contentDiv)
    renderPlanets(inputData)
}
const renderPlanets = function(inputData) {
    const planetTypes = document.querySelectorAll(".planetTypes p")
    const currentPlanet = document.querySelector(".planetName").innerText
    planetTypes.forEach(a=> a.addEventListener("click", ()=>{
        if(currentPlanet.toUpperCase() !== a.innerText.toUpperCase()){ 
            destroyCurrrentSite()
            renderDestination(inputData, a.id)
        }else if(currentPlanet.toUpperCase() === a.innerText.toUpperCase()){
            console.log("this is current planet")
        }
        
    }))
}
const underscoreClicked = function(clickedbutton) {
    clickedbutton.style.borderBottom = "solid 3px var(--title)"
    clickedbutton.style.color = "var(--title)"
}
///Render Crew site
const renderCrew = function(inputData, crewnumber) {
    const wrapperDiv = document.querySelector(".wrapper")
    wrapperDiv.style.backgroundImage = "url(./assets/crew/background-crew-"+BackgroundImgSize()+")"
    const contentDiv = document.createElement("div")
    contentDiv.className = "content"
    contentDiv.setAttribute("id", "CREW")
    const subsiteTitle = document.createElement("h2")
    subsiteTitle.className = "subsiteTitle"
    subsiteTitle.innerHTML = "<span>02 </span>Meet your crew"
    const crewmemberdiv = document.createElement("div")
    crewmemberdiv.className = "crewmemberdiv"
    const crewmember = document.createElement("img")
    crewmember.className = "crewmember"
    crewmember.src = inputData[crewnumber].images.png
    const crewslideleft = document.createElement("div")
    crewslideleft.className = "crewslide"
    crewslideleft.setAttribute("id", "left")
    const crewslidelefticon = document.createElement("ion-icon")
    crewslidelefticon.name = "chevron-back-circle-outline"
    crewslideleft.append(crewslidelefticon)
    const crewslideright = document.createElement("div")
    crewslideright.className = "crewslide"
    crewslideright.setAttribute("id", "right")
    const crewsliderighticon = document.createElement("ion-icon")
    crewsliderighticon.name = "chevron-forward-circle-outline"
    crewslideright.append(crewsliderighticon)
    crewmemberdiv.append(crewslideleft,crewmember, crewslideright)
    const crewmembers = document.createElement("div")
    crewmembers.className = "crewmembers"
    crewmembers.innerHTML = "<div id='0'></div><div id='1'></div><div id='2'></div><div id='3'></div>"
    markClicked(crewmembers.children[crewnumber])
    const crewmemberrole = document.createElement("p")
    crewmemberrole.className = "crewmemberrole"
    crewmemberrole.innerText = inputData[crewnumber].role
    const crewmembername = document.createElement("p")
    crewmembername.className = "crewmembername"
    crewmembername.setAttribute("id", crewnumber)
    crewmembername.innerText = inputData[crewnumber].name
    const crewmemberbio = document.createElement("p")
    crewmemberbio.className = "crewmemberbio"
    crewmemberbio.innerText = inputData[crewnumber].bio

    contentDiv.append(subsiteTitle, crewmemberdiv, crewmembers, crewmemberrole, crewmembername, crewmemberbio)
    wrapperDiv.append(contentDiv)
    renderCrewMembers(inputData)
    moveCrewMembers(inputData)
    // crewmember.scrollIntoView()
}
const renderCrewMembers = function(inputData){
    const crewMemberTypes = document.querySelectorAll(".crewmembers div")
    const currentCrewMmeber = document.querySelector(".crewmembername")
    crewMemberTypes.forEach(a=> a.addEventListener("click", ()=>{
        if(currentCrewMmeber.id !== a.id){ 
            console.log("changed crew")
            destroyCurrrentSite()
            renderCrew(inputData, a.id)
        }else if(currentCrewMmeber.id === a.id){
            console.log("this is current crew")
        }
        
    }))
}
const moveCrewMembers = function(inputData){
    const crewslide = document.querySelectorAll(".crewslide")
    const currentCrewMmeber = document.querySelector(".crewmembername").id
    crewslide.forEach(a=> a.addEventListener("click", ()=>{
        if(a.id === "left") {
            if(currentCrewMmeber === "0") {
                destroyCurrrentSite()
                renderCrew(inputData, 3)
            } else{
                destroyCurrrentSite()
                renderCrew(inputData, Number(currentCrewMmeber)-1)
            }
            
        }else if(a.id === "right") {
            if(currentCrewMmeber === "3") {
                destroyCurrrentSite()
                renderCrew(inputData, 0)
            } else{
                destroyCurrrentSite()
                renderCrew(inputData, Number(currentCrewMmeber)+1)
            }
        }
    }))
}

///Render Technology site
const renderTechnology = function(inputData, technumber) {
    const wrapperDiv = document.querySelector(".wrapper")
    wrapperDiv.style.backgroundImage = "url(./assets/technology/background-technology-"+BackgroundImgSize()+")"
    const contentDiv = document.createElement("div")
    contentDiv.className = "content"
    contentDiv.setAttribute("id", "TECHNOLOGY")
    const subsiteTitle = document.createElement("h2")
    subsiteTitle.innerHTML = "<span>03 </span>space launch 101"
    subsiteTitle.className = "subsiteTitle"
    const techtype = document.createElement("img")
    techtype.className = "techtype"
    if(BackgroundImgSize() === "desktop.jpg"){
        techtype.src = inputData[technumber].images.portrait
    } else{
        techtype.src = inputData[technumber].images.landscape
    }
    
    const techtypes = document.createElement("div")
    techtypes.className = "techtypes"
    techtypes.innerHTML = "<div id='0'>1</div><div id='1'>2</div><div id='2'>3</div>"
    markClicked(techtypes.children[technumber])
    const techrole = document.createElement("p")
    techrole.className = "techrole"
    techrole.innerText = "the terminology..."
    const techname = document.createElement("p")
    techname.className = "techname"
    techname.setAttribute("id", technumber)
    techname.innerText = inputData[technumber].name
    const techdescription = document.createElement("p")
    techdescription.className = "techdescription"
    techdescription.innerText = inputData[technumber].description
    
    contentDiv.append(subsiteTitle, techtype, techtypes, techrole, techname, techdescription)
    wrapperDiv.append(contentDiv)
    renderTechnologies(inputData)
}
const renderTechnologies = function(inputData) {
    const techTypes = document.querySelectorAll(".techtypes div")
    const currentTechType = document.querySelector(".techname")
    techTypes.forEach(a=> a.addEventListener("click", ()=>{
        if(currentTechType.id !== a.id){ 
            destroyCurrrentSite()
            renderTechnology(inputData, a.id)
        }else if(currentTechType.id === a.id){
            console.log("this is current tech")
        }
    }))
}
const markClicked = function(clickedbutton) {
    clickedbutton.style.backgroundColor = "var(--title)"
    clickedbutton.style.color = "var(--black)"
    clickedbutton.style.fontWeight = "700"
}
///Render sites
const renderSites = function(inputData, nextsite) {
    let sitename = "destinations"
    switch(nextsite) {
        case "1":
            sitename = "destinations"
            renderDestination(inputData[sitename], 0)
            navBarSelectedPage()
            break;
        case "2":
            sitename = "crew"
            renderCrew(inputData[sitename], 0)
            navBarSelectedPage()
            break;
        case "3":
            sitename = "technology"
            renderTechnology(inputData[sitename], 0)
            navBarSelectedPage()
            break;
        default:
            renderHomePage()
            navBarSelectedPage()
    }
    
}





////Fetch json data
const fetchFeed = async() => {
    const reply = await fetch("./data.json")
    const data = await reply.json()
    return data
}
const fetchChatData = async(nextsite) => {
    const SiteData = await fetchFeed()
    
    renderSites(SiteData, nextsite)
}

////define opened page name and style navigation bar
const navBarSelectedPage = function() {
    const currentSite = document.querySelector(".content").id
    const allNavBars = document.querySelectorAll("ul li")
    allNavBars.forEach(a=> a.style.boxShadow = null)
    const underlineStyle = "0 2px 0px white"
    switch(currentSite) {
        case "HOME":
            console.log(currentSite, "HOME", allNavBars)
            allNavBars[0].style.boxShadow = underlineStyle
            break;
        case "DESTINATION":
            console.log(currentSite, "DESTINATION")
            allNavBars[1].style.boxShadow = underlineStyle
            break;
        case "CREW":
            console.log(currentSite, "CREW")
            allNavBars[2].style.boxShadow = underlineStyle
            break;
        case "TECHNOLOGY":
            console.log(currentSite, "TECHNOLOGY")
            allNavBars[3].style.boxShadow = underlineStyle
            break;
        default:

    }
}


///Call functions
renderHomePage()
showMobileNavBar()
navbarClicked()
navBarSelectedPage()