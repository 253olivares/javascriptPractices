
// this is a js document to practice our observation api
// we begin by calling all out cards
const cards = document.querySelectorAll(".card");

// create a new observer instance
const observer = new IntersectionObserver(entries => {

    // then we pass the entries we get into our observer
    // our entries we call later on down the code
    // out entries are retrieved when we call observer.observe(*element with all the cards we want to watch*)
    entries.forEach( entry =>{
        // target each one and set a toggle that with add a class list show when entry isIntersecting is true.
        entry.target.classList.toggle("show",entry.isIntersecting);
        // if we want loaded in elements to stay then we add the code below
        // if(entry.isIntersecting) observer.unobserve(entry.target)
    })
    console.log(entries)
},{
    // we then set params for our observer
    // we tell observer that we want to execute our code when our element is 75% of its way onto the page
    threshold:.5,
    // this lets us off set our observe from the top and bottom of our root
    rootMargin: "0px",
    // this lets you change your root to whatever you set it as.
    root:null
});

// create a new intersectionObserver instance with a different function but this time for our last child element so we can continuously load 
// new content
const lastCardObserver = new IntersectionObserver(entries => {
    // create a variable that references our entry that we assigned our intersection too
    const lastCard = entries[0]
    // if our lastCard isIntersecting is true then we return new cards

    console.log("lastCardObserver:", lastCard.isIntersecting);
    console.log("lastCardObserver:", !lastCard.isIntersecting);
    if(!lastCard.isIntersecting) return loadNewCards()

    // after which we unobserve our current card and load it onto a new element which is now the new last element
    lastCardObserver.unobserve(lastCard.target)
    lastCardObserver.observe(document.querySelector(".card:last-child"));
},{})

// we then observer our last element in the list for the first time
lastCardObserver.observe(document.querySelector(".card:last-child"))

// loop through and enable observe for each element
// our last element will have two different observers
cards.forEach( card => {
    observer.observe(card);
})

// this following is our load new card function that runs when our wbe detects the last element in the child elements
// it enables observing for the new elements and appends them to our div
const cardContainer = document.querySelector(".card-container");

function loadNewCards() {
    for (let i= 0; i<20; i++) {
        const card = document.createElement('div');
        card.textContent = "New Card"
        card.classList.add("card");
        observer.observe(card)
        cardContainer.append(card)
    }
}

