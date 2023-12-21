import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Card,
  Image,
  Row,
  Col,
} from "react-bootstrap";

function Footer() {
  // to store api call data
  const [allData, setAllData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStatus, setFilteredStatus] = useState(null);

  //   filter data
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://ombrulla-client-cms.vercel.app/api/paperkraft?title=ai"
      );
      setAllData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = allData.filter(
      (item) =>
        (filteredStatus ? item.status === filteredStatus : true) &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  }, [allData, filteredStatus, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (status) => {
    setFilteredStatus(status);
  };

  return (
    <div>
      <div className="mt-5 d-flex justify-content-center">
        <InputGroup className="mb-3" style={{ width: "50%" }}>
          <FormControl
            placeholder="Search title"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </div>

      <div className="d-flex justify-content-center">
        <Button
          className="me-2 mt-5"
          onClick={() => handleStatusFilter("published")}
        >
          Published
        </Button>
        <Button
          className="me-2 mt-5"
          onClick={() => handleStatusFilter("draft")}
        >
          Draft
        </Button>
        <Button className="mt-5" onClick={() => handleStatusFilter(null)}>
          All
        </Button>
      </div>

      <div className="mt-4">
        <Row className="d-flex justify-content-center">
          {filteredData.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={4}>
              <Card style={{ width: "30rem", margin: "1rem" }}>
                <Image
                  className="mb-5"
                  style={{ width: "28rem", margin: "1rem" }}
                  src={item.image}
                  alt={item.title}
                  fluid
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Footer;
