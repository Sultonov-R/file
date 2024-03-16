const defaultState = {
  count: [],
};

export function nameReducer(state = defaultState, actions) {
  let copied = JSON.parse(JSON.stringify(state.count));
  switch (actions.type) {
    case "Add":
      
      copied.push(actions.payload);
      return {
        ...state,
        count: copied,
      };
    case "Delete":
      copied = copied.filter((el) => {
        return el.id != actions.payload;
      });
      return {
        ...state,
        count: copied,
      };
    case "Upgrade":
      const { id, newName, newAge } = actions.payload;
      const updatedData = copied.map((el) => {
        if (el.id == id) {
          return { ...el, name: newName, age: newAge };
        }
        return el;
      });
      return {
        ...state,
        count: updatedData,
      };
    default:
      return state;
  }
}
