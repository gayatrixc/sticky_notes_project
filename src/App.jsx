import React, { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("sticky-notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteColor, setNewNoteColor] = useState("#fef08a");

  useEffect(() => {
    localStorage.setItem("sticky-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    const newNote = {
      id: Date.now(),
      title: newNoteTitle,
      content: newNoteContent,
      color: newNoteColor,
      timestamp: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setNewNoteTitle("");
    setNewNoteContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note)));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-indigo-400">Sticky Notes</h1>

     {/* Create Note Box */}
<div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg shadow-lg mb-8 flex flex-col gap-4">
  <h2 className="text-xl font-semibold text-white">Create Your Note</h2>

  {/* Title Input */}
  <div className="flex flex-col gap-1">
    <label className="text-white font-medium">Title</label>
    <input
      type="text"
      placeholder="Enter Title"
      value={newNoteTitle}
      onChange={(e) => setNewNoteTitle(e.target.value)}
      className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-indigo-500"
      style={{ backgroundColor: "#e6e6fa" }}
    />
  </div>

  {/* Content Textarea */}
  <div className="flex flex-col gap-1">
    <label className="text-white font-medium">Content</label>
    <textarea
      placeholder="Enter Content"
      value={newNoteContent}
      onChange={(e) => setNewNoteContent(e.target.value)}
      rows={5}
      className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 resize-y focus:outline-indigo-500"
      style={{ backgroundColor: "#afeeee" }}
    />
  </div>

  {/* Note Color Picker */}
  <div className="flex flex-col gap-1">
    <label className="text-white font-medium">Note Color</label>
    <input
      type="color"
      value={newNoteColor}
      onChange={(e) => setNewNoteColor(e.target.value)}
      className="w-16 h-10 rounded border border-gray-700"
      aria-label="Pick note color"
    />
  </div>

  {/* Add Note Button */}
  <button
    onClick={addNote}
    className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded text-white font-semibold transition mt-2"
  >
    Add Note
  </button>

  {/* Search Bar */}
  <div className="flex flex-col gap-1 mt-2">
    <label className="text-white font-medium">Search Notes</label>
    <input
      type="text"
      placeholder="Search notes by title"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full p-3 rounded border border-gray-700 text-white placeholder-gray-400 focus:outline-indigo-500"
      style={{ backgroundColor: "#ffe4e1" }}
    />
  </div>
</div>

      {/* Notes Display */}
      {filteredNotes.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center w-full max-w-6xl">
          {filteredNotes.map((note) => (
            <NoteBox
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onUpdate={updateNote}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-10 text-lg">No notes found.</p>
      )}
    </div>
  );
}

function NoteBox({ note, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editColor, setEditColor] = useState(note.color);

  const saveEdit = () => {
    if (!editTitle.trim() || !editContent.trim()) return;
    onUpdate(note.id, {
      title: editTitle,
      content: editContent,
      color: editColor,
    });
    setIsEditing(false);
  };

  return (
    <div
      className="rounded-lg shadow-md p-5 max-w-xs w-full"
      style={{ backgroundColor: editColor }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full mb-2 p-2 rounded border border-gray-400 focus:outline-indigo-500"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={5}
            className="w-full mb-3 p-2 rounded border border-gray-400 resize-y overflow-y-auto focus:outline-indigo-500"
          />
          <label className="flex items-center gap-2 mb-3">
            <span>Note Color:</span>
            <input
              type="color"
              value={editColor}
              onChange={(e) => setEditColor(e.target.value)}
              className="w-10 h-8 rounded border border-gray-400"
              aria-label="Edit note color"
            />
          </label>
          <button
            onClick={saveEdit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="font-bold text-lg mb-2">{note.title}</h3>
          <p className="text-base whitespace-pre-wrap max-h-36 overflow-y-auto mb-4">
            {note.content}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white font-medium"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
