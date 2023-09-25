var urlCountry = "https://cityinfo.buchwaldshave34.dk/api/Country";
var urlLanguage = "https://cityinfo.buchwaldshave34.dk/api/Language";
var urlCity = "https://cityinfo.buchwaldshave34.dk/api/City";
var PointOfInterest = "https://cityinfo.buchwaldshave34.dk/api/PointOfInterest";
var UserName = "&UserName=UserJacobJ";
// Get Cities from API and returns Array of Country
function getCities() {
    return fetch(urlCity + "?includeRelations=true" + "&UserName=UserJacobJ")
        .then(function (response) { return response.json(); })
        .then(function (response) {
        return response;
    });
}
// Get Countrys from API and returns Array of Country
function getCountrys() {
    return fetch(urlCountry + "?includeRelations=true" + "&UserName=UserJacobJ")
        .then(function (response) { return response.json(); })
        .then(function (response) {
        return response;
    });
}
function getLanguage() {
    return fetch(urlCountry + "?includeRelations=false" + "&UserName=UserJacobJ")
        .then(function (response) { return response.json(); })
        .then(function (response) {
        return response;
    });
}
function createPointOfInterest() {
    var cityGetId = document.getElementById("CitySelector");
    var pointsOfInterestName = document.getElementById("nameOfPointOfInterest");
    var pointsOfInterestDescription = document.getElementById("descriptionOfPointOfInterest");
    var newPointOfInterest = {
        cityId: cityGetId.value,
        name: pointsOfInterestName.value,
        description: pointsOfInterestDescription.value
    };
    fetch(PointOfInterest + "?UserName=UserJacobJ", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPointOfInterest),
    });
}
function createCity() {
    var countryGetId = document.getElementById("countrySelecter");
    var cityName = document.getElementById("nameBox");
    var cityDescription = document.getElementById("description");
    var newCity = {
        name: cityName.value,
        description: cityDescription.value,
        // numberOfPointsOfInterest
        countryID: countryGetId.value.split(' ')[0]
    };
    fetch(urlCity + "?UserName=UserJacobJ", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
    });
}
function selectCityForUpdate(city) {
    var cityName = document.getElementById("newCityName");
    var cityDescription = document.getElementById("newDescription");
    cityName.value = city.name;
    cityDescription.value = city.description;
    var confirmUpdateForCity = document.createElement('input');
    var contentArea = document.getElementById("updateButtonArea");
    contentArea === null || contentArea === void 0 ? void 0 : contentArea.replaceChildren();
    confirmUpdateForCity.type = 'button';
    confirmUpdateForCity.setAttribute('ID', 'btn');
    confirmUpdateForCity.value = 'Update';
    confirmUpdateForCity.addEventListener('click', function () { return confirmUpdateCity(city); });
    contentArea === null || contentArea === void 0 ? void 0 : contentArea.append(confirmUpdateForCity);
}
function confirmUpdateCity(city) {
    var newCityName = document.getElementById("newCityName");
    city.name = newCityName.value;
    var newCityDescription = document.getElementById("newDescription");
    city.description = newCityDescription.value;
    fetch(urlCity + "/" + city.cityId + "?UserName=UserJacobJ", {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
    });
}
function deleteCity(city) {
    fetch(urlCity + "/" + city.cityId + "?UserName=UserJacobJ", {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
    });
}
getCountrys()
    .then(function (countrylist) {
    var newCountrySelect = document.getElementById("countrySelecter");
    countrylist.forEach(function (countrys) {
        var option = document.createElement('option');
        option.text = countrys.countryID + " | " + countrys.countryName;
        newCountrySelect === null || newCountrySelect === void 0 ? void 0 : newCountrySelect.appendChild(option);
    });
});
getCities()
    .then(function (citylist) {
    // Creationg of Array for Countrys
    var countryObject = {};
    var citySelectPointOfInterest = document.getElementById("CitySelector");
    //Adds citys to Array that matches their Country or creates a new Country Array if it does not exist. 
    citylist.forEach(function (city) {
        if (!countryObject[city.countryID]) {
            countryObject[city.countryID] = {
                countryName: city.country.countryName,
                citys: [city],
            };
        }
        else {
            countryObject[city.countryID].citys.push(city);
        }
        var option = document.createElement('option');
        option.text = city.cityId + " | " + city.name + " - " + city.country.countryName;
        citySelectPointOfInterest === null || citySelectPointOfInterest === void 0 ? void 0 : citySelectPointOfInterest.appendChild(option);
    });
    var countryList = [];
    for (var countryID in countryObject) {
        if (countryObject.hasOwnProperty(countryID)) {
            countryList.push(countryObject[countryID]);
        }
    }
    displayCountrys(countryList);
});
function selectCityForAddLangeuge(city) {
}
//Shows list of Countrys and cities
function displayCountrys(countrys) {
    countrys.forEach(function (count) {
        var CountryName = document.createElement('p');
        CountryName.style.color = "red";
        CountryName.innerHTML = count.countryName;
        CountryName.setAttribute('ID', 'title');
        var div = document.getElementById("div");
        div === null || div === void 0 ? void 0 : div.append(CountryName);
        //For Each City - adds under Current Country
        count.citys.forEach(function (currentCity) {
            var cList = document.createElement('p');
            cList.style.color = "blue";
            cList.innerHTML = currentCity.name;
            cList.setAttribute('ID', 'title');
            var div = document.getElementById("div");
            div === null || div === void 0 ? void 0 : div.append(cList);
            //Change Langeuge for a city
            var lSelect = document.createElement('selectmultipule');
            var listOfLanguage = getLanguage();
            lSelect.setAttribute('ID', 'title');
            var div = document.getElementById("div");
            div === null || div === void 0 ? void 0 : div.append(lSelect);
            //Update Button For Each City
            var updateCittyBtn = document.createElement('input');
            updateCittyBtn.type = 'button';
            updateCittyBtn.setAttribute('ID', 'btn');
            updateCittyBtn.value = 'Update';
            updateCittyBtn.addEventListener('click', function () { return selectCityForUpdate(currentCity); });
            var div = document.getElementById("div");
            div === null || div === void 0 ? void 0 : div.append(updateCittyBtn);
            //Delete Button For Each City
            var deleteCittyBtn = document.createElement('input');
            deleteCittyBtn.type = 'button';
            deleteCittyBtn.setAttribute('ID', 'btn');
            deleteCittyBtn.value = 'Delete';
            deleteCittyBtn.addEventListener('click', function () { return deleteCity(currentCity); });
            var div = document.getElementById("div");
            div === null || div === void 0 ? void 0 : div.append(deleteCittyBtn);
            //Creates Space For Design
            var space = document.createElement('p');
            div === null || div === void 0 ? void 0 : div.append(space);
            //Shows all Languages
            currentCity.cityLanguages.forEach(function (Language) {
                var lan = document.createElement('h');
                lan.style.color = "black";
                lan.innerHTML = Language.languageName + " ";
                lan.setAttribute('ID', 'title');
                var div = document.getElementById("div");
                div === null || div === void 0 ? void 0 : div.append(lan);
            });
        });
    });
}
