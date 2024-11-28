"use client";
import { useAddTodoMutation } from "@/lib/features/todo/todoApi";
import React, { useState } from "react";

type Props = {};

export default function AddTodo({}: Props) {
  const [todo, setTodo] = useState("");
  const [addTodo, { isLoading }] = useAddTodoMutation();

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodo(value);
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todoObj = {
      id: Date.now().toString(),
      todo,
      isChecked: false,
    };

    addTodo(todoObj);
    setTodo("");
  };

  return (
    <div className=" my-5 transition-all">
      <form onSubmit={handleSubmit} className=" px-3 flex items-center gap-x-2">
        <input
          className=" w-full py-2 px-2 outline-none border rounded-md "
          type="text"
          name="todo"
          id="todo"
          value={todo}
          onChange={handleChange}
          required
        />
        <input
          disabled={isLoading}
          className="capitalize cursor-pointer bg-indigo-500 hover:bg-indigo-600 duration-150 text-white rounded-sm px-2 py-2"
          type="submit"
          value="add"
        />
      </form>
    </div>
  );
}
