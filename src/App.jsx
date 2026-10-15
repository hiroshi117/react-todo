import { useState, useEffect } from "react";
import { addTodo, deleteTodo, getAllTodos } from "./utils/supabaseFunction";

export const App = () => {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const onChangeTime = (e) => {
    setTime(e.target.value);
  };

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
      setIsLoading(true);
    };
    getTodos();
  }, []);

  const onClickSubmit = async () => {
    if (text.trim() === "" || time === "") {
      setError("全項目を入力してください");
    } else {
      await addTodo(text, parseInt(time, 10));
      const todos = await getAllTodos();
      setTodos(todos);
      setText("");
      setTime("");
      setError("");
    }
  };

  const totalTime = todos.reduce((acc, record) => acc + record.time, 0);

  const onClickDelete = async (id) => {
    await deleteTodo(id);
    const todos = await getAllTodos();
    setTodos(todos);
  };

  if (isLoading === false) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>記録一覧</h1>
      <div>
        内容
        <input value={text} onChange={onChangeText} />
      </div>
      <div>
        時間
        <input value={time} onChange={onChangeTime} type="number" />
        時間
      </div>
      <div>入力されている学習内容：{text}</div>
      <div>入力されている学習時間：{time}</div>
      <button onClick={onClickSubmit}>登録</button>
      <div style={{ color: "red" }}>{error}</div>
      <div>合計時間：{totalTime}時間</div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            {todo.title}&nbsp;
            {todo.time}時間
            <span
              style={{ cursor: "pointer" }}
              onClick={() => onClickDelete(todo.id)}
            >
              &nbsp;&times;
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
