import React from "react";
import ReactDOM from "react-dom";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.artworks = [
      {
        name:"Ebi sushi",
        eth_address:"",
        img_url:"https://img.blockstudios.net/300w/attWgXWNwr4xK7HSx.png",
        price:1,
        priceToken:"bnb"
      },
      {
        name:"Toro sushi",
        eth_address:"",
        img_url:"https://img.blockstudios.net/300w/attWgXWNwr4xK7HSx.png",
        price:1,
        priceToken:"mkr"
      },
      {
        name:"Salmon sushi",
        eth_address:"",
        img_url:"https://img.blockstudios.net/300w/attWgXWNwr4xK7HSx.png",
        price:1,
        priceToken:"knc"
      },
      {
        name:"Ikura sushi",
        eth_address:"",
        img_url:"https://img.blockstudios.net/300w/attWgXWNwr4xK7HSx.png",
        price:1,
        priceToken:"zrx"
      }
    ]
  }

  onImageClick(card) {
    
  }

  render() {
    const artworkCards = this.artworks.map((card, i) => {
      const { name, img_url } = card
      return (
        <div className="column" key={name}>
          <img src={img_url} alt={name} onClick={() => this.onImageClick(card)}/>
          <div className="desc">{name}</div>
        </div>
      )
    })

    return (
      <div>
        <h2>Blockstudios Marketplace</h2>
        <div className="row">
          {artworkCards}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("index"));
