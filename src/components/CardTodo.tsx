import { Card } from 'antd';
import _ from 'lodash';
import {
  todoListState,
  isModalVisibleState,
  searchState,
  todoListOrSearchState,
} from '@/components/State';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TodoProps } from '@/types/index';
import { useState } from 'react';

import {
  EditOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';
import FormEditTodo from '@/components/FormEditTodo';

const CardTodo = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const todoListOrSearch = useRecoilValue(todoListOrSearchState);
  const [modalContent, setModalContent] = useState<JSX.Element>();
  const [isModalVisible, setIsModalVisible] = useRecoilState(
    isModalVisibleState
  );
  const [search, setSearch] = useRecoilState(searchState);
  let data: TodoProps[];

  if (search) {
    const temp = _.cloneDeep(todoList);
    data = temp.filter((data) => {
      return data.value.includes(search);
    });
  } else {
    data = todoList;
  }

  const onHandleDelete = (todo: TodoProps): void => {
    const temp = _.cloneDeep(todoList);
    const newData = temp.filter((data) => {
      return data.id !== todo.id;
    });
    setTodoList(newData);
  };

  const onHandleModal = (todo: TodoProps): void => {
    setModalContent(<FormEditTodo todo={todo} mapNewData={mapNewData} />);
  };

  const mapNewData = (
    todo: TodoProps,
    type: string,
    newValue: string
  ): void => {
    const temp = _.cloneDeep(todoList);
    const newData: TodoProps[] = temp.map((data) => {
      switch (type) {
        case 'isDone':
          if (data.id === todo.id) {
            return { ...data, isDone: !data.isDone };
          }
          return data;
          break;

        default:
          if (data.id === todo.id) {
            data.value = newValue;
          }
          return data;
          break;
      }
    });
    setTodoList(newData);
    // setSearch('');
    // console.log(search, 'set');
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const { Meta } = Card;
  if (todoList.length > 0) {
    return (
      <>
        {todoListOrSearch.search.map((todo: TodoProps) => {
          return (
            <Card
              key={todo.id}
              className={`my-4 ${todo.isDone ? 'bg-green-500' : ''}`}
              actions={[
                <CheckSquareOutlined
                  key="check"
                  onClick={() => mapNewData(todo, 'isDone', '')}
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    onHandleModal(todo);
                    setIsModalVisible(true);
                  }}
                />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => onHandleDelete(todo)}
                />,
              ]}
            >
              <Meta title={todo.value} description={todo.time} />
            </Card>
          );
        })}
        {modalContent}
      </>
    );
  } else {
    return <p></p>;
  }
};
export default CardTodo;
