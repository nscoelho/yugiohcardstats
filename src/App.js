import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [cardChosen, setCardChosen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [card, setCard] = useState({
    name: "",
    exactName: "",
    img: "",
    type: "",
    attack: "",
    defense: "",
    level: "",
    race: "",
    attribute: "",
    price: "",
  });

  const searchCard = () => {
    Axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${cardName}`)
    .then((response) => {
      console.log(response);
      setCard({
        name: cardName,
        exactName: response.data.data[0].name,
        img: response.data.data[0].card_images[0].image_url,
        type: response.data.data[0].type,
        attack: response.data.data[0].atk,
        defense: response.data.data[0].def,
        level: response.data.data[0].level,
        race: response.data.data[0].race,
        attribute: response.data.data[0].attribute,
        price: response.data.data[0].card_prices[0].amazon_price,
      });
      setCardChosen(true);
    });
  };


  return (
    <div className="App">
      <div className="TitleSection">
        <h1>YU-GI-OH! Card Stats</h1>
        <input type="text" onChange= {(event) => {
          setCardName(event.target.value);
          }}
        />
        <button onClick={searchCard}>Search Card</button>
      </div>
      <div className="DisplaySection">
        {!cardChosen ?
        (<h1> Please choose a Card</h1>)
        :
        (
        <>
        <h1>{card.name}</h1>
        <img src={card.img} alt="Card"/>
        <h3>Exact Name: {card.exactName}</h3>
        <h4>Type: {card.type}</h4>
        <h4>Attack: {card.attack}</h4>
        <h4>Defense: {card.defense}</h4>
        <h4>Level: {card.level}</h4>
        <h4>Race: {card.race}</h4>
        <h4>Attribute: {card.attribute}</h4>
        <h3><a target="_blank" href="https://www.amazon.com/yugioh-cards/s?k=yugioh+cards&_encoding=UTF8&tag=nelsonsc-20&linkCode=ur2&linkId=ebe7acffd581add918452038d7441ba7&camp=1789&creative=9325">Buy it on Amazon for: $</a> {card.price}</h3>
        </>
        )}

      </div>
    </div>
  );
}

export default App;
