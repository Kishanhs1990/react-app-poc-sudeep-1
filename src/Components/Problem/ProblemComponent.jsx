import React from 'react';
import { Link } from 'react-router-dom';

const ProblemComponent = () => {
  return (
    <div className="box">
      <div className="title-box">Challenge Application</div>
      <div className="box-content">
        <div className="text-box">
          <p className="description">
            1. Write a parser function that takes a string in specific pattern as a parameter and
            outputs a JSON.
          </p>
          <p>
            2. Using Graphql (​https://countries.trevorblades.com/​) to fetch data (query
            “​continents​” for listing the continents and “​continent​” for details of one
            continent), implement the following tasks: Create a mobile optimized website with
            following two screens: a. Interface showing ​continents​ List b. continent​ details
            interface (which is shown when user taps on any job list item in the list interface
          </p>
        </div>
        <div className="buttons-box">
          <Link to="/string-parse">String-Parser</Link>
          <Link to="/continents/select-continent">Continents</Link>
        </div>
      </div>
    </div>
  );
};

export default ProblemComponent;
