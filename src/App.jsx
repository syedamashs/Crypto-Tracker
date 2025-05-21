import { useEffect , useState } from "react";
import CryptoCard from "./components/CryptoCard";

function App(){

  const [coins , setCoins] = useState([]);
  const [search , setSearch] = useState("");

  useEffect(() => {

    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
    .then(res => res.json())
    .then(data => setCoins(data))
    .catch(err => console.error("Error fetching coins!!",err));
  }, []);

  const filteredcoins = coins.filter((coin) => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="container py-4">
      <h1 className="text-center text-primary mb-4">Crypto-Tracker</h1>

    <div className="d-flex justify-content-center mb-4">
      <input 
       type="text"
       placeholder="Enter the coins to Search"
       value={search}
       onChange={(e) => setSearch(e.target.value)}
       className="form-control text-center"
       style={{
        maxWidth:"400px" , minWidth: "250px"
       }}
       />
</div>

      <div className="d-flex flex-wrap justify-content-center gap-4">
        {filteredcoins.map((coin) => (

          <div key={coin.id} className="p-2" style={{width: "250px"}}>
          <CryptoCard 
          key={coin.id}
          name={coin.name}
          price={coin.current_price}
          image={coin.image}
          change={coin.price_change_percentage_24h.toFixed(2)}
          />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;