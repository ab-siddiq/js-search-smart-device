// calling api clicking search button
const searchPhone = () => {
    const searchText = document.getElementById("search-feild").value;
    // console.log(searchText);
    toggleSpinner("block");
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => 
                displayPhone(data.data)
           
         )
}

const toggleSpinner = displaySpinner => {
    document.getElementById("spinner").style.display = displaySpinner;
}

// pass api data and show in ui
const displayPhone = (datas,statement) => {
    toggleSpinner("none");
    const cardGroup = document.getElementById('card-group');
    cardGroup.innerHTML = "";
    // result not found block
    if (datas=='') {
        cardGroup.innerHTML = `
        <div class="m-auto">
            <h2 class="justify-content-center  text-warning">No data found!</h2>
        <div>
        
        `;
    }
    // result found block
    else {
        if (datas.length >= 20) {
            let sliceRange = 20;
            for (const key in datas.slice(0,sliceRange)) {

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
                        <span class="d-block text-bold"><strong>Brand:</strong> ${datas[key].brand}</span>
                        <span class="d-block" ><strong>Model:</strong> ${datas[key].phone_name}</span>
                        <span class="d-block" ><strong>Details:</strong> ${datas[key].slug}</span>
                        <br>
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
            }
            const mainContent = document.getElementById("show-more-button");
            const addMoreButton = document.createElement("button");
            addMoreButton.innerHTML = "Show More";
            addMoreButton.classList.add("btn", "btn-primary","m-auto");
            mainContent.appendChild(addMoreButton);
        }
        else {
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
                        <span class="d-block text-bold"><strong>Brand:</strong> ${datas[key].brand}</span>
                        <span class="d-block" ><strong>Model:</strong> ${datas[key].phone_name}</span>
                        <span class="d-block" ><strong>Details:</strong> ${datas[key].slug}</span>
                        <br>
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
            }
            document.getElementById("show-more-button").style.display = "none";
        }
        
        
        
    }
}

// clicking show details and call api
const seeDetails = (details) => {
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data))
}

// passing api data and show details in ui
const showDetails = (data) => {
    // for phone data
        for (const key in data) {
            // console.log(data[key]);
            document.querySelector("#phone-name").innerHTML = data[key].name;
            let releaseDate = data[key].releaseDate || "Coming soon.."
           const phoneInformation =`
             <strong>Brand: </strong> ${data[key].brand} <br>
             <strong>Model: </strong> ${data[key].slug} <br>
              <strong>Release date: </strong>${releaseDate}
            `
            let mainFeatures, othersInformation;
            let modalBody = document.querySelector(".modal-body");
            // access main feature data
            for (const a in data[key].mainFeatures) {
                
                let storage = data[key].mainFeatures.storage || "Not available";
                let display = data[key].mainFeatures.displaySize || "Not available";
                let chipset = data[key].mainFeatures.chipSet || "Not available";
                let memory = data[key].mainFeatures.memory || "Not available";
                let sensors = data[key].mainFeatures.sensors || "Not available";
                
                mainFeatures = `
                <hr>
                <h2>Main feature:</h2> 
                <strong>Storage:</strong> ${storage} <br>
                <strong>Display:</strong> ${display} <br>
                <strong>Chipset:</strong> ${chipset} <br>
                <strong>Memory:</strong> ${memory} <br>
                <strong>Censors:</strong> ${sensors} 
                
                `
            }
            // access sensor data
            for (const a in data[key].others) {
                // console.log("ob of ob", data[key].others[a])
                // console.log("a", data[key].others.storage)
                // mainFeaturesObj = data[key].mainFeatures[a];
                let wlan = data[key].others.WLAN || "Not Available";
                let bluetooth = data[key].others.Bluetooth || "Not Available";
                let gps = data[key].others.GPS || "Not Available";
                let nfc = data[key].others.NFC || "Not Available";
                let radio = data[key].others.Radio || "Not Available";
                let usb = data[key].others.USB || "Not Available";
                othersInformation = `
                <hr>
               <h2> Others: </h2> 
                <strong>WLAN:</strong> ${wlan} <br>
                <strong>Bluetooth:</strong> ${bluetooth} <br>
                <strong>GPS:</strong> ${gps} <br>
                <strong>NFC:</strong> ${nfc} <br>
                <strong>Radio:</strong> ${radio}<br>
                <strong>USB:</strong> ${usb} 
                `
            }
        // set details information to the modal
            document.querySelector(".modal-body").innerHTML = phoneInformation+ mainFeatures + othersInformation;
            
        }
}