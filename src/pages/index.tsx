import { Checkbox, Row, Col } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import CardTodo from '@/components/CardTodo';
import FormTodo from '@/components/FormTodo';
import CardTotal from '@/components/CardTotal';
import {
  todoListState,
  isCompleteState,
  isInCompleteState,
} from '@/components/State';
import { TodoProps } from '@/types/index';

export default function Home() {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const setIsComplete = useSetRecoilState(isCompleteState);
  const setIsInComplete = useSetRecoilState(isInCompleteState);

  const onAdd = (todo: TodoProps): void => {
    setTodoList([...todoList, todo]);
  };
  const onChange = (checkedValues: any): void => {
    if (checkedValues.includes('completed')) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
    if (checkedValues.includes('inCompleted')) {
      setIsInComplete(true);
    } else {
      setIsInComplete(false);
    }
  };

  return (
    <div className="w-100 max-w-4xl mx-auto p-5">
      <h1 className="text-4xl font-bold">TodoList</h1>
      <div className="flex">
        <FormTodo onAdd={onAdd} type={'Add'} />
        <FormTodo type={'Search'} />
      </div>
      <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
        <Row>
          <Col span={4}>
            <Checkbox value="completed">Completed</Checkbox>
          </Col>
          <Col span={4}>
            <Checkbox value="inCompleted">InCompleted</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
      <CardTotal />
      <CardTodo />
    </div>
  );
}
