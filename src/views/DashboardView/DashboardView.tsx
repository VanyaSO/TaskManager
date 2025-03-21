import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Flex, Spin, Typography } from "antd";
import { MainLayout } from "../../widgets/MainLayout/MainLayout.tsx";
import { SearchBar } from "../../components/SearchBar/SearchBar.tsx";
import { TasksList } from "../../components/Task/TasksList/TasksList.tsx";
import { PlusOutlined } from "@ant-design/icons";
import { Task } from "../../shared/types/task.ts";
import styles from "./DashboardView.module.scss";
import { CreateUpdateTaskModal } from "../../components/Task/CreateUpdateTaskModal/CreateUpdateTaskModal.tsx";
import { useGetTasks } from "../../shared/hooks/useTasks.ts";
import { setTasksAction } from "../../shared/store/taskSlice.ts";
import { selectorTasks } from "../../shared/store/selectors.ts";

export function DashboardView() {
  const [activeSection, setActiveSection] = useState<string>("tasks");
  const dispatch = useDispatch();
  const { tasks } = useSelector(selectorTasks);
  const { data = [], isLoading, isError, error } = useGetTasks(activeSection);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickTasksTab = () => {
    setActiveSection("tasks");
  };

  const handleClickArchiveTab = () => {
    setActiveSection("archive");
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(setTasksAction(data));
    }
  }, [data]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const renderContent = () => {
    if (isLoading)
      return (
        <Flex justify="center">
          <Spin size="large" />
        </Flex>
      );
    if (isError)
      return (
        <Flex justify="center">
          <Typography.Text type="danger">{error?.message}</Typography.Text>
        </Flex>
      );
    return (
      <div className={styles.tasks_list}>
        <TasksList tasks={filteredTasks} />
      </div>
    );
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
                Задачи
              </Button>
              <Button
                type={activeSection === "archive" ? "primary" : "default"}
                onClick={handleClickArchiveTab}
              >
                Архив
              </Button>
              {activeSection === "tasks" && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                  className={styles.addButton}
                >
                  Добавить задачу
                </Button>
              )}
            </Flex>

            <SearchBar tasks={tasks} setFilteredTasks={setFilteredTasks} />
          </Flex>

          <Divider />

          {renderContent()}
        </div>
      </div>

      <CreateUpdateTaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        type="create"
      />
    </MainLayout>
  );
}
