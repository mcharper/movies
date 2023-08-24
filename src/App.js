import './App.css';
import { useQuery, gql } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const GET_MOVIES = gql`
query GetMovies {
	discover {
		    movies {
          popular {
            edges {
              node {
                title
                overview
                poster(size: W342)
              }
            }
          }
        }
  }
}`;

function DisplayMovies() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);

  return data.discover.movies.popular.edges.map(({ node }) => (
    <Card style={{ width: '20rem', marginBottom: '5rem' }}>
      <Card.Img variant="top" src={`${node.poster}`} />
      <Card.Body>
        <Card.Title><h2>{node.title}</h2></Card.Title>
        <Card.Text>
          {node.overview}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  ));
}

function App() {

  return (
    <div className="App">
      <h2>Movies</h2>
      <Container fluid>
        <DisplayMovies />
      </Container>

    </div >
  );
}

export default App;
