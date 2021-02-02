import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { repairAdded, repairUpdate } from "../actions";

export default function Form() {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.bicycle.item);
  const editMode = useSelector((state) => state.bicycle.editMode);
  const [owner, setOwner] = useState(item.owner);
  const [model, setModel] = useState(item.model);
  const [id, setId] = useState(item.id);
  const [description, setDescription] = useState(item.description);

  useEffect(() => {
    setOwner(item.owner);
    setModel(item.model);
    setDescription(item.description);
    setId(item.id);
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(
        repairUpdate({
          id,
          owner,
          model,
          description,
        })
      );
    } else {
      dispatch(
        repairAdded({
          owner,
          model,
          description,
        })
      );
    }
    setOwner("");
    setModel("");
    setDescription("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="owner"
          required
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="model"
          required
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
          required
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
}
