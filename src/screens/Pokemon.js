import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';

import { ItemPokemon } from '../Components/ItemPokemon';
import { Loading } from '../Components/Loading';
import { NavbarPoke } from '../Components/NavbarPoke';

export const Pokemon = () => {
  const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=50';

  const [loading, setLoading] = useState(true);
  const [loadData, setLoadData] = useState(urlPokemon);
  const [originData, setOriginData] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [balance, setBalance] = useState(0);
  const [currencyList, setCurrencyList] = useState(0);

  const getGeneralDataPokemon = async () => {
    let arrayObjectCurrency = [];

    try {
      const response = await fetch(loadData);
      const data = await response.json();
      let completeData = await Promise.all(
        data.results.map(async (e) => {
          const response = await fetch(e.url);
          return response.json();
        })
      );

      const currency = await fetch(
        'https://api.fastforex.io/fetch-multi?from=MXN&to=USD,EUR,GBP,CHF,COP&api_key=a9c2176e38-38771baf1e-rae12o'
      );
      const resultCurrency = await currency.json();

      //Get currency
      Object.entries(resultCurrency.results).forEach(([currency, value]) => {
        arrayObjectCurrency.push({ currency, value });
      });

      //add to CompleteData price and currency and powers
      const dataPriceCurrecy = completeData.map((i) => {
        const randomPrice = getPricePokemon();
        const randomCurrency = getRandomCurrency();
        const findFirstPower = i.abilities.map((p) => p.ability);
        const color =
          findFirstPower[0].name === 'blaze'
            ? '#ea6c67'
            : findFirstPower[0].name === 'torrent'
            ? '#78b5fa'
            : findFirstPower[0].name === 'static'
            ? '#f9d26e'
            : '#62c5a8';
        const powerColor =
          findFirstPower[0].name === 'blaze'
            ? '#ee817b'
            : findFirstPower[0].name === 'torrent'
            ? '#91c9fc '
            : findFirstPower[0].name === 'static'
            ? '#fbe17f'
            : '#73d6bf';
        return {
          price: randomPrice,
          color: color,
          powerColor: powerColor,
          ...arrayObjectCurrency[randomCurrency],
          ...i,
        };
      });

      //set States
      setCurrencyList(arrayObjectCurrency);
      setPokemons(dataPriceCurrecy);
      setOriginData(dataPriceCurrecy);
      setLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getPricePokemon = () => {
    const max = 300;
    const min = 21;
    return (Math.random() * (max - min) + min).toFixed(2);
  };

  const getCreditWallet = () => {
    const max = 9800;
    const min = 5000;
    return (Math.random() * (max - min) + min).toFixed(2);
  };

  const getRandomCurrency = () => {
    const max = 4;
    const min = 0;
    return (Math.random() * (max - min) + min).toFixed(0);
  };

  useEffect(() => {
    getGeneralDataPokemon();
    const credit = getCreditWallet();
    setBalance(credit);
  }, []);

  return (
    <>
      <Container>
        <Row>
          <NavbarPoke
            balance={balance}
            stateChangeBalance={setBalance}
            pokemons={pokemons}
            setPokemons={setPokemons}
            originData={originData}
            getGeneralDataPokemon={() => getGeneralDataPokemon()}
          />
        </Row>

        <Row>
          {!loading ? (
            <ItemPokemon
              pokemons={pokemons}
              balance={balance}
              stateChangeBalance={setBalance}
              currencyList={currencyList}
            />
          ) : (
            <Loading />
          )}
        </Row>
      </Container>
    </>
  );
};
