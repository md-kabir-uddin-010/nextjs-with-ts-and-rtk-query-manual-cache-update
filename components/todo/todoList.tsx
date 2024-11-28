"use client";

import { useGetTodosQuery } from "@/lib/features/todo/todoApi";
import TodoItem from "./todoItem";

type Props = {};

export default function TodoList({}: Props) {
  const { data: todos, isLoading, isError } = useGetTodosQuery();

  if (isLoading) {
    return <p className=" text-center">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Something went wrong!</p>;
  }

  return (
    <div>
      <div>
        {todos && todos?.length <= 0 && (
          <p className=" px-3"> No Todos Found!</p>
        )}

        {todos && todos?.map((item) => <TodoItem key={item?.id} item={item} />)}
      </div>
    </div>
  );
}
