interface City {
    cityId: number;
    name: string;
    description: string;
    countryID: number;
    numberOfPointsOfInterest: number;
    country: country;
    cityLanguages: Array<cityLanguages>;
    pointsOfInterest: Array<pointsOfInterest>;
}

interface country {
    countryId: number;
    countryName: string;
}

interface countryList {
    countryName: string;
    citys: Array<City>;
}

interface pointsOfInterest {
    pointsOfInterestId: number;
    cityId: number;
    name: string;
    description: string;
}

interface cityLanguages {
    languageId: number;
    languageName: string;
}

interface CountryObject {
    [countryID: number]: {
      countryName: string;
      citys: City[];
    };
}

let url = "https://cityinfo.buchwaldshave34.dk/api";
let UserName = "&UserName=UserJacobJ"

function getCities() : Promise<Array<City>> {
    return fetch(url + "/City" + "?includeRelations=true" + "&UserName=UserJacobJ")
    .then (response => response.json())
    .then ((response) => {
        console.log("------")
        return response as Array<City>
    })
}


getCities()
.then(citylist => {

    const countryObject: CountryObject = {};

    citylist.forEach(city => {
        if (!countryObject[city.countryID]) {
            countryObject[city.countryID] = {
                countryName: city.country.countryName,
                citys: [city],
            };
        } else {
            countryObject[city.countryID].citys.push(city);
        }
    });

    const countryList = [];
    for (const countryID in countryObject) {
      if (countryObject.hasOwnProperty(countryID)) {
        countryList.push(countryObject[countryID]);
      }
    }

    console.log(countryList);
    displayCountrys(countryList);
});

function displayCountrys(countrys : Array<countryList>){
    countrys.forEach(count => {
        var button = document.createElement('input');
          button.type = 'button';
          button.setAttribute('ID', 'btn')
          button.value = count.countryName;
          var div = document.getElementById("div");
         div?.append(button);
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

