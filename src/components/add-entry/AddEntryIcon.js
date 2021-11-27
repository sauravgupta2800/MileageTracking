import { useState } from "react";
import Icon from "../common/Icon";
import AddEntryDrawer from "./AddEntryDrawer";

const AddEntryIcon = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        className="mt-add-entry-icon position-absolute mt-bg-primary mt-color-white rounded-circle p-2"
        onClick={() => setVisible(true)}
      >
        <Icon id="add" size="lg" />
      </div>
      <AddEntryDrawer visible={visible} onClose={() => setVisible(false)} />
    </>
  );
};

export default AddEntryIcon;
