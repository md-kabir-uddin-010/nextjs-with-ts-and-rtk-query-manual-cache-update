import AddTodo from "./addTodo";
import TodoList from "./todoList";

export default function Todo() {
  return (
    <div className=" w-full mt-10 flex items-center ">
      <div className=" w-full sm:w-[600px] sm:mx-auto">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
}
