import {Button, Form, Input, Modal, Space} from "antd";
import {CreateUpdateTaskRequest, Task, UpdateTaskArgs} from "../../../shared/types/task.ts";
import {useEffect} from "react";
import styles from "./CreateUpdateTaskModal.module.scss";
import {useCreateTask, useUpdateTask} from "../../../shared/hooks/useTasks.ts";
import { useForm } from "antd/es/form/Form";
import {updateTaskAction} from "../../../shared/store/taskSlice.ts";
import {useDispatch} from "react-redux";
import useMessage from "antd/es/message/useMessage";

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
    contextHolder: createTaskContextHolder,
    createTask: { mutate: createTask },
  } = useCreateTask();

  const {mutate: updateTask} = useUpdateTask();
  const [messageApi, updateTaskContextHolder] = useMessage();
  const dispatch = useDispatch();

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
      const updatedFields: Partial<CreateUpdateTaskRequest> = {};

      Object.keys(values).forEach((key: string) => {
        const value = values[key];
        const initialValue = key === "tags" ? task.tags.join(", ") : task[key as keyof Task];

        if (value !== initialValue) {
          updatedFields[key as keyof CreateUpdateTaskRequest] = value;
        }
      });

      if (Object.keys(updatedFields).length > 0) {
        const updatedTask: UpdateTaskArgs = {
          id: task.id,
          task: updatedFields,
        }
        updateTask(updatedTask, {
          onSuccess:(response: Task) => {
            dispatch(updateTaskAction(response))
            messageApi.success("Задача обновлена");
          },
        })
      }
    } else if (type === "create") {
      const newTask: CreateUpdateTaskRequest = {
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
      {createTaskContextHolder}
      {updateTaskContextHolder}
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
