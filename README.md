# Movies Website

A React movie discovery app that lets users browse popular movies, search for specific titles, and view trending movies based on search activity.

## Overview

Movies Website is built with React, Vite, Tailwind CSS, the Trakt API, and Appwrite. The app loads popular movies by default, lets users search through movie titles, displays movie details in cards, and tracks searches in Appwrite so the most searched movies can appear in a trending section.

## Features

- Browse popular movies from the Trakt API.
- Search for movies by title.
- Debounced search input to reduce unnecessary API requests while typing.
- Movie cards showing poster, title, rating, language, and release year.
- Fallback poster image when a movie poster is unavailable.
- Loading spinner while movie data is being fetched.
- User-friendly error messages when fetching fails or no movies match the search.
- Trending movies section based on search counts stored in Appwrite.
- Appwrite integration for storing search terms, search counts, movie IDs, and poster URLs.
- Vite development proxy for Trakt API requests through the local `/api` path.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Appwrite
- Trakt API
- react-use
- ESLint

## Project Structure

```text
src/
  App.jsx                  Main app logic and page layout
  appwrite.js              Appwrite client and database functions
  main.jsx                 React entry point
  components/
    MovieCard.jsx          Movie display card
    Search.jsx             Search input component
    Spinner.jsx            Loading spinner
public/
  hero.png                 Header image
  hero-bg.png              Background asset
  logo.png                 App logo
  no-movie.png             Fallback poster image
  search.svg               Search icon
  star.svg                 Rating icon
```

## Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
VITE_CLIENT_ID=your_trakt_api_key
VITE_CLIENT_SECRET=your_trakt_client_secret
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

The app expects the Appwrite collection to store these fields:

- `searchTerm`: the searched text
- `count`: how many times the search term has been used
- `movie_id`: the TMDB movie ID
- `poster_url`: the movie poster URL

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## Available Scripts

- `npm run dev`: starts the Vite development server.
- `npm run build`: creates a production build.
- `npm run preview`: serves the production build locally.
- `npm run lint`: checks the project with ESLint.

## How It Works

When the app starts, it fetches popular movies from Trakt and loads the top trending movies from Appwrite. When a user types in the search box, the app waits briefly before sending the search request. If results are returned, the app displays them and stores or updates the search count in Appwrite. The trending section shows the five most searched movies, ordered by search count.
