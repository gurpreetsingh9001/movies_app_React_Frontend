import React from "react";

//here we are using textProperty and valueProperty so if the Genre object dont have unique identifier named as "id" and insted is something like "uniqueID" we will still be able to work with this component
const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
  } = props;

  return (
    <ul className="list-group" style={{ cursor: "pointer" }}>
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem
              ? "list-group-item active "
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

//until we are dealing with other than standard objects which dont have "_id" and 'name' property we are good with default props and dont want to pass it during calling this component and thus making the code less complex
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
