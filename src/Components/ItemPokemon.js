import { Card, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FaCartPlus } from 'react-icons/fa';

export const ItemPokemon = ({
  pokemons,
  balance,
  stateChangeBalance,
  currencyList,
}) => {
  const handleWalletDiscount = (price, currency) => {
    const findCurrency = currencyList.find((e) => {
      let currencyExchange = 0;
      if (e.currency === currency) {
        currencyExchange = e;
      }
      return currencyExchange;
    });

    price = parseFloat(price);
    balance = parseFloat(balance);

    //price Exchange
    price = price / findCurrency.value;

    if (price > balance) {
      Swal.fire({
        title: "You don't have Credit!",
        text: 'You should do a charge',
        icon: 'error',
        confirmButtonText: 'Continue',
      });
    } else {
      const result = (balance - price).toFixed(2);
      stateChangeBalance(result);
    }
  };

  return (
    <>
      <Row className='customRow'>
        {pokemons.map((item, index) => (
          <Card
            className='cardCustom'
            key={index}
            style={{ backgroundColor: `${item.color}` }}
          >
            <Card.Body className='cardBodyCustom'>
              <Card.Title className='fontTitle'>
                {item.name.charAt(0).toUpperCase()}
                {item.name.slice(1)}
              </Card.Title>
              {item.abilities.map((abilities, i) => {
                return (
                  <Card.Text
                    className='powers'
                    key={i}
                    style={{ backgroundColor: `${item.powerColor}` }}
                  >
                    {abilities.ability.name}
                  </Card.Text>
                );
              })}

              <Card.Text className='price'>
                {item.currency}: {item.price}
              </Card.Text>
            </Card.Body>
            <Card.Img
              src={item.sprites.front_default}
              className='cardImageCustom'
            />
            <div className='divContainer'>
              <FaCartPlus
                className='icon'
                onClick={() => handleWalletDiscount(item.price, item.currency)}
              />
            </div>
          </Card>
        ))}
      </Row>
    </>
  );
};
