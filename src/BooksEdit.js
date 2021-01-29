
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class BooksEdit extends Component {

  emptyItem = {
    judulBuku: '',
    penerbit: '',
    pengarang: '',
    jenisBuku: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const group = await (await fetch(`/api/books/${this.props.match.params.id}`)).json();
      this.setState({item: group});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/books' + (item.id ? '/' + item.id : ''), {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/books');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Book' : 'Add Book'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="judulBuku">Judul Buku</Label>
            <Input type="text" name="judulBuku" id="judulBuku" value={item.judulBuku || ''}
                   onChange={this.handleChange} autoComplete="judulBuku"/>
          </FormGroup>
          <FormGroup>
            <Label for="penerbit">Penerbit</Label>
            <Input type="text" name="penerbit" id="penerbit" value={item.penerbit || ''}
                   onChange={this.handleChange} autoComplete="penerbit"/>
          </FormGroup>
          <FormGroup>
            <Label for="pengarang">Pengarang</Label>
            <Input type="text" name="pengarang" id="pengarang" value={item.pengarang || ''}
                   onChange={this.handleChange} autoComplete="pengarang"/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="jenisBuku">Jenis Buku</Label>
              <Input type="text" name="jenisBuku" id="jenisBuku" value={item.jenisBuku || ''}
                     onChange={this.handleChange} autoComplete="jenisBuku"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/books">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(BooksEdit);