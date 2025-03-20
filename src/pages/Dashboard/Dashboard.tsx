import { useState } from "react";
import {
  Button,
  Divider,
  Flex,
  Typography,
  Modal,
  Input,
  Form,
  Space,
} from "antd";
import { MainLayout } from "../../widgets/MainLayout/MainLayout.tsx";
import { SearchBar } from "../../components/SearchBar/SearchBar.tsx";
import { TasksSection } from "../../components/TasksSection/TasksSection.tsx";
import {
  ReloadOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Task, TaskStatus } from "../../types/Task.ts";
import { selectTasks } from "../../store/selectors.ts";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../store/taskSlice.ts";
import {
  CardSettings,
  CardStyleSettings,
} from "../../components/CardSettings/CardSettings.tsx";
import styles from "./Dashboard.module.scss";

export function Dashboard() {
  const [activeSection, setActiveSection] = useState<string>("tasks");
  const tasks: Task[] = useSelector(selectTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [form] = Form.useForm();

  // Получаем настройки из localStorage, если они есть
  const savedCardSettings = localStorage.getItem("cardSettings");
  const initialSettings: CardStyleSettings = savedCardSettings
    ? JSON.parse(savedCardSettings)
    : {
        backgroundColor: "#ffffff",
        padding: "16px",
        borderRadius: "8px",
        titleFontSize: "20px",
        descriptionFontSize: "14px",
        tagColor: "#ff6347",
      };

  const [cardSettings, setCardSettings] =
    useState<CardStyleSettings>(initialSettings);

  const dispatch = useDispatch();

  const handleSettingsChange = (newSettings: CardStyleSettings) => {
    setCardSettings(newSettings);
    localStorage.setItem("cardSettings", JSON.stringify(newSettings));
  };

  const handleClickTasksTab = () => {
    setActiveSection("tasks");
    setFilteredTasks(tasks);
    setSearchPerformed(false);
  };

  const handleClickArchiveTab = () => {
    setActiveSection("archive");
    setFilteredTasks(tasks.filter((task) => task.isArchived));
    setSearchPerformed(false);
  };

  const refetch = () => {
    setFilteredTasks(tasks);
    setSearchPerformed(false);
  };

  const handleSearch = (
    searchText: string,
    filters: { title: boolean; description: boolean; tags: boolean },
  ) => {
    if (!searchText.trim()) {
      setFilteredTasks(tasks);
      setSearchPerformed(false);
      return;
    }

    const lowerCaseSearch = searchText.toLowerCase();
    const results = tasks.filter(
      (task) =>
        (filters.title && task.title.toLowerCase().includes(lowerCaseSearch)) ||
        (filters.description &&
          task.description.toLowerCase().includes(lowerCaseSearch)) ||
        (filters.tags &&
          task.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearch))),
    );

    setFilteredTasks(results);
    setSearchPerformed(true);
  };

  const handleAddTask = (values: any) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: values.title,
      description: values.description,
      createdAt: new Date(),
      lastModifiedAt: undefined,
      status: TaskStatus.InProgress,
      isArchived: false,
      tags: values.tags.split(",").map((tag: string) => tag.trim()),
    };

    dispatch(addTask(newTask));
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <MainLayout>
      <div className={styles.root}>
        <div className="container">
          <Flex justify="space-between">
            <Flex gap={10}>
              <Button
                type={activeSection === "tasks" ? "primary" : "default"}
                onClick={handleClickTasksTab}
              >
                Tasks
              </Button>
              <Button
                type={activeSection === "archive" ? "primary" : "default"}
                onClick={handleClickArchiveTab}
              >
                Archive
              </Button>
              <Button type="text" onClick={refetch} icon={<ReloadOutlined />} />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                className={styles.addButton}
              >
                Добавить задачу
              </Button>
            </Flex>

            <Flex gap={10}>
              <SearchBar onSearch={handleSearch} />
              <Button
                type="default"
                icon={<SettingOutlined />}
                onClick={() => setIsSettingsVisible(true)}
              />
            </Flex>
          </Flex>

          <Divider />

          {searchPerformed && filteredTasks.length === 0 ? (
            <Typography.Text type="secondary">
              Совпадений не найдено
            </Typography.Text>
          ) : (
            <TasksSection tasks={filteredTasks} cardSettings={cardSettings} />
          )}
        </div>
      </div>

      <Modal
        title="Добавить задачу"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddTask} layout="vertical">
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
            label="Теги"
            name="tags"
            rules={[{ required: true, message: "Пожалуйста, введите теги!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>Отмена</Button>
              <Button type="primary" htmlType="submit">
                Добавить
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <CardSettings
        visible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
        onSettingsChange={handleSettingsChange}
        currentSettings={cardSettings}
      />
    </MainLayout>
  );
}
