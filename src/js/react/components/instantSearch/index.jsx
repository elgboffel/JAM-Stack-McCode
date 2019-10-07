import "./instantSearch.scss";
import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "PPW7YLKRND",
  "5cd2005711a9fc805d1741addf037cb4"
);

function Hit(props) {
  const {hit} = props;

  return (
    <div>
      {hit.image && (
        <img src={hit.image.url} alt={hit.image.title} />
      )}
      <div className="hit-name">
        <Highlight attribute="heading" hit={hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="lead" hit={hit} />
      </div>
    </div>
  );
}

const Search = () => {

  return (
    <InstantSearch
      indexName="content"
      searchClient={searchClient}
    >
      {/* <div className="left-panel">
        <ClearRefinements />
        <h2>Brands</h2>
        <RefinementList attribute="heading" />
      </div> */}
      <div className="right-panel">
        <Configure hitsPerPage={3} />
        <SearchBox showLoadingIndicator />
        <InfiniteHits  
          hitComponent={Hit}
          translations={{
            loadPrevious: "Load previous",
            loadMore: "Load more",
          }} />
      </div>
    </InstantSearch>
  );
};

export default Search;
