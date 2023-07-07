import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import './App.css';

const CrudApp = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (title.trim() !== '' && description.trim() !== '' && date.trim() !== '') {
      const newItem = {
        title: title,
        description: description,
        date: date,
        image: image
      };
      setItems([...items, newItem]);
      setTitle('');
      setDescription('');
      setDate('');
      setImage(null);
    }
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const editItem = (index) => {
    const item = items[index];
    setTitle(item.title);
    setDescription(item.description);
    setDate(item.date);
    setImage(item.image);
    setEditIndex(index);
  };

  const updateItem = () => {
    if (title.trim() !== '' && description.trim() !== '' && date.trim() !== '') {
      const updatedItems = [...items];
      updatedItems[editIndex] = {
        title: title,
        description: description,
        date: date,
        image: image
      };
      setItems(updatedItems);
      setTitle('');
      setDescription('');
      setDate('');
      setImage(null);
      setEditIndex(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container className="crud-app">
      <Row>
        <Col>
          <h1 className="text-center mb-4">CRUD App</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>
            <div className="button-group">
              {editIndex === null ? (
                <Button className='mx-2' variant="primary" onClick={addItem}>
                  Add Item
                </Button>
              ) : (
                <Button className='mx-2' variant="success" onClick={updateItem}>
                  Update Item
                </Button>
              )}
              <Button variant="secondary" onClick={() => setEditIndex(null)}>
                Clear
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={6}>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.date}</td>
                  <td>
                    {item.image && (
                      <img src={item.image} alt="Item" className="item-image" />
                    )}
                  </td>
                  <td>
                    <Button className='mx-2 mt-2' variant="primary" onClick={() => editItem(index)}>
                      Edit
                    </Button>
                    <Button className='mx-2 mt-2'variant="danger" onClick={() => deleteItem(index)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default CrudApp;
