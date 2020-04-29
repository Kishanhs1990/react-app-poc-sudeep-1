import React from 'react';

const ItemComponent = (props) => {
  const { type, item, isSelected, selectItem } = props;
  if (type === 'continent') {
    return (
      <div
        className="item"
        role="presentation"
        onClick={() => typeof selectItem === 'function' && selectItem()}
      >
        {isSelected && (
          <div className="item-overlay">
            <p>Selected</p>
          </div>
        )}
        <div className="item-heading">
          <h3>{item.name}</h3>
        </div>
        <div className="item-details">
          <h4>Continent</h4>
          <p>
            <span className="bolder">Code &nbsp;-&nbsp;</span>
            {item.code}
          </p>
        </div>
      </div>
    );
  }

  if (type === 'country') {
    return (
      <div
        className="item"
        role="presentation"
        onClick={() => typeof selectItem === 'function' && selectItem()}
      >
        {isSelected && (
          <div className="item-overlay">
            <p>Selected</p>
          </div>
        )}
        <div className="item-heading">
          <h3>{item.name}</h3>
        </div>
        <div className="item-details">
          <h4>Country</h4>
          <p>
            <span className="bolder">Code &nbsp;-&nbsp;</span>
            {item.code}
          </p>
        </div>
      </div>
    );
  }

  if (type === 'country-selected') {
    return (
      <div
        className="item selected"
        role="presentation"
        onClick={() => typeof selectItem === 'function' && selectItem()}
      >
        <div className="item-heading">
          <h3>{item.name}</h3>
        </div>
        <div className="item-details">
          <h4>Country</h4>
          <p>
            <span className="bolder">Code &nbsp;-&nbsp;</span>
            {item.code}
          </p>
          <p>
            <span className="bolder">Currency &nbsp;-&nbsp;</span>
            {item.currency}
          </p>
          <p>
            <span className="bolder">Native&nbsp;-&nbsp;</span>
            {item.native}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default ItemComponent;
