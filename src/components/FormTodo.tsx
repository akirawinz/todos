import { useRecoilState } from 'recoil';
import { FormProps, TodoProps } from '@/types/index';
import { Form, Input, Button, Checkbox } from 'antd';
import { searchState } from '@/components/State';
import { useEffect } from 'react';

const FormTodo = ({ onAdd, onEdit, type, defaultValue }: FormProps) => {
  const [form] = Form.useForm();
  const [search, setSearch] = useRecoilState(searchState);
  useEffect(() => {
    if (type === 'Edit') {
      form.setFieldsValue({
        addTodo: defaultValue,
      });
    }
  }, [defaultValue]);
  const currentDate = new Date()
    .toLocaleDateString('us-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    .toString();
  const onHandleAdd = (addTodo: string): void => {
    const data = {
      id: new Date().valueOf(),
      value: addTodo,
      time: currentDate,
      isDone: false,
    };
    if (!!onAdd) onAdd(data);
    form.resetFields();
  };

  const onHandleEdit = (addTodo: string): void => {
    if (!!onEdit) onEdit(addTodo);
  };

  const onHandleSearch = (addTodo: string): void => {
    console.log('click');
    setSearch(addTodo);
  };

  const handleType = (e: { addTodo: string }) => {
    const { addTodo } = e;
    switch (type) {
      case 'Add':
        onHandleAdd(addTodo);
        break;
      case 'Edit':
        onHandleEdit(addTodo);
        break;
      case 'Search':
        onHandleSearch(addTodo);
        break;
      default:
        break;
    }
  };

  return (
    <Form name="basic" className="flex mt-5" onFinish={handleType} form={form}>
      <Form.Item
        label={`${type} todo`}
        name="addTodo"
        className={'mx-5'}
        rules={[
          {
            required: type !== 'Search' ? true : false,
            message: 'Please input todo!',
          },
        ]}
      >
        <Input
          className={'w-full px-2.5 py-1 border focus:outline-none rounded-md'}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {type}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormTodo;
