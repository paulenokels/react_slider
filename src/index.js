import React from 'react';
import ReactDOM from 'react-dom';
import ImageSlider from './App';
import './index.css';

const slides = [
  {url: "slider-images/1.jpg", title: "Hazard Vs. Swansea"},
   {url: "slider-images/2.jpg", title: "Messi before the Match"},
   {url: "slider-images/3.jpg", title: "Marta during her last game for Brazil"},
   {url: "slider-images/4.jpg", title: "Jack Wilshere, Arsenal's flop"},
   {url: "slider-images/5.jpg", title: "Lighthouse, Microsoft Pictures"}
];
const time = 4000;

ReactDOM.render(
  <ImageSlider slides={slides} time={time}/>,
  document.getElementById('root')
);
