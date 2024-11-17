import React, { useEffect, useRef } from "react";

const EditableDiv = ({
  initialHTML = "",
  onContentChange,
}) => {
  const ref = useRef(null);



  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      return selection.getRangeAt(0);
    }
    return null;
  };


  const restoreCursorPosition = (range) => {
    if (range) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  useEffect(() => {
    const range = saveCursorPosition(); 
    if (ref.current) {
      ref.current.innerHTML = initialHTML;
    }
    restoreCursorPosition(range); 
  }, [initialHTML]);

  return (
    <div className="border rounded-md shadow-sm p-4 bg-white">
      <div
        ref={ref}
        contentEditable
        onInput={(e)=>onContentChange(e.target.initialHTML)}
        className="min-h-[200px] mt-4 focus:outline-none p-2 border rounded-md bg-white"
        placeholder={"please enter data"}
      />
    </div>
  );
};

export default EditableDiv;
