import { Modal } from "antd";
import { useRecoilState } from "recoil";
import { isModalVisibleState } from "@/components/State";
import FormTodo from "./FormTodo";
import { FormEditProps } from "@/types/index";

const FormEditTodo = ({ todo, mapNewData }: FormEditProps) => {
  const [isModalVisible, setIsModalVisible] = useRecoilState(
    isModalVisibleState
  );

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onEdit = (value: string): void => {
    mapNewData(todo, "Edit", value);
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Edit Todo"
      visible={isModalVisible}
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <FormTodo onEdit={onEdit} type={"Edit"} defaultValue={todo.value} />
    </Modal>
  );
};

export default FormEditTodo;
