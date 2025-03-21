import { Button, ColorPicker, Form, Input, Modal, Space } from "antd";
import {
  CreateUpdateTaskRequest,
  Task,
  UpdateTaskArgs,
} from "../../../shared/types/task.ts";
import styles from "./CreateUpdateTaskModal.module.scss";
import {
  useCreateTask,
  useUpdateTask,
} from "../../../shared/hooks/useTasks.ts";
import { useForm } from "antd/es/form/Form";
import { updateTaskAction } from "../../../shared/store/taskSlice.ts";
import { useDispatch } from "react-redux";
import useMessage from "antd/es/message/useMessage";
import { useEffect } from "react";

interface CreateUpdateTaskModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  task?: Task;
  type: "create" | "update";
}

interface FormValues {
  title: string;
  description: string;
  tags: string;
  backgroundColor: any;
}

export function CreateUpdateTaskModal({
  isModalOpen,
  setIsModalOpen,
  task,
  type,
}: CreateUpdateTaskModalProps) {
  const [form] = useForm<FormValues>();
  const [messageApi, contextHolder] = useMessage();
  const { mutate: createTask } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        tags: task.tags.join(", "),
        backgroundColor: task.options?.backgroundColor,
      });
    }
  });

  const handleSubmit = (values: FormValues): void => {
    const hexColor: string =
      values.backgroundColor?.metaColor?.toHexString() ||
      task?.options?.backgroundColor;
    const tags: string[] = values.tags
      .split(",")
      .map((tag: string) => tag.trim());

    if (type === "update" && task) {
      const updatedFields: Partial<CreateUpdateTaskRequest> = {};

      if (values.title !== task.title) updatedFields.title = values.title;
      if (values.description !== task.description)
        updatedFields.description = values.description;

      const hasTagsChanged: boolean =
        tags.length !== task.tags.length ||
        tags.some((tag: string, index: number) => tag !== task?.tags[index]);
      if (hasTagsChanged) updatedFields.tags = tags;

      const initialBgColor: string | undefined = task.options?.backgroundColor;
      if (hexColor !== initialBgColor) {
        updatedFields.options = {
          backgroundColor: hexColor,
        };
      }

      if (Object.keys(updatedFields).length > 0) {
        const updatedTask: UpdateTaskArgs = {
          id: task.id,
          task: updatedFields,
        };

        console.log(updatedTask);
        updateTask(updatedTask, {
          onSuccess: (task: Task) => {
            dispatch(updateTaskAction(task));
            messageApi.success("Задача обновлена");
          },
        });
      }
    } else if (type === "create") {
      const newTask: CreateUpdateTaskRequest = {
        title: values.title,
        description: values.description,
        tags,
        options: {
          backgroundColor: hexColor,
        },
      };

      createTask(newTask, {
        onSuccess: () => {
          messageApi.success("Задача добавлена");
        },
      });
    }

    onCancel();
  };

  const onCancel = (): void => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={type === "create" ? "Добавить задачу" : "Обновить задачу"}
        open={isModalOpen}
        onCancel={onCancel}
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
          <Form.Item
            label="Цвет фона"
            name="backgroundColor"
            initialValue={task?.options?.backgroundColor}
          >
            <ColorPicker size="small" showText format="hex" />
          </Form.Item>
          <Space className={styles.button_container}>
            <Button type="primary" htmlType="submit">
              {type === "create" ? "Создать" : "Обновить"}
            </Button>
            <Button onClick={onCancel}>Отменить</Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
}
