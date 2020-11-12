import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import React from 'react';

import './App.css';
import ProfilePic from './ProfilePic';
import SpotifyCard from './spotify/SpotifyCard';

const App = () => {
  return (
    <div className="App">
      <ProfilePic/>
      <Container>
        <Row className='about-me'>
          <table cellSpacing="0">
            <tbody>
              <tr>
                <td className='career'>Software Developer</td>
              </tr>
              <tr>
                <td>University of Iowa, Computer Science, 2017</td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>
                  John Deere, Intelligent Solutions Group, June 2017 - present
                </td>
              </tr>
              <tr>
                <td>
                  <a
                    className="linkedin"
                    href="https://www.linkedin.com/in/sknepper/"
                  >
                    https://www.linkedin.com/in/sknepper/
                  </a>
                  <hr></hr>
                </td>
              </tr>
              <tr className="experience">
                <td>
                  <h6>Experiences & Skills</h6>
                  <ul>
                    <p>
                      REST APIs, GraphQL, OAuth 2.0, AWS cloud infrastructure,
                      Java, Scala, ReactJS, NodeJS, Databases, deploy pipelines,
                      maintaining highly reliable systems, agile development, test
                      driven development
                    </p>
                  </ul>

                  <h6>Key Projects</h6>
                  <ol>
                    <li>
                      <h6>Third party data sharing</h6>
                      <ul>
                        <p>
                          OAuth 2.0 practices connecting data between Deere's
                          platform and other software solutions.
                        </p>
                      </ul>
                    </li>
                    <li>
                      <h6>Competitor equipment data processing</h6>
                      <ul>
                        <p>
                          Event triggered API architecture sending machine data
                          between competitor equipment platforms.
                        </p>
                      </ul>
                    </li>
                    <li>
                      <h6>Equipment notifications</h6>
                      <ul>
                        <p>
                          Scala micro-services handle processing 10,000 machine
                          alerts a second.
                        </p>
                      </ul>
                    </li>
                  </ol>
                  <hr></hr>
                </td>
              </tr>
            </tbody>
          </table>
        </Row>
      </Container>
      <SpotifyCard />
    </div>
  );
};

export default App;
