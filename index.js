const defaultText = `Hihi! Jonathan here`;
const aboutMeText = document.querySelector('#about-me');
const aboutMeUrl = 'https://raw.githubusercontent.com/jd-apprentice/jd-apprentice/main/aboutme';

const fetchText = async (url) => fetch(url).then((response) => response.text());
fetchText(aboutMeUrl).then((text) => aboutMeText.textContent = text ?? defaultText);
