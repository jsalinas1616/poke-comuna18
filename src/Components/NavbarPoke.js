import { useState } from 'react';
import Swal from 'sweetalert2';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';

export const NavbarPoke = ({
  balance,
  stateChangeBalance,
  pokemons,
  setPokemons,
  originData,
  getGeneralDataPokemon,
}) => {
  const [inputChange, setInputChange] = useState({
    find: '',
  });

  const { find } = inputChange;
  const handleRecharge = (value) => {
    balance = parseFloat(balance);
    value = parseFloat(value);
    const result = balance + value;
    stateChangeBalance(result);
  };

  const handleBuyCredit = () => {
    Swal.fire({
      title: 'Buy Credit',
      text: 'You can buy credit',
      icon: 'info',
      input: 'text',
      inputLabel: 'Please type your amount',
      inputValue: 100,
      showCancelButton: true,
      confirmButtonText: 'Continue',
      inputValidator: (value) => {
        if (value <= 0) {
          return 'Please, your amount is incorrect, try again!';
        } else {
          handleRecharge(value);
        }
      },
    });
  };

  const handleFind = (event) => {
    event.preventDefault();
    if (find !== '') {
      const found = originData.filter((e) => e.currency === find);
      setPokemons(found);
    } else {
      setPokemons(originData);
    }
  };

  const handleInputChange = ({ target }) => {
    setInputChange({ ...inputChange, [target.name]: target.value });
  };

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container fluid>
          <Navbar.Brand href='#'>
            <div className='titleNav'>Pokebuy </div>
            <div className='balance'>${balance}</div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link onClick={handleBuyCredit}>Buy Credit</Nav.Link>
            </Nav>
            <Form className='d-flex' onSubmit={handleFind}>
              <FormControl
                type='search'
                placeholder='Search for Currency'
                className='me-2'
                aria-label='Search'
                name='find'
                value={find}
                onChange={handleInputChange}
              />
              <Button type='onSubmit' variant='outline-success'>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
