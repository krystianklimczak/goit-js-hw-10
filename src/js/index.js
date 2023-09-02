// imports
import { fetchBreeds, fetchCatByBreed, breedSelect } from './cat-api';

// variables

// body
fetchBreeds();
breedSelect.addEventListener('change', fetchCatByBreed);
