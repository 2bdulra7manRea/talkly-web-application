import { useState } from "react";
import "./searchBar.css";
import { CloseRounded, Search } from "@mui/icons-material";
import { GeneralCard, UserCard } from "./searchResultsCards";
import CircularProgress from "@mui/material/CircularProgress";
import ElasticApis from "../../core/network/apis/elastic";

const elasticService = new ElasticApis();

export const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const handleOnChangeInput = (ev) => {
    setValue(ev.target.value);

    // getData(ev.target.value)
  };

  const getData = async () => {
    if (!value) {
      return;
    }
    setLoading(true);
    const res = await elasticService.search(value);
    if (res?.data.length !== 0) {
      setSearchResults(res.data.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="search-container">
        <div className="search-box">
          <div className="search-icon">
            {loading ? (
              <span>
                <CircularProgress color="inherit" />
              </span>
            ) : (
              <span onClick={getData}>
                <Search />
              </span>
            )}
          </div>
          <div className="search-input">
            <input
              placeholder="Search here...."
              onChange={handleOnChangeInput}
              value={value}
            ></input>
          </div>
          <div className="search-close">
            <CloseRounded></CloseRounded>
          </div>
        </div>
        <div className="search-results">
          {searchResults.length !== 0 ? (
            searchResults.map((item) => {
              switch (item.type) {
                case "post":
                  return <GeneralCard data={item} key={item._id}></GeneralCard>;

                case "blog":
                  return <GeneralCard data={item} key={item._id}></GeneralCard>;
                case "user":
                  return <UserCard data={item} key={item._id}></UserCard>;

                default:
                  return <GeneralCard data={item} key={item._id}></GeneralCard>;
              }
            })
          ) : (
            <div style={{ textAlign: "center" }}>
              <p>No results</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
