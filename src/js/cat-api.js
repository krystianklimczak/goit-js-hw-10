// imports
import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

// private api key value
axios.defaults.headers.common['x-api-key'] =
  'live_9R8j19H2FQzgQgJrOfXgYSY1bsTldeTIOCMHWzrRHlz0o28A1UzViBhrcc5Py9Xn';

// variables
export const breedSelect = document.querySelector('.breed-select');
export const catInfo = document.querySelector('.cat-info');
const loaderLog = document.querySelector('.loader');
const loaderrLog = document.querySelector('.loaderr');
// export const errorLog = document.querySelector('.error');

// body

function addCatsToSelectOptions(data) {
  if (!data) {
    throw new Error(error);
  }
  let catsArray = [];
  data.forEach(el => {
    const breedOption = document.createElement('option');
    breedOption.setAttribute('value', el.id);
    breedOption.innerHTML = `${el.name}`;
    catsArray.push(breedOption);
  });
  breedSelect.append(...catsArray);
}
function addCatToHtml(data) {
  const selectedCatInfo = {
    name: data[0].breeds[0].name,
    description: data[0].breeds[0].description,
    temperament: data[0].breeds[0].temperament,
    img: data[0].url,
  };
  const img = document.createElement('img');
  const header = document.createElement('h1');
  const description = document.createElement('p');
  const temperament = document.createElement('p');

  let Elements = [];

  img.classList.add('cat-info__img');
  img.setAttribute('src', selectedCatInfo.img);
  img.setAttribute('width', '400px');
  Elements.push(img);

  header.classList.add('cat-info__header');
  header.innerHTML = selectedCatInfo.name;
  Elements.push(header);

  description.classList.add('cat-info__description');
  description.innerHTML = selectedCatInfo.description;
  Elements.push(description);

  temperament.classList.add('cat-info__temperament');
  temperament.innerHTML = `<span class="cat-info__temperament--bold">Temperament:</span> ${selectedCatInfo.temperament}`;
  Elements.push(temperament);

  catInfo.innerHTML = '';
  catInfo.append(...Elements);
}

export function fetchBreeds() {
  breedSelect.classList.add('hidden');
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .then(data => {
      addCatsToSelectOptions(data);
      breedSelect.classList.remove('hidden');
    })
    .catch(error => {
      //   console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      breedSelect.classList.add('hidden');
      loaderLog.classList.add('hidden');
      loaderrLog.classList.add('hidden');
      //   errorLog.classList.remove('hidden');
    })
    .finally(() => {
      //   console.log('downloading cats from api finished');
      loaderLog.classList.add('hidden');
      loaderrLog.classList.add('hidden');
      new SlimSelect({
        select: '#selectElement',
      });
    });
}
export function fetchCatByBreed(breedId) {
  loaderLog.classList.remove('hidden');
  loaderrLog.classList.remove('hidden');
  //   errorLog.classList.add('hidden');
  catInfo.classList.add('hidden');
  axios
    .get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId.currentTarget.value}`
    )
    .then(response => response.data)
    .then(data => addCatToHtml(data))
    .catch(error => {
      //   console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      loaderLog.classList.add('hidden');
      loaderrLog.classList.add('hidden');
      //   errorLog.classList.remove('hidden');
    })
    .finally(() => {
      //   console.log('selected cat appear');
      loaderLog.classList.add('hidden');
      loaderrLog.classList.add('hidden');
      catInfo.classList.remove('hidden');
    });
}
