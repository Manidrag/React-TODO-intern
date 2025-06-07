import { useState } from 'react';

export default function TodoListitems({ item, onDone, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(item[1]);
  const [editDesc, setEditDesc] = useState(item[2]);
  const [showMenu, setShowMenu] = useState(false);

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

  return (
    // Table content
    <tr className={item[3] ? "completed-row" : ""}>
      <td>{item[0]}</td>
      <td>
        {/* //check editing */}
        {isEditing ? (
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
          />
        ) : (
          <span className={item[3] ? "completed-task" : ""}>
            {item[1]}
          </span>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
          />
        ) : (
          item[2]
        )}
      </td>
      {/* Desktop action buttons */}
      <td className="action-buttons">
        {!item[3] && (
          <button onClick={() => onDone(item[0])}>Done</button>
        )}
        {item[3] && <span className="completed-badge">Completed</span>}
      </td>
      <td className="action-buttons">
        <button onClick={() => onDelete(item[0])}>Delete</button>
      </td>
      <td className="action-buttons">
        {!item[3] && (
          isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )
        )}
      </td>
      {/* Mobile three-dot menu */}
      <td className="three-dot-menu">
        {isEditing ? (
          <button onClick={handleSave} className="mobile-action-btn save-btn">
            Save
          </button>
        ) : (
          <>
            {!item[3] && (
              <button onClick={() => onDone(item[0])} className="mobile-action-btn">
                Done
              </button>
            )}
            <button
              className="three-dot-btn"
              onClick={() => setShowMenu((prev) => !prev)}
              aria-label="Actions"
            >
              ⋮
            </button>
            {showMenu && (
              <div className="menu-dropdown">
                {!item[3] && <button onClick={() => handleMenu("edit")}>Edit</button>}
                <button onClick={() => handleMenu("delete")}>Delete</button>
              </div>
            )}
          </>
        )}
      </td>
    </tr>
  );
}