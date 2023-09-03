// imports
import {
  //   fetchBreeds,
  fetchCatByBreed,
  breedSelect,
  addCatsToSelectOptions,
  addCatToHtml,
  newFetchBreeds,
  loaderLog,
  loaderrLog,
  addSelectedCatToHtml,
} from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

// variables

// body
// fetchBreeds();
breedSelect.classList.add('hidden');
newFetchBreeds()
  .then(data => {
    addCatsToSelectOptions(data);
    breedSelect.classList.remove('hidden');
  })
  .catch(error => {
    breedSelect.classList.add('hidden');
    loaderLog.classList.add('hidden');
    loaderrLog.classList.add('hidden');
  })
  .finally(() => {
    //   console.log('downloading cats from api finished');
    loaderLog.classList.add('hidden');
    loaderrLog.classList.add('hidden');
    new SlimSelect({
      select: '#selectElement',
    });
  });

breedSelect.addEventListener('change', addSelectedCatToHtml);
