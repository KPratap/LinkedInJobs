import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';

const App = () => {
  const [keywords, setKeywords] = useState('Software Engineer');
  const [location, setLocation] = useState('United States');
  const [distance, setDistance] = useState('25');
  const [recency, setRecency] = useState('r3600');
  const [sortBy, setSortBy] = useState('R');
  const [history, setHistory] = useState([]);
  const [workTypes, setWorkTypes] = useState([2, 3]); // Default: Hybrid + Remote
  const [experienceLevels, setExperienceLevels] = useState([1, 2, 3, 4]);


  const geoId = '103644278'; 

  const workTypeMap = {
    1: 'On-site',
    2: 'Hybrid',
    3: 'Remote'
  };
  const experienceLevelMap = {
  1: 'Internship',
  2: 'Entry level',
  3: 'Associate',
  4: 'Mid-Senior level',
  5: 'Director',
  6: 'Executive'
};
  const handleSubmit = () => {
    const encodedKeywords = encodeURIComponent(keywords);
    const encodedLocation = encodeURIComponent(location);
    const fE = experienceLevels.length > 0 ? `&f_E=${experienceLevels.join('%2C')}` : '';
    const fWT = workTypes.length > 0 ? `&f_WT=${workTypes.join('%2C')}` : '';
    const url = `https://www.linkedin.com/jobs/search/?f_TPR=${recency}&distance=${distance}${fWT}${fE}&geoId=${geoId}&keywords=${encodedKeywords}&location=${encodedLocation}&sortBy=${sortBy}`;

    window.open(url, '_blank');
    setHistory(prev => [url, ...prev]);
  };
  const toggleWorkType = (wt) => {
    setWorkTypes(prev =>
      prev.includes(wt) ? prev.filter(type => type !== wt) : [...prev, wt]
    );
  };
    const toggleExperienceLevel = (el) => {
    setExperienceLevels(prev =>
      prev.includes(el) ? prev.filter(level => level !== el) : [...prev, el]
    );
  };
  return (
    <Container className="my-4">
      <h2 className="mb-4">LinkedIn Job Searcher</h2>
      
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="keywords">
              <Form.Label>Job Keywords</Form.Label>
              <Form.Control
                type="text"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
              />
            </Form.Group>
          </Col>
          </Row>
          <Row>
            <Col>
            <Form.Group controlId="workType">
                <Form.Label>Work Type</Form.Label>
                <div>
                  {Object.entries(workTypeMap).map(([code, label]) => (
                    <Form.Check
                      inline
                      key={code}
                      type="checkbox"
                      id={`wt-${code}`}
                      label={label}
                      checked={workTypes.includes(Number(code))}
                      onChange={() => toggleWorkType(Number(code))}
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>

          </Row>
          <Row>
          <Col md={6}>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="distance">
              <Form.Label>Distance (miles)</Form.Label>
              <Form.Control
                type="number"
                value={distance}
                onChange={e => setDistance(e.target.value)}
              />
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col md={4}>
            <Form.Group controlId="recency">
              <Form.Label>Posted Within</Form.Label>
              <Form.Select value={recency} onChange={e => setRecency(e.target.value)}>
                <option value="r600">Last 10 Min</option>
                <option value="r1200">Last 20 Min</option>
                <option value="r1800">Last 30 Min</option>
                <option value="r3600" selected >Last Hour</option>
                <option value="r" >Last 12 Hours</option>
                <option value="r86400">Last 24 Hours</option>
                <option value="r604800">Last Week</option>
                <option value="r2592000">Last Month</option>
              </Form.Select>
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col md={4}>
            <Form.Group controlId="sortBy">
              <Form.Label>Sort By</Form.Label>
              <Form.Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="R">Relevance</option>
                <option value="DD">Date Posted</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <Form.Group controlId="experienceLevel">
              <Form.Label>Experience Level</Form.Label>
              <div>
                {Object.entries(experienceLevelMap).map(([code, label]) => (
                  <Form.Check
                    inline
                    key={code}
                    type="checkbox"
                    id={`exp-${code}`}
                    label={label}
                    checked={experienceLevels.includes(Number(code))}
                    onChange={() => toggleExperienceLevel(Number(code))}
                  />
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Button className="mt-3" variant="primary" onClick={handleSubmit}>
          Generate & Open URL
        </Button>
      </Form>

      {history.length > 0 && (
        <div className="mt-5">
          <h4>URL History</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {history.map((url, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default App;
