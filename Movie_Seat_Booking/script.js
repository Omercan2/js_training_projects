const container=document.querySelector(".container")
const seats=document.querySelectorAll(".row .seat:not(.occupied)")
const count=document.getElementById("count")
const total=document.getElementById("total")
const movieSelect=document.getElementById("movie")

populateUI()

let ticketPrice=+movieSelect.value//converting string to a number with +


//save selected movie index and price
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem("selectedMovieIndex",movieIndex)
    localStorage.setItem("selectedMoviePrice",moviePrice)
}

//update total and count
function updateSelectedCount(){
const selectedSeats=document.querySelectorAll(".row .seat.selected")

const seatsIndex=[...selectedSeats].map((seat)=>{
return [...seats].indexOf(seat)
})//spread operator

localStorage.setItem("selectedSeats",JSON.stringify(seatsIndex))

count.innerText=selectedSeats.length
total.innerText=selectedSeats.length*ticketPrice




}
//get data from local storage and populate UI
function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem("selectedSeats"))
    if(selectedSeats!=null&&selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add("selected")
            }
        })
    }  
    selectedMovieIndex=  localStorage.getItem("selectedMovieIndex")
    if(selectedMovieIndex!=null){
        movieSelect.selectedIndex=selectedMovieIndex
    }
}

//movie select element
movieSelect.addEventListener("change",e=>{
ticketPrice=+e.target.value
setMovieData(e.target.selectedIndex,e.target.value)
updateSelectedCount()
})

//seat click event
container.addEventListener("click",(e)=>{
    if(e.target.classList.contains("seat")&&!e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected")

        updateSelectedCount()

    }
})
//ınıtial count and total set
updateSelectedCount()
