import styles from "./SearchResult.module.css";
import { searchRecipes } from "../../algolia";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClosedRecipeCard from "../../components/ClosedRecipeCard/ClosedRecipeCard";

const SearchResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const [searchQuery, setSearchQuery] = useState(params.query);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  async function setResults() {
    const trimmedQuery = searchQuery.replace(/\s+/g, " ").trim();
    if (trimmedQuery.length >= 3) {
      setIsLoading(true);
      const results = await searchRecipes(trimmedQuery);
      setSearchParams({ query: searchQuery });
      setSearchResults(results);
      setErrorMessage("");
      setIsLoading(false);
    }
    else {
        setErrorMessage("Please enter at least 3 characters")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setResults();
  };

  const handleInputChange = (event) => {
    const inputQuery = event.target.value;
    setSearchQuery(inputQuery);
  };

  useEffect(() => {
    if (params.query) {
      setResults();
    }
  }, []);

  return (
    <section>
      <div className={styles.barWrapper}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder={"Search..."}
              className={styles.searchInput}
            />
            {errorMessage && (
              <span className={styles.error}>{errorMessage}</span>
            )}
          </div>
          <button className={styles.searchBtn} type="submit">
            Search
          </button>
        </form>
      </div>
      <div className={styles.resultsWrapper}>
        {isLoading ? (
          <div className={styles["lds-dual-ring"]}></div>
        ) : (
          <div className={styles.resultsGrid}>
            {params.query && searchResults.length === 0 && (
              <p style={{ gridColumn: "1 / span 3", textAlign: "center" }}>
                No recipes found
              </p>
            )}
            {params.query &&
              searchResults.length > 0 &&
              searchResults.map((recipe) => (
                <ClosedRecipeCard
                  recipeID={recipe.objectID}
                  key={recipe.objectID}
                  imgLink={recipe.imageLink}
                  name={recipe.name}
                  cookingTime={recipe.cookingTime}
                  servingsNum={recipe.servingsNum}
                  complexity={recipe.cookingComplexity}
                  userID={recipe.userUid}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResult;
