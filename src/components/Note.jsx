import React, { useState } from "react";
import Btn from "./Btn";

const Note = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [editedColor, setEditedColor] = useState(note.color || "#fef08a");

  const handleSave = () => {
    if (editedTitle.trim() === "") {
      alert("Title cannot be empty.");
      return;
    }
    onUpdate(note.id, {
      title: editedTitle,
      content: editedContent,
      color: editedColor,
    });
    setIsEditing(false);
  };

  return (
    <div
      className="rounded-md shadow-md p-4 max-w-xs w-full flex flex-col"
      style={{ backgroundColor: editedColor }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
            className="mb-2 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Content"
            className="mb-3 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y h-24 overflow-auto"
          />
          <label className="mb-3 flex items-center gap-2">
            <span className="font-medium">Color:</span>
            <input
              type="color"
              value={editedColor}
              onChange={(e) => setEditedColor(e.target.value)}
              className="w-10 h-8 cursor-pointer border border-gray-300 rounded"
            />
          </label>
          <div className="flex justify-between">
            <Btn label="Save" onClick={handleSave} />
            <Btn
              label="Cancel"
              className="bg-gray-400 hover:bg-gray-500"
              onClick={() => setIsEditing(false)}
            />
          </div>
        </>
      ) : (
        <>
          <h3 className="font-bold text-lg mb-2 break-words">{note.title}</h3>
          <p className="flex-grow whitespace-pre-wrap overflow-auto max-h-28 mb-3">{note.content}</p>
          <div className="flex justify-between">
            <Btn
              label="Edit"
              onClick={() => setIsEditing(true)}
              className="bg-green-500 hover:bg-green-600"
            />
            <Btn
              label="Delete"
              onClick={() => onDelete(note.id)}
              className="bg-red-500 hover:bg-red-600"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
