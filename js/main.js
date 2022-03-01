function searchPhone() {
    const searchText = document.getElementById("search-feild").value;
    console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => display(data.data))
}

    
// const searchPhone = (res) => {
//     return res;
// }
//       console.log(searchPhone)

function display(datas) {
    
    const cardGroup = document.getElementById('card-group');
    cardGroup.innerHTML = "";
    for (const key in datas) {

       
        
        
        const colDiv = document.createElement('div');
        const cardDiv = document.createElement('div');
        const cardBodyDiv = document.createElement('div');
        const image = document.createElement('img');
        const phoneBrand = document.createElement('p');
        const phoneName = document.createElement('p');
       

        cardGroup.appendChild(colDiv);
        colDiv.classList.add("col");

        colDiv.appendChild(cardDiv);
        cardDiv.classList.add("card");

        cardDiv.appendChild(image);
        image.classList.add("card-img-top","w-75","m-auto","mt-3","rounded");
        image.src = datas[key].image;

        cardDiv.appendChild(cardBodyDiv);
        cardBodyDiv.classList.add("card-body");
        
        cardBodyDiv.innerHTML = `
                <span class="d-block text-bold">Brand: ${datas[key].brand}</span>
                <span class="d-block" >Model: ${datas[key].phone_name}</span>
                <span class="d-block" >Details: ${datas[key].slug}</span>
                <button type="button" onclick="seeDetails()" class="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter">More Details</button>
                
        
        `
        // element.classList.add("mystyle","d");
        

    }



}

function seeDetails() {
    console.log("yes i am here")
}