import { v4 as uuidv4 } from "uuid";

const initalState = {
  items: [],
  item: { owner: "", model: "", description: "", resolved: false },
  editMode: false,
  isSaveBtnClicked: false,
  isEditBtnClicked: false,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case "repairAdded":
      action.payload.id = uuidv4();
      action.payload.resolved = false;
      return {
        ...state,
        items: state.items.concat([action.payload]),
        item: { owner: "", model: "", description: "" },
        isSaveBtnClicked: true,
        editMode: false,
      };

    case "repairRemoved":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "repairResolved":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id == action.payload.id) {
            item.resolved = !item.resolved;
          }
          return item;
        }),
      };
    case "editTask":
      return {
        ...state,
        item: action.payload,
        editMode: true,
      };
    case "repairUpdate":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id == action.payload.id) {
            item.owner = action.payload.owner;
            item.model = action.payload.model;
            item.description = action.payload.description;
          }
          return item;
        }),
        item: { owner: "", model: "", description: "" },
        editMode: false,
      };
    default:
      return state;
  }
}
