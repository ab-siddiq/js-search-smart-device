function searchPhone() {
    const searchText = document.getElementById("search-feild").value;
    console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}


// const searchPhone = (res) => {
//     return res;
// }
//       console.log(searchPhone)

function displayPhone(datas) {

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
        image.classList.add("card-img-top", "w-75", "m-auto", "mt-3", "rounded");
        image.src = datas[key].image;

        cardDiv.appendChild(cardBodyDiv);
        cardBodyDiv.classList.add("card-body");

        cardBodyDiv.innerHTML = `
                <span class="d-block text-bold">Brand: ${datas[key].brand}</span>
                <span class="d-block" >Model: ${datas[key].phone_name}</span>
                <span class="d-block" >Details: ${datas[key].slug}</span>
                
                <!-- Button trigger modal -->
                <button type="button" onclick="seeDetails('${datas[key].slug}')" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop">More Details</button>

  
                <!-- Modal -->
                <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="phone-name"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d" id="modal-body">
                                            
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                </div>
                
        
        `
        // element.classList.add("mystyle","d");


    }



}

function seeDetails(details) {
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data))
}

function showDetails(data) {
    for (const key in data) {
        console.log(data[key])
        document.querySelector("#phone-name").innerHTML = data[key].name;
       const phoneInformation =`
         <strong>Brand: </strong> ${data[key].brand} <br>
         <strong>Model: </strong> ${data[key].slug} <br>
          <strong>Release date: </strong>${data[key].releaseDate}
          
        `
        let mainFeatures, othersInformation
        let modalBody = document.querySelector(".modal-body")
        for (const a in data[key].mainFeatures) {
            console.log("ob of ob", data[key].mainFeatures[a])
            console.log("a", data[key].mainFeatures.storage)
            mainFeaturesObj = data[key].mainFeatures[a];
            
            mainFeatures = `
            <hr>
            <h2>Main feature:</h2> 
            <strong>Storage:</strong> ${data[key].mainFeatures.storage} <br>
            <strong>Display:</strong> ${data[key].mainFeatures.displaySize} <br>
            <strong>Chipset:</strong> ${data[key].mainFeatures.chipSet} <br>
            <strong>Memory:</strong> ${data[key].mainFeatures.memory} <br>
            <strong>Censors:</strong> ${data[key].mainFeatures.sensors} 
    
            
            `
        }

        for (const a in data[key].others) {
            console.log("ob of ob", data[key].others[a])
            // console.log("a", data[key].others.storage)
            // mainFeaturesObj = data[key].mainFeatures[a];

            othersInformation = `
            <hr>
           <h2> Others: </h2> 
            <strong>WLAN:</strong> ${data[key].others.WLAN} <br>
            <strong>Bluetooth:</strong> ${data[key].others.Bluetooth} <br>
            <strong>GPS:</strong> ${data[key].others.GPS} <br>
            <strong>NFC:</strong> ${data[key].others.NFC} <br>
            <strong>Radio:</strong> ${data[key].others.Radio}<br>
            <strong>USB:</strong> ${data[key].others.USB} 
    
            
            `
        }

        document.querySelector(".modal-body").innerHTML = phoneInformation+ mainFeatures + othersInformation;
        
    }
}