// This Code is CRUDS Project Which is Create Read Update Delete Search
// This Code Will Be Organized as Follows

// 1) We Will Get elements & Create the Child Buttons We Need Giving Them The Suitable Attribute

let title = document.querySelector('#title');
let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads = document.querySelector('#ads');
let discount = document.querySelector('#disc');
let total = document.querySelector('#total');
let count = document.querySelector('#count');
let catg = document.querySelector('#catg');
let btnCreate = document.querySelector('#create');
let cancelTotal = document.getElementById('cancelTotal');
let cancel = document.createElement('button');
cancel.setAttribute('id', 'cancel');
cancel.setAttribute('onclick', 'cancelNow()');
let deleteContainer = document.getElementById('deleteContainer');
let deleteAll = document.createElement('button');
deleteAll.setAttribute('id', 'deleteAll');
deleteAll.setAttribute('onclick', 'deleteStorage()');
deleteAll.setAttribute('title', 'You Will Delete All Items !!');
let search = document.getElementById('search');
search.setAttribute('placeholder', 'Search By Title');
let table;
let compareValue;
let namesID;
let searchvalue = 'searchTitle';

// 2) Create an array that will restore data from the localstorage every time we reload the page inorder not to lose our data also if there is no data it will be an empty array ready to store data

let newProduct;

if(localStorage.length > 0){
    newProduct = JSON.parse(localStorage.product);
}else{
    newProduct = [];
}

// 3) Create the functions that will work along with the code

// 3-1) Create the total function that will print the total final price of the product

function getTotal(){
    // if there is no value in the price input box or the value is equal to 0 this function will not work that is for clean data requirements as price should be mentioned first other wise it will work & change its styling
    if(price.value != '' && price.value != 0){
        total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;

        total.style.backgroundColor = '#faefaf';
    // reseting the value of total when the price is empty after pushing the data to our product array 
    }else{
        total.innerHTML = 0;
        total.style.backgroundColor = '#E1EEDD';
    }
}

// 3-2) this function for read the data from the array that restored previously from the local storage through looping on the array and each time it extract the data & print it in variable & finally print the value to show the data to the user this function will be called every time we make a change to the data in the array or localstorage that should be the same to keep the visual data to user sync with the main array of products data

function readData(){
    // table value equal to '' is a must in order to reset the variable and not to add to it in other words to reset the value every time we call this function & not to just stack the tables over each others in the table var
    table = '';
    for(let i = newProduct.length-1; i >= 0; i--){
        table += `<tr>`;
        table += `<td>${i + 1}</td>`;
        table += `<td>${newProduct[i].prodTitle}</td>`;
        table += `<td>${newProduct[i].prodPrice}</td>`;
        table += `<td>${newProduct[i].prodTaxes}</td>`;
        table += `<td>${newProduct[i].prodAds}</td>`;
        table += `<td>${newProduct[i].prodDis}</td>`;
        table += `<td>${newProduct[i].prodTotal}</td>`;
        table += `<td>${newProduct[i].prodCount}</td>`;
        table += `<td>${newProduct[i].prodCatg}</td>`;
        table += `<td><button onclick="updateItem(${i})" id="update">Update</button></td>`;
        table += `<td><input type="number" id="${i}"></td>`;
        table += `<td><button onclick="soldItems(${i})" id="sold">Sold</button></td>`;
        table += `<td><button onclick="deleteItem(${i})" title="You will Delete this Item" id="delete">Delete</button></td>`;
        table += `</tr>`;
    }
    // printing the values in HTML DOM
    document.getElementById('tbody').innerHTML = table;
    // this function will be explained in the next couple of lines but for now it is used to for the deleteAll button to check if there is data the this function can read so there is data in the storage therefore the deleteAll button will appear also this function use clear data in localstorage & the main array
    deleteNow();
}

// 3-3) The main function in this code that control every data entry in the code we call this function by pressing create button
function createNewProduct(){
    // if statement the switch check & switch between create to add new data or updata data called mode statement

    // first case create button
    if(btnCreate.innerHTML == 'Create'){
        // creating the object
        let product = {
            prodTitle: title.value.toLowerCase(),
            prodPrice: price.value,
            prodTaxes: taxes.value,
            prodAds: ads.value,
            prodDis: discount.value,
            prodCount: count.value,
            prodTotal: total.innerHTML,
            prodCatg: catg.value.toLowerCase(),
        }
        // to check if the user already write down the product name first or not in order not store empty data & to keep the data clean
        if(product.prodTitle == ''){
            window.alert('Please enter product name');
        }else{
            // to check of the product name is already stored or not in order not to store to much data with the same title the make the stored data kinda of messy when we want to read & search & update certain product
            for(let i = 0; i < newProduct.length; i++){
                if(newProduct[i].prodTitle == product.prodTitle){
                    // this condition push 1 value (true) every time it loops if it found similarity in data
                    compareValue = 1;
                }
            }
            if(newProduct.length != 0){
                if(compareValue == 1){
                    window.alert('Product already stored');
                }else{
                    // pushing the object to the array & push the array to the local storage
                    newProduct.push(product);
                    localStorage.setItem('product', JSON.stringify(newProduct));
                }
            }else{
                // if there is now data already stored in the localstorage so it start creating object normally push it to the array then push the array to the localstorage
                newProduct.push(product);
                localStorage.setItem('product', JSON.stringify(newProduct));
            }
            // reset the variable for another creation process 
            compareValue = 0;
        }
    }else{
        // second case update button
        for(let i = 0; i < newProduct.length; i++){
            if(newProduct[i].prodTitle == namesID){
                newProduct[i].prodTitle = title.value.toLowerCase();
                newProduct[i].prodPrice = price.value;
                newProduct[i].prodTaxes = taxes.value;
                newProduct[i].prodAds = ads.value;
                newProduct[i].prodDis = discount.value;
                newProduct[i].prodCount = count.value;
                newProduct[i].prodTotal = total.innerHTML;
                newProduct[i].prodCatg = catg.value.toLowerCase();
                break;
            }
        }
        // update the array with the new object data then remove the cancel button that will appear automatically if we asked for update
        localStorage.setItem('product', JSON.stringify(newProduct));
        cancelTotal.removeChild(cancel);
    }
    // to clear the inputs
    clearData();
    // to read the finally data in the local storage & detect if there is changes happened in order to represnt the new data
    readData();
    // to return the case to its default value create
    if(btnCreate.innerHTML == 'Update'){
        btnCreate.innerHTML = 'Create';
    }else{
        btnCreate.innerHTML = 'Create';
    }
}

// 3-4) Clear data function to clear the inputs forms we call it in the main create & update function

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value =' ';
    discount.value = '';
    total.innerHTML = '0';
    count.value = '';
    catg.value = '';
}

// 3-5) Delete a specified item when we click delete button this function takes a parameter which is i the index number if data in the readData()
function deleteItem(i){
    // splice the data specified by i & delete it also push the new main array to the local storage to over write it
    newProduct.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(newProduct));
    // to read & represent the new data
    readData();
}

// 3-5) Update a specified item when we click update button this function takes a parameter which is i the index number if data in the readData()
function updateItem(i){
    // first of this function prints the data from newProduct[i] to the inputs, second it takes the title of the product at newProduct[i] with given i parameter from readData() and copy it to namesID var to be able to do logical operations in the further future & be able to compare it to determine where to put the new data in the array when i press the update/create button
    btnCreate.innerHTML = 'Update';
    title.value = newProduct[i].prodTitle;
    price.value = newProduct[i].prodPrice;
    taxes.value = newProduct[i].prodTaxes;
    ads.value = newProduct[i].prodAds;
    discount.value = newProduct[i].prodDis;
    count.value = newProduct[i].prodCount;
    total.innerHTML = newProduct[i].prodTotal;
    catg.value = newProduct[i].prodCatg;
    namesID = title.value;
    // creating cancel button to reset data delete it from the inputs & reverse it
    cancelTotal.appendChild(cancel);
}

// 3-6) Cancel Function {}
function cancelNow() {
    clearData();
    cancelTotal.removeChild(cancel);
    btnCreate.innerHTML = 'Create';
}

// 3-7) Sold Function {}
function soldItems(i){
    let soldInput = document.getElementById(`${i}`)
    newProduct[i].prodCount = newProduct[i].prodCount -soldInput.value;
    localStorage.setItem('product', JSON.stringify(newProduct));
    readData();
}

// 3-8) Create DeleteAll Button Function {}
function deleteNow(){
    if(table.length > 0){
        deleteContainer.appendChild(deleteAll);
    }else{
        deleteContainer.removeChild(deleteAll);
    }
}

// 3-9) DeleteAll Button Function {}
function deleteStorage(){
    let choice = window.confirm('Are You Sure You Want To Delete All Items !!');
    if(choice == true){
        localStorage.clear();
        newProduct = [];
        readData();
    }
}

// 3-10) Search by name title or category ( mode function {} )
function searchMode(id){
    search.focus();
    if(id == 'searchTitle'){
        search.setAttribute('placeholder', 'Search By Title');
        searchvalue = 'searchTitle';
        search.value = '';
    }else{
        search.setAttribute('placeholder', 'Search By Category');
        searchvalue = 'searchCategory';
        search.value = '';
    }
    autoSearch();
}

// 3-11) AutoSearch function using onkeyup event {} it search letter by letter using includes()
function autoSearch(){
    table = '';
    if(searchvalue == 'searchTitle'){
        for(let i = newProduct.length-1; i >= 0; i--){
            if(newProduct[i].prodTitle.includes(search.value.toLowerCase())){
                table += `<tr>`;
                table += `<td>${i + 1}</td>`;
                table += `<td>${newProduct[i].prodTitle}</td>`;
                table += `<td>${newProduct[i].prodPrice}</td>`;
                table += `<td>${newProduct[i].prodTaxes}</td>`;
                table += `<td>${newProduct[i].prodAds}</td>`;
                table += `<td>${newProduct[i].prodDis}</td>`;
                table += `<td>${newProduct[i].prodTotal}</td>`;
                table += `<td>${newProduct[i].prodCount}</td>`;
                table += `<td>${newProduct[i].prodCatg}</td>`;
                table += `<td><button onclick="updateItem(${i})" id="update">Update</button></td>`;
                table += `<td><input type="number" id="${i}"></td>`;
                table += `<td><button onclick="soldItems(${i})" id="sold">Sold</button></td>`;
                table += `<td><button onclick="deleteItem(${i})" title="You will Delete this Item" id="delete">Delete</button></td>`;
                table += `</tr>`;
            }
        }
    }else{
        for(let i = newProduct.length-1; i >= 0; i--){
            if(newProduct[i].prodCatg.includes(search.value.toLowerCase())){
                table += `<tr>`;
                table += `<td>${i + 1}</td>`;
                table += `<td>${newProduct[i].prodTitle}</td>`;
                table += `<td>${newProduct[i].prodPrice}</td>`;
                table += `<td>${newProduct[i].prodTaxes}</td>`;
                table += `<td>${newProduct[i].prodAds}</td>`;
                table += `<td>${newProduct[i].prodDis}</td>`;
                table += `<td>${newProduct[i].prodTotal}</td>`;
                table += `<td>${newProduct[i].prodCount}</td>`;
                table += `<td>${newProduct[i].prodCatg}</td>`;
                table += `<td><button onclick="updateItem(${i})" id="update">Update</button></td>`;
                table += `<td><input type="number" id="${i}"></td>`;
                table += `<td><button onclick="soldItems(${i})" id="sold">Sold</button></td>`;
                table += `<td><button onclick="deleteItem(${i})" title="You will Delete this Item" id="delete">Delete</button></td>`;
                table += `</tr>`;
            }
        }
    }
    if(search.value == ''){
        readData();
    }
    document.getElementById('tbody').innerHTML = table;
}