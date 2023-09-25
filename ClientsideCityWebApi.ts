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
   countryID: number;
   countryName: string;
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
      citys: Array<City>;
   };
}

const urlCountry = "https://cityinfo.buchwaldshave34.dk/api/Country"
const urlLanguage = "https://cityinfo.buchwaldshave34.dk/api/Language"
const urlCity = "https://cityinfo.buchwaldshave34.dk/api/City";
const PointOfInterest = "https://cityinfo.buchwaldshave34.dk/api/PointOfInterest"
let UserName = "&UserName=UserJacobJ"

// Get Cities from API and returns Array of Country
function getCities(): Promise<Array<City>> {
   return fetch(urlCity + "?includeRelations=true" + "&UserName=UserJacobJ")
      .then(response => response.json())
      .then((response) => {
         return response as Array<City>
      })
}

// Get Countrys from API and returns Array of Country
function getCountrys(): Promise<Array<country>> {
   return fetch(urlCountry + "?includeRelations=true" + "&UserName=UserJacobJ")
      .then(response => response.json())
      .then((response) => {
         return response as Array<country>
      })
}
function getLanguage(): Promise<Array<cityLanguages>> {
   return fetch(urlCountry + "?includeRelations=false" + "&UserName=UserJacobJ")
      .then(response => response.json())
      .then((response) => {
         return response as Array<cityLanguages>
      })
}

function createPointOfInterest() {
   let cityGetId = document.getElementById("CitySelector") as HTMLSelectElement
   let pointsOfInterestName = document.getElementById("nameOfPointOfInterest") as HTMLInputElement;
   let pointsOfInterestDescription = document.getElementById("descriptionOfPointOfInterest") as HTMLInputElement;

   const newPointOfInterest = {
      cityId: cityGetId.value,
      name: pointsOfInterestName.value,
      description: pointsOfInterestDescription.value
   }
   fetch(PointOfInterest + "?UserName=UserJacobJ", {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(newPointOfInterest),
   })
}

function createCity() {
   let countryGetId = document.getElementById("countrySelecter") as HTMLSelectElement
   let cityName = document.getElementById("nameBox") as HTMLInputElement;
   let cityDescription = document.getElementById("description") as HTMLInputElement;
   const newCity = {
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
   })
}

function selectCityForUpdate(city: City) {
   let cityName = document.getElementById("newCityName") as HTMLInputElement;
   let cityDescription = document.getElementById("newDescription") as HTMLInputElement;
   cityName.value = city.name;
   cityDescription.value = city.description;


   var confirmUpdateForCity = document.createElement('input');
   var contentArea = document.getElementById("updateButtonArea");

   contentArea?.replaceChildren();
   confirmUpdateForCity.type = 'button';
   confirmUpdateForCity.setAttribute('ID', 'btn')
   confirmUpdateForCity.value = 'Update';
   confirmUpdateForCity.addEventListener('click', () => confirmUpdateCity(city));

   contentArea?.append(confirmUpdateForCity);
}

function confirmUpdateCity(city: City) {
   var newCityName = document.getElementById("newCityName") as HTMLInputElement;
   city.name = newCityName.value;
   var newCityDescription = document.getElementById("newDescription") as HTMLInputElement
   city.description = newCityDescription.value;

   fetch(urlCity + "/" + city.cityId + "?UserName=UserJacobJ", {
      method: "PUT",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(city),
   })
}

function deleteCity(city: City) {
   fetch(urlCity + "/" + city.cityId + "?UserName=UserJacobJ", {
      method: "DELETE",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(city),
   })
}

getCountrys()
   .then(countrylist => {
      const newCountrySelect = document.getElementById("countrySelecter");

      countrylist.forEach(countrys => {
         var option = document.createElement('option')
         option.text = countrys.countryID + " | " + countrys.countryName;
         newCountrySelect?.appendChild(option);
      })
   })


getCities()
   .then(citylist => {
      // Creationg of Array for Countrys
      const countryObject: CountryObject = {};
      const citySelectPointOfInterest = document.getElementById("CitySelector");
      //Adds citys to Array that matches their Country or creates a new Country Array if it does not exist. 
      citylist.forEach(city => {
         if (!countryObject[city.countryID]) {
            countryObject[city.countryID] = {
               countryName: city.country.countryName,
               citys: [city],
            };
         } else {
            countryObject[city.countryID].citys.push(city);
         }

         var option = document.createElement('option')
         option.text = city.cityId + " | " + city.name + " - " + city.country.countryName;
         citySelectPointOfInterest?.appendChild(option);
      });

      const countryList = [];
      for (const countryID in countryObject) {
         if (countryObject.hasOwnProperty(countryID)) {
            countryList.push(countryObject[countryID]);
         }
      }

      displayCountrys(countryList);
   });

function selectCityForAddLangeuge(city : City){
   
   
}
//Shows list of Countrys and cities
function displayCountrys(countrys: Array<CountryObject>) {
   countrys.forEach(count => {
      var CountryName = document.createElement('p');
      CountryName.style.color = "red"
      CountryName.innerHTML = count.countryName;
      CountryName.setAttribute('ID', 'title');
      var div = document.getElementById("div");
      div?.append(CountryName);


      //For Each City - adds under Current Country
      count.citys.forEach(currentCity => {
         var cList = document.createElement('p');
         cList.style.color = "blue"
         cList.innerHTML = currentCity.name;
         cList.setAttribute('ID', 'title')
         var div = document.getElementById("div");
         div?.append(cList);

         //Change Langeuge for a city
         var lSelect = document.createElement('selectmultipule');
         var listOfLanguage = getLanguage();
         lSelect.setAttribute('ID', 'title')
         var div = document.getElementById("div");
         div?.append(lSelect);

         //Update Button For Each City
         var updateCittyBtn = document.createElement('input');
         updateCittyBtn.type = 'button';
         updateCittyBtn.setAttribute('ID', 'btn')
         updateCittyBtn.value = 'Update';
         updateCittyBtn.addEventListener('click', () => selectCityForUpdate(currentCity));
         var div = document.getElementById("div");
         div?.append(updateCittyBtn);

         //Delete Button For Each City
         var deleteCittyBtn = document.createElement('input');
         deleteCittyBtn.type = 'button';
         deleteCittyBtn.setAttribute('ID', 'btn')
         deleteCittyBtn.value = 'Delete';
         deleteCittyBtn.addEventListener('click', () => deleteCity(currentCity));
         var div = document.getElementById("div");
         div?.append(deleteCittyBtn);

         //Creates Space For Design
         var space = document.createElement('p');
         div?.append(space);

         //Shows all Languages
         currentCity.cityLanguages.forEach(Language => {
            var lan = document.createElement('h');
            lan.style.color = "black"
            lan.innerHTML = Language.languageName + " ";
            lan.setAttribute('ID', 'title')
            var div = document.getElementById("div");
            div?.append(lan);
         });
      });
   });
}