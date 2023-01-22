// write your code here

// 1 grab the ramen menu div in global scope
document.addEventListener("DOMContentLoaded", () => {
    const ramenMenu = document.getElementById('ramen-menu');
    const rating = document.querySelector('#rating-display');
    const comment = document.querySelector('#comment-display');
    const name = document.querySelector('h2, .name')
    const restaurant = document.querySelector('#restaurant')
    

    // 2 fetch ramen data from db.json + jsonify
    function fetchingRamen() {
    fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(ramenData => creatingRamenElements(ramenData))
    }
    fetchingRamen()

    function creatingRamenElements(ramenData) {
        // console.log(ramenData)
        // 4 send ramen image to fun to create ramen image element
        ramenData.forEach(ramen => {
            // console.log(ramen)
            let ramenImg = ramen.image;
            // console.log(ramenImg)
            const img = document.createElement('img');
            img.setAttribute('src', ramenImg);
            // 5 append ramen image element to the ramen menu div
            ramenMenu.appendChild(img);
            // 6 add click event listener to ramen img element
            img.addEventListener('click', (e) => {
                // 7 when event fired get ramen info from previous fetch + send to fun
                addingToRamenDetailDiv(ramen)
            })
        });
    }

    function addingToRamenDetailDiv(ramen) {
        console.log(ramen)
        // 8 fun will insert rating and comment into ramen detail div using innnerHTML
        name.innerHTML = ramen.name;
        restaurant.innerHTML = ramen.restaurant
        comment.innerHTML = ramen.comment;
        rating.innerHTML = ramen.rating
    };

    // 9 grab user entered values from add ramen inputs (all have ids)
    const nameInput = document.querySelector("#new-name");
    const resturantInput = document.querySelector('#new-restaurant')
    const imgInput = document.getElementById('new-image')
    const ratingInput = document.getElementById('new-rating')
    const commentInput = document.querySelector("#new-comment")

    const creatButton = document.querySelector("#new-ramen").lastElementChild;
    // 10 add event listener to create button
    // 11 when user clicks button send input values to fun
    creatButton.addEventListener('click', (e) => {
        e.preventDefault()
        // 12 fun will create obj with user entered data
        const newRamenObj = {
            name: nameInput.value,
            restaurant: resturantInput.value,
            image: imgInput.value,
            rating: ratingInput.value,
            comment: commentInput.value,
        }
        newRamenElement(newRamenObj)
        postingNewRamen(newRamenObj)
    })

    function newRamenElement(ramen) {
        let ramenImg = ramen.image;
        const img = document.createElement('img');
        img.setAttribute('src', ramenImg);
        ramenMenu.appendChild(img);
        img.addEventListener('click', (e) => {
            addingToRamenDetailDiv(ramen)
            document.getElementById('new-ramen').reset()
        })

    }

    function postingNewRamen(newRamenObj) {
        // 13 Post new ramen info to db.json via post request with obj as body value
        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRamenObj),
        })
        .then(resp => resp.json())
        .then(data => console.log('Success:', data))
        console.log(newRamenObj)
    }

  












})










/**As a user, I can:

See all ramen images in the div with the id of ramen-menu.
1 grab the ramen menu div in global scope

When the page loads, request the data from the server to get all the ramen objects. 
2 fetch ramen data from db.json + jsonify
3 take ramen data, iterate through, grab image proerty forEach ramen

Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.
4 send ramen image to fun to create ramen image element
5 append ramen image element to the ramen menu div

Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div and where it says insert comment here and insert rating here.
6 add click event listener to ramen img element
7 when event fired get ramen info from previous fetch + send to fun
8 fun will insert rating and comment into ramen detail div using innnerHTML


Create a new ramen after submitting the new-ramen form. The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page. 
9 grab user entered values from add ramen inputs (all have ids)
10 add event listener to create button
11 when user clicks button send input values to fun
12 fun will create obj with user entered data
13 Post new ramen info to db.json via post request with obj as body value

*/