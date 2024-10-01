import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Todo from '../interfaces/Todo';

interface TodoState {
  filterStatus: string;
  todoList: Todo[];
}

const getInitialTodo = (): Todo[] => {
  // getting todo list
  const localTodoList = window.localStorage.getItem('todoList');
  // if todo list is not empty
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem('todoList', JSON.stringify([]));
  return [];
};

const initialValue: TodoState = {
  filterStatus: 'all',
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr: Todo[] = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem('todoList', JSON.stringify([action.payload]));
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr: Todo[] = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = [...todoListArr];
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr: Todo[] = JSON.parse(todoList);
        const updatedList = todoListArr.filter(todo => todo.id !== action.payload);
        window.localStorage.setItem('todoList', JSON.stringify(updatedList));
        state.todoList = updatedList;
      }
    },
    updateFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;
