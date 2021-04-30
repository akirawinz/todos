import { atom, selector } from 'recoil';
import { TodoProps } from '@/types/index';

export const todoListState = atom<TodoProps[]>({
  key: 'todoList',
  default: [],
});
export const searchState = atom<string>({
  key: 'search',
  default: '',
});

export const isCompleteState = atom<boolean>({
  key: 'isComplete',
  default: false,
});
export const isInCompleteState = atom<boolean>({
  key: 'isInComplete',
  default: false,
});

export const todoListOrSearchState = selector({
  key: 'todoListOrSearchState',
  get: ({ get }) => {
    const getTodoList = get(todoListState);
    let search = getTodoList;
    const getSearch = get(searchState);
    const getIsComplete = get(isCompleteState);
    const getIsInComplete = get(isInCompleteState);
    console.log(getSearch, 'getSearch');
    if (getSearch !== '') {
      search = getTodoList.filter((todo) => {
        return todo.value.includes(getSearch);
      });
    }

    if (getIsComplete && !getIsInComplete) {
      search = search.filter((todo) => {
        return todo.isDone === true;
      });
    }
    if (getIsInComplete && !getIsComplete) {
      search = search.filter((todo) => {
        return todo.isDone === false;
      });
    }

    return {
      total: getTodoList.length,
      completed: getTodoList
        ? getTodoList.filter((todo) => todo.isDone).length
        : 0,
      notCompleted: getTodoList
        ? getTodoList.filter((todo) => !todo.isDone).length
        : 0,
      search,
    };
  },
});

export const isModalVisibleState = atom<boolean>({
  key: 'isModalVisible',
  default: false,
});
