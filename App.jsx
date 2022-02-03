import React, { useState } from "react";
import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";

export default function App() {
  const [month, setMonth] = useState("");
  const [showWishList, setShowWishList] = useState(false);

  const { data: trips, loading: loadingTrips, error: errorTrips } = useFetch(
    "trips"
  );
  const months = ["Idle", "Jan", "Feb", "March", "April", "Mai", "June", "July", "August", "September", "October","November", "Dezember"];

  const [wishListTrips, setWishListTrips] = useState([]);


  function renderTrip(t) {

    console.log(t);
    console.log("okay");
    return (
      <div className="product" key={t.id}>
        <figure>
          <div>
            <img src={"images/items/" + t.id + ".jpg"} alt="name " />
          </div>
          <figcaption>
            <a href="#. . . .">{t.title}</a>
            <div>
              <span>
                {t.startTrip[1] + "-" + t.startTrip[2] + "-" + t.startTrip[3]+ "-" + t.startTrip[4]}
              </span>
            </div>
            <p>{t.description}</p>
            <div>
              {!showWishList ? (<button type="button"  onClick={() => addToWishList(t)}>Add to Wishlist</button>) : (<button type="button" onClick={() => deleteFromWishList(t)}>delete</button>)}
            </div>
          </figcaption>

        </figure>

      </div>
    );
  }

  function addToWishList(t){
    if(!(wishListTrips.includes(t))){
      let newList = wishListTrips;
      newList.push(t);
      setWishListTrips(newList);
    }
  };

  function deleteFromWishList(t){
    let newList = wishListTrips;
    newList.splice(t,1);
    setWishListTrips(newList);
    (<section id="products">{wishListTrips.map(renderTrip)}</section>)
  }

  const filteredTrips = month
    ? trips.filter((t) => t.startTrip[1] === parseInt(month))
    : trips;

  // if error then throw the errror
  if (errorTrips) throw errorTrips;
  if (loadingTrips) return <Spinner />;
  // shorthand for react fragment
  return (
    <>

      <div>
        <Header />
        <main>

          <section id="filters">
            <label htmlFor="month">Filter by Month:</label>
            <select
              id="month"
              value={month} // controlled component
              onChange={(e) => {
                //debugger;
                setMonth(e.target.value);
              }}
            >
              <option value="">All Months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">Mai</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">Dezember</option>
            </select>
            {month && (
              <h2>
                Found {filteredTrips.length}
                {filteredTrips.length > 1 ? " trips" : " trip"} for the month of
                {" " + months[month]}
              </h2>
            )}

          </section>

          {showWishList ? (<section id="products">{wishListTrips.map(renderTrip)}</section>) : (<section id="products">{filteredTrips.map(renderTrip)}</section>)}
          <button type="button" onClick={() => setShowWishList(true)}>Wishlist</button>
          <button type="button" onClick={() => setShowWishList(false)}>back</button>
        </main>

      </div>
      <Footer />
    </>
  );
}
