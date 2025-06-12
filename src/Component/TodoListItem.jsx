import { useState } from 'react';

export default function TodoListitems({ item, onDone, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(item[1]);
  const [editDesc, setEditDesc] = useState(item[2]);
  const [showMenu, setShowMenu] = useState(false);

  // For "Read More" functionality
  const [showFullTask, setShowFullTask] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  function handleSave() {
    onEdit(item[0], editTask, editDesc);
    setIsEditing(false);
    setShowMenu(false);
  }

  function handleMenu(action) {
    setShowMenu(false);
    if (action === "edit" && !item[3]) setIsEditing(true);
    if (action === "delete") onDelete(item[0]);
  }

  // Helper to truncate text
  const truncate = (text, len = 60) =>
    text.length > len ? text.slice(0, len) + "..." : text;

  // Format date and time for better mobile display
  let date = "", time = "";
  if (item[4]) {
    const dt = new Date(item[4]);
    if (!isNaN(dt)) {
      date = dt.toLocaleDateString();
      time = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      [date, time] = item[4].split(",");
    }
  }

  return (
    <tr className={item[3] ? "bg-green-50 opacity-70" : "hover:bg-blue-50 transition"}>
      <td className="font-mono text-xs sm:text-sm break-all px-1 py-2">{item[0]}</td>
      {/* Task cell */}
      <td className="text-base font-semibold whitespace-normal break-words max-w-[120px] sm:max-w-md md:max-w-lg lg:max-w-2xl px-1 py-2">
        {isEditing ? (
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            className="w-full border border-fuchsia-300 rounded px-2 py-1 text-sm"
          />
        ) : (
          <span className={item[3] ? "line-through text-gray-400" : ""}>
            {showFullTask || item[1].length <= 60
              ? item[1]
              : truncate(item[1])}
            {item[1].length > 60 && !showFullTask && (
              <button
                className="ml-2 text-blue-600 underline text-xs"
                onClick={() => setShowFullTask(true)}
              >
                Read More
              </button>
            )}
            {item[1].length > 60 && showFullTask && (
              <button
                className="ml-2 text-blue-600 underline text-xs"
                onClick={() => setShowFullTask(false)}
              >
                Show Less
              </button>
            )}
          </span>
        )}
      </td>
      {/* Description cell */}
      <td className="whitespace-normal break-words max-w-[120px] sm:max-w-md md:max-w-lg lg:max-w-2xl px-1 py-2">
        {isEditing ? (
          <input
            type="text"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="w-full border border-fuchsia-300 rounded px-2 py-1 text-sm"
          />
        ) : (
          <>
            {showFullDesc || (typeof item[2] === "string" && item[2].length <= 60)
              ? item[2]
              : truncate(item[2])}
            {typeof item[2] === "string" && item[2].length > 60 && !showFullDesc && (
              <button
                className="ml-2 text-blue-600 underline text-xs"
                onClick={() => setShowFullDesc(true)}
              >
                Read More
              </button>
            )}
            {typeof item[2] === "string" && item[2].length > 60 && showFullDesc && (
              <button
                className="ml-2 text-blue-600 underline text-xs"
                onClick={() => setShowFullDesc(false)}
              >
                Show Less
              </button>
            )}
          </>
        )}
      </td>
      {/* Time cell - Wrapped for mobile */}
      <td className="text-xs text-gray-500 px-1 py-2">
        <div className="flex flex-col items-center sm:items-start">
          <span className="block font-semibold text-fuchsia-600">{date}</span>
          <span className="block text-blue-500">{time}</span>
        </div>
      </td>
      {/* Desktop action buttons */}
      <td className="action-buttons px-1 py-2">
        {!item[3] ? (
          <button
            onClick={() => onDone(item[0])}
            className="bg-gradient-to-r from-emerald-400 to-emerald-600 border-none px-3 py-1 rounded-lg text-white font-semibold text-xs shadow hover:from-blue-400 hover:to-blue-600 transition"
          >
            Done
          </button>
        ) : (
          <span className="bg-green-200 text-green-700 px-2 py-1 rounded text-xs font-bold">✓Completed</span>
        )}
      </td>
      <td className="action-buttons px-1 py-2">
        <button
          onClick={() => onDelete(item[0])}
          className="bg-gradient-to-r from-amber-400 to-pink-400 border-none px-3 py-1 rounded-lg text-white font-semibold text-xs shadow hover:from-pink-400 hover:to-amber-400 transition"
        >
          Delete
        </button>
      </td>
      <td className="action-buttons px-1 py-2">
        {!item[3] && (
          isEditing ? (
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-fuchsia-400 to-blue-400 border-none px-3 py-1 rounded-lg text-white font-semibold text-xs shadow hover:from-blue-400 hover:to-fuchsia-400 transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-fuchsia-400 to-blue-400 border-none px-3 py-1 rounded-lg text-white font-semibold text-xs shadow hover:from-blue-400 hover:to-fuchsia-400 transition"
            >
              Edit
            </button>
          )
        )}
      </td>
      {/* Mobile three-dot menu */}
      <td className="three-dot-menu px-1 py-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-fuchsia-400 to-blue-400 border-none px-3 py-1 rounded-lg text-white font-semibold text-xs shadow hover:from-blue-400 hover:to-fuchsia-400 transition"
          >
            Save
          </button>
        ) : (
          <>
            {!item[3] && (
              <button
                onClick={() => onDone(item[0])}
                className="bg-gradient-to-r from-emerald-400 to-emerald-600 border-none px-3 py-1 rounded-lg text-white font-semibold text-xs shadow hover:from-blue-400 hover:to-blue-600 transition"
              >
                Done
              </button>
            )}
            {!item[3] ? (
              <button
                className="three-dot-btn bg-gradient-to-r from-amber-400 to-pink-400 border-none px-3 py-1 rounded-lg text-white font-semibold text-xs shadow hover:from-pink-400 hover:to-amber-400 transition"
                onClick={() => setShowMenu((prev) => !prev)}
                aria-label="Actions"
              >
                ⋮
              </button>
            ) : (
              <button
                onClick={() => onDelete(item[0])}
                className="bg-gradient-to-r from-amber-400 to-pink-400 border-none px-3 py-1 rounded-lg text-white font-semibold text-xs shadow hover:from-pink-400 hover:to-amber-400 transition"
              >
                Delete Completed
              </button>
            )}
            {showMenu && !item[3] && (
              <div className="menu-dropdown">
                <button
                  onClick={() => handleMenu("edit")}
                  className="bg-gradient-to-r from-fuchsia-400 to-blue-400 border-none px-3 py-1 rounded-lg text-white font-semibold text-xs shadow hover:from-blue-400 hover:to-fuchsia-400 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleMenu("delete")}
                  className="bg-gradient-to-r from-amber-400 to-pink-400 border-none px-3 py-1 rounded-lg text-white font-semibold text-xs shadow hover:from-pink-400 hover:to-amber-400 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </td>
    </tr>
  );
}