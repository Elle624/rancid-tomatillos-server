import express from 'express';
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(express.json());

app.locals.title = 'Users';
app.locals.watchList = [
  {"id":694919,"poster_path":"https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg","backdrop_path":"https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg","title":"Money Plane","average_rating":6.666666666666667,"release_date":"2020-09-29"},
  {"id":337401,"poster_path":"https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg","backdrop_path":"https://image.tmdb.org/t/p/original//zzWGRw277MNoCs3zhyG3YmYQsXv.jpg","title":"Mulan","average_rating":5.2727272727272725,"release_date":"2020-09-04"}

];

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.get('/watch-list', (request, response) => { 
  const { watchList } = app.locals;
  response.json(watchList);
});

app.post('/watch-list/:movie_id', (request, response) => {
  const { watchList } = app.locals;
  const newMovie = request.body;
  const { movie_id } = request.params;
  if (parseInt(movie_id) === newMovie.id) {
    watchList.push(newMovie)
    response.status(200).send(`You have added ${newMovie.title} to your watch list!`)
  } else {
    response.status(201).send('Could not add movie to watch list because of an improper id. Please try again.')
  }
})