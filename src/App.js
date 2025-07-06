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
  const [experienceLevels, setExperienceLevels] = useState([2, 3, 4]);
  const [must, setMust] = useState('');
  const [any, setAny] = useState('');
  const [not, setNot] = useState('');
  const [phrases, setPhrases] = useState('');
  const [useGeoId, setUseGeoId] = useState(false);

  const geoIdMap = {
    'Alabama': '102240587',
    'Alaska': '104592329',
    'Arizona': '103623109',
    'Arkansas': '104037241',
    'Atlanta Metro Area': '100477928',
    'Boston Metro Area': '90000083',
    'California': '102221843',
    'Chicago Metro Area': '104620279',
    'Colorado': '103981190',
    'Connecticut': '103543137',
    'Dallas-Fort Worth Metro': '90000070',
    'Delaware': '103886533',
    'Denver Metro Area': '90000081',
    'Florida': '102264497',
    'Georgia': '100477928',
    'Hawaii': '104571619',
    'Houston Metro Area': '90000085',
    'Idaho': '104610428',
    'Illinois': '104620279',
    'Indiana': '104885710',
    'Iowa': '104934078',
    'Kansas': '104838937',
    'Kentucky': '103437161',
    'Los Angeles Metro Area': '90000072',
    'Louisiana': '104140110',
    'Maine': '104040543',
    'Maryland': '103296564',
    'Massachusetts': '103247741',
    'Miami Metro Area': '90000073',
    'Michigan': '104033979',
    'Minnesota': '104626107',
    'Mississippi': '104547133',
    'Missouri': '104974493',
    'Montana': '104284548',
    'Nebraska': '104999181',
    'Nevada': '104688050',
    'New Hampshire': '104091507',
    'New Jersey': '104200383',
    'New Mexico': '104228232',
    'New York': '102571732',
    'New York City Metro': '90000067',
    'North Carolina': '104193100',
    'North Dakota': '104678393',
    'Ohio': '104855658',
    'Oklahoma': '104934261',
    'Oregon': '105000126',
    'Pennsylvania': '104178592',
    'Rhode Island': '104195364',
    'San Francisco Bay Area': '90000084',
    'Seattle Metro Area': '106442091',
    'South Carolina': '104594654',
    'South Dakota': '104943066',
    'Tennessee': '104201454',
    'Texas': '104305776',
    'Toronto, Canada': '90000068',
    'United States': '103644278',
    'Utah': '104694352',
    'Vermont': '104994394',
    'Virginia': '104032125',
    'Washington': '105000470',
    'Washington DC Metro': '90000082',
    'West Virginia': '104517415',
    'Wisconsin': '104011883',
    'Wyoming': '104723286'
  };
  document.body.style.backgroundColor = '#000';
  const geoId = geoIdMap[location] || '103644278';
  const workTypeMap = {
    1: 'On-site',
    2: 'Remote',
    3: 'Hybrid'
  };
  const experienceLevelMap = {
  1: 'Internship',
  2: 'Entry level',
  3: 'Associate',
  4: 'Mid-Senior level',
  5: 'Director',
  6: 'Executive'
};
const buildBooleanSearch = ({ must, any, not, phrases }) => {
  const mustParts = must ? must.split(',').map(s => s.trim()) : [];
  const anyParts = any ? any.split(',').map(s => s.trim()) : [];
  const notParts = not ? not.split(',').map(s => s.trim()) : [];
  const phraseParts = phrases ? phrases.split(',').map(s => `"${s.trim()}"`) : [];

  const mustClause = mustParts.join(' AND ');
  const anyClause = anyParts.length ? `(${anyParts.join(' OR ')})` : '';
  const notClause = notParts.length ? `NOT (${notParts.join(' OR ')})` : '';
  const allParts = [mustClause, anyClause, notClause, ...phraseParts].filter(Boolean);

  return allParts.join(' AND ');
};

const handleSubmit = () => {
  const finalKeywords = buildBooleanSearch({ must, any, not, phrases }) || keywords;
  console.log("Final Keywords:", finalKeywords);
  const encodedKeywords = encodeURIComponent(finalKeywords);
  const encodedLocation = encodeURIComponent(location);
  const fE = experienceLevels.length > 0 ? `&f_E=${experienceLevels.join('%2C')}` : '';
  const fWT = workTypes.length > 0 ? `&f_WT=${workTypes.join('%2C')}` : '';
  const geoPart = useGeoId ? `&geoId=${geoId}` : '';
  const url = `https://www.linkedin.com/jobs/search/?f_TPR=${recency}&distance=${distance}${fWT}${fE}${geoPart}&keywords=${encodedKeywords}&location=${encodedLocation}&sortBy=${sortBy}`;

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
<Container className="my-4 p-4 rounded" style={{ backgroundColor: '#121212', color: '#f8f9fa' }}>
      <h2 className="mb-4 text-info">LinkedIn Boolean Search Builder</h2>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="keywords" className="mb-3">
              <Form.Label>Job Keywords</Form.Label>
              <Form.Control
                style={{ backgroundColor: '#1e1e1e', color: '#f8f9fa', borderColor: '#0dcaf0' }}
                type="text"
                placeholder="free format search terms - else use builder below!!"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={3}>
            <Form.Group controlId="must" className="mb-3">
              <Form.Label>Must include (AND)</Form.Label>
          <Form.Control
              style={{ backgroundColor: 'rgb(104 155 155)', color: '#f8f9fa', borderColor: '#0dcaf0' }}
              type="text"
              placeholder="e.g. accountant, finance"
              value={must}
              onChange={e => setMust(e.target.value)}
            />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="any" className="mb-3">
              <Form.Label>Any of these (OR)</Form.Label>
              <Form.Control
                style={{ backgroundColor: 'rgb(104 155 155)', color: '#f8f9fa', borderColor: '#0dcaf0' }}
                type="text"
                placeholder="e.g. accountant, finance"
                value={any}
                onChange={e => setAny(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="not" className="mb-3">
              <Form.Label>Must NOT include (NOT)</Form.Label>
              <Form.Control
                style={{ backgroundColor: 'rgb(104 155 155)', color: '#f8f9fa', borderColor: '#0dcaf0' }}
                type="text"
                placeholder="e.g. accountant, finance"
                value={not}
                onChange={e => setNot(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="phrases" className="mb-3">
              <Form.Label>Exact phrases</Form.Label>
              <Form.Control
                style={{ backgroundColor: 'rgb(104 155 155)', color: '#f8f9fa', borderColor: '#0dcaf0' }}
                type="text"
                value={phrases}
                onChange={e => setPhrases(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Form.Group controlId="workType" className="mb-3">
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
                    className="text-light"
                  />
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="location" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Select
                style={{ backgroundColor: '#1e1e1e', color: '#f8f9fa', borderColor: '#0dcaf0' }}
                value={location}
                onChange={e => setLocation(e.target.value)}
              >
                {Object.keys(geoIdMap).sort().map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col md={12}>
            <Form.Check
              type="checkbox"
              id="toggle-geoId"
              label="Use geoId for location precision"
              checked={useGeoId}
              onChange={() => setUseGeoId(prev => !prev)}
              className="text-light"
            />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="distance" className="mb-3">
              <Form.Label>Distance (miles)</Form.Label>
              <Form.Control
                style={{ backgroundColor: '#1e1e1e', color: '#f8f9fa', borderColor: '#0dcaf0' }}
                type="number"
                value={distance}
                onChange={e => setDistance(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="recency" className="mb-3">
              <Form.Label>Posted Within</Form.Label>
              <Form.Select
                style={{ backgroundColor: '#1e1e1e', color: '#f8f9fa', borderColor: '#0dcaf0' }}
                value={recency}
                onChange={e => setRecency(e.target.value)}
              >
                <option value="r600">Last 10 Min</option>
                <option value="r1200">Last 20 Min</option>
                <option value="r1800">Last 30 Min</option>
                <option value="r3600">Last Hour</option>
                <option value="r">Last 12 Hours</option>
                <option value="r86400">Last 24 Hours</option>
                <option value="r604800">Last Week</option>
                <option value="r2592000">Last Month</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="sortBy" className="mb-3">
              <Form.Label>Sort By</Form.Label>
              <Form.Select
                style={{ backgroundColor: '#1e1e1e', color: '#f8f9fa', borderColor: '#0dcaf0' }}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="R">Relevance</option>
                <option value="DD">Date Posted</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={12}>
            <Form.Group controlId="experienceLevel" className="mb-3">
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
                    className="text-light"
                  />
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Button className="mt-3" variant="info" onClick={handleSubmit}>
          Generate & Open URL
        </Button>
      </Form>

      {history.length > 0 && (
        <div className="mt-5">
          <h4>URL History</h4>
          <Table striped bordered hover variant="dark">
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
                  <td><a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#0dcaf0' }}>{url}</a></td>
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
