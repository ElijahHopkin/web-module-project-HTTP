import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import DeleteMovieModal from "./components/DeleteMovieModal";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const {push} = useHistory()

  useEffect(()=>{
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  const renderMovieModal =(id) => {
    push(`/movies/delete/${id}`)
  }

  const deleteMovie = (id)=> {
    axios
    .delete(`http://localhost:9000/api/movies/${id}`)
    .then(res => {
        setMovies(res.data)
        push('/movies')
    })
    .catch(err => {
        console.log({err})
    })
  }

  const addToFavorites = (movie) => {
    // if(favoriteMovies.find(item => movie===item)){
    //   return favoriteMovies
    // }else{(setFavoriteMovies([
    //     ...favoriteMovies,
    //     movie
    //   ]))
    // }
    if(!favoriteMovies.some(item => item.id===movie.id))
      setFavoriteMovies([
       ...favoriteMovies,
       movie
      ])
    // if(favoriteMovies.includes(movie)){
    //   return favoriteMovies
    // }else{
    // setFavoriteMovies([
    //   ...favoriteMovies,
    //   movie
    // ])}
    console.log('working', favoriteMovies)
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>
            <Route path="/movies/edit/:id" 
            render = {() => <EditMovieForm setMovies={setMovies}/> } 
            > 
            </Route>

            <Route path="/movies/add">
            <AddMovieForm  setMovies = {setMovies}/>
            </Route>

            <Route path = '/movies/delete/:id'>
              <DeleteMovieModal deleteMovie = {deleteMovie} />
            </Route>
            
            <Route path="/movies/:id">
            <Movie setMovies ={setMovies} renderMovieModal= {renderMovieModal} addToFavorites= {addToFavorites}/>
            </Route>

           

            <Route path="/movies">
              <MovieList movies={movies}  />
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

