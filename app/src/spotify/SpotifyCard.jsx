// @ts-nocheck
import React, {useEffect, useState} from 'react';
import { Card } from 'react-bootstrap';

import './Spotify.css';

const SpotifyCard = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    async function fetchTracks() {
      const response = await fetch('/tracks').then((res) => res.json());

      const items = response.items;
      setTracks([items[0], items[1], items[2]]);
    }

    fetchTracks();
  }, []);

  return (<div className='my-tracks'>
    <p>This is what I've currently been listening to...</p>
    {tracks.map((item) => {
      return (
        <Card className='spotify-card'>
          <Card.Img variant="top"/>
          <Card.Body>
            <Card.Img src={item.track.album.images[0].url}/>
            <Card.Title>{item.track.name}</Card.Title>
            <Card.Text>
              {item.track.artists[0].name}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    })}
  </div>);
};

export default SpotifyCard;
