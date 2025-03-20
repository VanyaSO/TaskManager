import { Button, Form, Input, Modal, Space } from "antd";
import { CreateTaskRequest, Task } from "../../../shared/types/task.ts";
import { useEffect } from "react";
import styles from "./CreateUpdateTaskModal.module.scss";
import { useCreateTask } from "../../../shared/hooks/useTasks.ts";
import { useForm } from "antd/es/form/Form";

interface CreateUpdateTaskModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  task?: Task;
  type: "create" | "update";
}

export function CreateUpdateTaskModal({
  isModalOpen,
  setIsModalOpen,
  task,
  type,
}: CreateUpdateTaskModalProps) {
  const [form] = useForm();
  const {
    contextHolder,
    createTask: { mutate: createTask },
  } = useCreateTask();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        tags: task.tags.join(", "),
      });
    }
  }, [task]);

  const handleSubmit = (values: any) => {
    if (type === "update" && task) {
    } else if (type === "create") {
      const newTask: CreateTaskRequest = {
        title: values.title,
        description: values.description,
        tags: values.tags,
      };

      createTask(newTask);
    }

    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={type === "create" ? "Добавить задачу" : "Обновить задачу"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className={styles.root}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Название"
            name="title"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите название задачи!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Описание"
            name="description"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите описание задачи!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Теги - разделяйте через ,"
            name="tags"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите теги для задачи!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space className={styles.button_container}>
              <Button onClick={() => setIsModalOpen(false)}>Отмена</Button>
              <Button type="primary" htmlType="submit">
                {type === "create" ? "Добавить" : "Обновить"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
