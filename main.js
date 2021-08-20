// old school promises

// fetch("https://dog.ceo/api/breeds/list/all").then(function (response) {
//     return response.json()
// }).then(function (data) {
//     console.log(data)
// })


// The modren way of promise


// Fetching data

let timer
let deleteFirstPhoto
async function start() {
    // try to fetch data
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        // console.log(data)
        createBreeList(data.message)
    } catch (e) {
        console.log("there was a problem!")
    }

}

start()


// Creating the select element
function createBreeList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select name="" id="" onchange="loadByBreed(this.value)">
        <option value="">Choose a dog breed</option>
        ${Object.keys(breedList).map(function (breed) {
        return `<option>${breed}</option>`
    }).join('')}
    </select>
    `
}




async function loadByBreed(breed) {
    if (breed != "Choose a dog breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideShow(data.message)
    }
}

function createSlideShow(images) {

    // current position zero
    let currentPosition = 0

    // restting the time interval
    clearInterval(timer)
    clearTimeout(deleteFirstPhoto)
    if (images.length > 1) {
        document.getElementById("slideshow").innerHTML = `
    <div
          class="slide"
          style="
            background-image: url('${images[0]}');
          "
        ></div>
        <div
          class="slide"
          style="
            background-image: url('${images[0]}');
          "
        ></div>
    `
        currentPosition += 2
        if (images.length == 2) currentPosition = 0
        timer = setInterval(nextSlide, 3000);

    } else {
        document.getElementById("slideshow").innerHTML = `
        <div
              class="slide"
              style="
                background-image: url('${images[0]}');
              "
            ></div>
            <div
          class="slide"></div>
        `
    }




    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div
        class="slide"
        style="
          background-image: url('${images[currentPosition]}');
        "
      ></div>`)
        deleteFirstPhoto = setTimeout(function () {
            document.querySelector(".slide").remove()
        }, 3000)
        if (currentPosition + 1 >= images.length) {
            currentPosition = 0
        } else {
            currentPosition++
        }
    }

}
