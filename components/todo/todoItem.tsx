"use client";

import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "@/lib/features/todo/todoApi";
import { useState } from "react";

type Props = {
  item: {
    [key: string]: any;
  };
};

export default function TodoItem({ item }: Props) {
  const { id, todo, isChecked } = item;
  const [todoIsChecked, setTodoIsChecked] = useState(isChecked);

  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();

  // checked or unchecked todo
  const handleChange = () => {
    setTodoIsChecked(!todoIsChecked);
    if (id) {
      editTodo({ id, isChecked: !todoIsChecked });
    }
  };

  // handle delete todo
  const handleDelete = () => {
    if (id) {
      deleteTodo(id);
    }
  };

  return (
    <div className=" my-2 px-3 transition-all group/item flex items-center justify-between">
      <div className=" flex items-center">
        <input
          className=" w-5 h-5 cursor-pointer "
          type="checkbox"
          name="todo"
          checked={todoIsChecked}
          onChange={handleChange}
        />
        <p className={` ${todoIsChecked ? "line-through" : ""} mx-2 text-xl`}>
          {todo}
        </p>
      </div>

      <div>
        <button
          onClick={handleDelete}
          className=" duration-150 invisible group-hover/item:visible bg-orange-500 hover:bg-orange-600 text-white capitalize px-2 py-1 rounded-md"
        >
          delete
        </button>
      </div>
    </div>
  );
}
