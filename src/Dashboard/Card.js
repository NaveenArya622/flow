import React from "react";
import PropTypes from "prop-types";

const Card = ({children, history, to}) => {
    const onClickHandler = () => {
        history.push(to);
    }
  return (
      <div className={"card"}  onDoubleClick={onClickHandler}>{
          children
      }
      </div>
  );
}
Card.propTypes={
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
}
export default Card;