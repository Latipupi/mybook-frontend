import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class BookList extends Component {

  constructor(props) {
    super(props);
    this.state = {books: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/books/find-all')
      .then(response => response.json())
      .then(data => this.setState({books: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedbooks = [...this.state.books].filter(i => i.id !== id);
      this.setState({books: updatedbooks});
    });
  }

  render() {
    const {books, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const groupList = books.map(book => {
      return <tr key={book.id}>
        <td style={{whiteSpace: 'nowrap'}}>{book.judulBuku}</td>
        <td>{book.penerbit}</td>
        <td>{book.pengarang}</td>
        <td>{book.jenisBuku}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/books/" + book.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <h3>Menu Book</h3>
          <div className="float-right">
            <Button color="success" tag={Link} to="/books/new">Add Book</Button>
          </div>
          <br/>
          <br/>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Judul Buku</th>
              <th width="20%">Penerbit</th>
              <th width="20%">Pengarang</th>
              <th width="20%">Jenis Buku</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {groupList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default BookList;