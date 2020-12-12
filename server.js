import express from 'express';
import cors from 'cors';
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(express.json());
app.use(cors());

app.locals.title = 'Watch List';
app.locals.watchList = { id: [] };

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.get('/watch-list', (request, response) => {
  const { watchList } = app.locals;
  response.json(watchList);
});

app.post('/watch-list', (request, response) => {
  //Body: {id: 123456}
  const { watchList } = app.locals;
  const newMovie = request.body;
  if (newMovie.id) {
    watchList.push(newMovie.id)
    response.status(200).send(`You have added ${newMovie.id} to your watch list!`)
  } else {
    response.status(201).send('Could not add movie to watch list because of an improper id. Please try again.')
  }
})

app.delete('/watch-list', (request, response) => {
  //Body: {id: 123456}
  let { watchList } = app.locals;
  let deletedMovie = request.body.id ? request.body : { id: "" };
  const chosenMovie = watchList.find((id) => id === deletedMovie.id);
  if (chosenMovie) {
    const newWatchList = watchList.filter((id) => id !== deletedMovie.id);
    app.locals.watchList = newWatchList;
    response.json(`${chosenMovie} has been removed from your watch list.`);
  } else {
    response.status(201).send('Could not remove movie from your watch list because of an improper id. Please try again.')
  }
})
