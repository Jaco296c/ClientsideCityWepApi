var url = "https://cityinfo.buchwaldshave34.dk/api";
var UserName = "&UserName=UserJacobJ";
function getCities() {
    return fetch(url + "/City" + "?includeRelations=true" + "&UserName=UserJacobJ")
        .then(function (response) { return response.json(); })
        .then(function (response) {
        console.log("------");
        return response;
    });
}
getCities()
    .then(function (citylist) {
    var countryObject = {};
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
    });
    var countryList = [];
    for (var countryID in countryObject) {
        if (countryObject.hasOwnProperty(countryID)) {
            countryList.push(countryObject[countryID]);
        }
    }
    console.log(countryList);
    displayCountrys(countryList);
});
function displayCountrys(countrys) {
    countrys.forEach(function (count) {
        var button = document.createElement('input');
        button.type = 'button';
        button.setAttribute('ID', 'btn');
        button.value = count.countryName;
        var div = document.getElementById("div");
        div === null || div === void 0 ? void 0 : div.append(button);
    });
}
// function displayCities (cities: Array<City>) {
//     cities.forEach(city => {
//          var button = document.createElement('input');
//          button.type = 'button';
//          button.setAttribute('ID', 'btn')
//          button.value = city.name + " " + city.country.countryName;
//          var div = document.getElementById("div");
//          div?.append(button);
//     }) 
// }
