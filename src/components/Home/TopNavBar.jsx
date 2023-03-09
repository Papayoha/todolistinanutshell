import React, { useState } from 'react';
import '../../assets/NavBar.css'
import nutshell from '../../assets/walnut.png'
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    setTodos([...todos, { id: todos.length + 1, text: newTodo }]);
    setNewTodo('');
  };

  const handleTodoDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleTodoEditStart = (id, text) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const handleTodoEditCancel = () => {
    setEditingTodoId(null);
    setEditingTodoText('');
  };

  const handleTodoEditSave = (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingTodoText('');
  };

  return (
    <div className='header'>
      <div className='container'>
           <h1 className='text'>Todo List In a NutShell </h1><br></br>
           <img src={nutshell} width="40px" height="40px"/>
      <form className="textli2"onSubmit={handleNewTodoSubmit}>
        <label className="textli"htmlFor="new-todo">New Todo:</label>
        <input
          id="new-todo"
          maxLength={200}
          type="text"
          value={newTodo}
          onChange={handleNewTodoChange}
        />
        <button className='buttoncheck' type="submit"></button>
      </form>
      <ol className='textli'>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={editingTodoText}
                  onChange={(event) => setEditingTodoText(event.target.value)}
                />
                <button className="buttonsaveandedit1" onClick={() => handleTodoEditSave(todo.id, editingTodoText)}></button>
                <button className="buttonsaveandedit2" onClick={handleTodoEditCancel}></button>
              </div>
            ) : (
              <div>
                {todo.text}
                <button className="butedit" onClick={() => handleTodoEditStart(todo.id, todo.text)}></button>
                <button className="butdel" onClick={() => handleTodoDelete(todo.id)}></button>
              </div>
            )}
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
}

export default TodoList;
