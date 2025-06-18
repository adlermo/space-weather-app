# Space Weather App

## Overview
Space Weather and Inspiration is a web site tailormade for astronauts and space travelers, looking for inspiration and weather before taking their trip. The app will provide an inspirational picture of the day provided for an API from Nasa, along with information about weather in specific regions of our galaxy (also provided by a Nasa API). It may sound too fantasy in the actuality, but in the future, I believe it will sound more naturally.

## Target Audience
Space nerds (me included), amateur astronomers, and in the future space tourists.

## Major Functions
1.	Display Picture of the Day – Show the Astronomy Picture of the Day (APOD) with its title and explanation.
2.	Save Picture – Allow users to save their favorite APOD images locally or to their profile.
3.	Show Real-Time Space Weather – Present a dashboard with solar wind, CME events, and radiation.
4.	Login & Registration – Register and validate login credentials and maintain sessions in local storage.
5.	Theme Toggle – Switch between light/dark mode.
6.	Add to Favorites – Mark and store APODs in local storage.
7.	Share Feature – Generate social-media-ready links for content available in forecast dashboard.

## External Data
- ASA DONKI (CME, SIR, SEP, geomagnetic storms) – https://ccmc.gsfc.nasa.gov/tools/DONKI/
- NASA APOD (Daily photo, title, explanation) – https://api.nasa.gov/planetary/apod 

## Graphic Identity
- Colors: #0B0D17 · #6B0F1A · #29E3E3 · #FF6F00 · #F4F4F8 · #4D4D80 (https://coolors.co/0b0d17-6b0f1a-29e3e3-ff6f00-f4f4f8-4d4d80)
- Typography: Oxanium (titles), Inter (body).

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Oxanium:wght@200..800&display=swap" rel="stylesheet">

## Project Planning
https://trello.com/b/FAm0AMm1/space-weather

## Challenges
- Latency & rate limits from NASA APIs.
- Keeping UI performant with real-time data and graphics.
- Learning to interpret heliophysics data and make it user-friendly.

