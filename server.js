import express from 'express';
import cors from 'cors';
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(express.json());
app.use(cors());

app.locals.title = 'Watch List';
app.locals.watchList = [];

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.get('/watch-list', (request, response) => { 
  const { watchList } = app.locals;
  response.json(watchList);
});

app.post('/watch-list/:movie_id', (request, response) => {
  //Body: {id: 123456}
  const { watchList } = app.locals;
  const newMovie = request.body;
  const { movie_id } = request.params;
  if (parseInt(movie_id) === newMovie.id) {
    watchList.push(newMovie.id)
    response.status(200).send(`You have added ${newMovie.id} to your watch list!`)
  } else {
    response.status(201).send('Could not add movie to watch list because of an improper id. Please try again.')
  }
})

app.delete('/watch-list/:movie_id', (request, response) => {
  //Body: {id: 123456}
  let { watchList } = app.locals;
  const deletedMovie = request.body;
  const { movie_id } = request.params;
  const correctUrl = watchList.find((id) => id === parseInt(movie_id));
  if(correctUrl && parseInt(movie_id) === deletedMovie.id) {
    const newWatchList = watchList.filter((id) => id !== deletedMovie.id);
    app.locals.watchList = newWatchList;
    response.json(`${correctUrl} has been removed from your watch list.`);
  } else {
    response.status(201).send('Could not remove movie from your watch list because of an improper id. Please try again.')
  }
})
