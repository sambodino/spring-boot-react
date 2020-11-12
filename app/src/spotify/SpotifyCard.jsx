// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Card, Spinner, Col, Row } from 'react-bootstrap';

import './Spotify.css';

const SpotifyCard = () => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    function fetchTracks() {
      setIsLoading(true);
      fetch('/tracks')
        .then(async (res) => {
          const response = await res.json();
          const items = response.items;

          setTracks([items[0], items[1], items[2]]);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setError(true);
        });
    }

    fetchTracks();
  }, []);

  return (
    <div className="my-tracks">
      <p>
        Here's an updated view of what I've currently been listening to from{' '}
        <a href="https://developer.spotify.com/documentation/">Spotify's API</a>
        ...
      </p>
      {isLoading && <Spinner animation="grow" variant="primary" />}
      {error && (
        <p>Something went wrong requesting recently played tracks :(</p>
      )}
      <Row>
        {tracks.map((item) => {
          return (
            <Col>
              <Card className="spotify-card">
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Img src={item.track.album.images[0].url} />
                  <Card.Title>{item.track.name}</Card.Title>
                  <Card.Text>{item.track.artists[0].name}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default SpotifyCard;
