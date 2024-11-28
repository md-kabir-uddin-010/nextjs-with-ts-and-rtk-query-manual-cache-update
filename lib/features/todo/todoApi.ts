import { apiSlice } from "../api/apiSlice";

interface Todos {
  id?: string;
  todo?: string;
  isChecked?: boolean;
  [key: string]: unknown;
}

interface ApiResponse {
  data: Todos[];
  [key: string]: unknown;
}

const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all todos
    getTodos: builder.query<Todos[], void>({
      query: () => "/todos",
      transformResponse: (response: Todos[]) => {
        return response.slice().reverse();
      },
    }),

    // add new todo
    addTodo: builder.mutation<ApiResponse, Partial<Todos>>({
      query: (body) => ({
        url: "/todos",
        method: "POST",
        body,
      }),

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data: newTodo } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              // @ts-ignore
              "getTodos",
              undefined,
              (draft: Todos[]) => {
                draft.unshift(newTodo);
              }
            )
          );
        } catch (error) {
          console.log("add todo error : ", error);
        }
      },
    }),

    // edit todo
    editTodo: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedTodo } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              // @ts-ignore
              "getTodos",
              undefined,
              (draft: Todos[]) => {
                const index = draft.findIndex((item) => item.id === args.id);
                draft[index] = updatedTodo;
              }
            )
          );
        } catch (error) {
          console.log("edit todo error : ", error);
        }
      },
    }),

    // delete todo
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              // @ts-ignore
              "getTodos",
              undefined,
              (draft: Todos[]) => {
                return draft.filter((item) => item.id !== id);
              }
            )
          );
        } catch (error) {
          console.log("delete todo error : ", error);
        }
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
