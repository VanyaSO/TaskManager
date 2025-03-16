import { useState } from "react";
import { Button, Divider, Flex, Typography } from "antd";
import { MainLayout } from "../../widgets/MainLayout/MainLayout.tsx";
import { SearchBar } from "../../components/SearchBar/SearchBar.tsx";
import { TasksSection } from "../../components/TasksSection/TasksSection.tsx";
import { ReloadOutlined } from "@ant-design/icons";
import { Task } from "../../types/Task.ts";
import { selectTasks } from "../../store/selectors.ts";
import { useSelector } from "react-redux";
import styles from "./Dashboard.module.scss";

export function Dashboard() {
    const [activeSection, setActiveSection] = useState<string>("tasks");
    const tasks: Task[] = useSelector(selectTasks);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
    const [searchPerformed, setSearchPerformed] = useState(false);

    // Обработчик клика по кнопке "Tasks"
    const handleClickTasksTab = () => {
        setActiveSection("tasks");
        setFilteredTasks(tasks);
        setSearchPerformed(false);
    };

    // Обработчик клика по кнопке "Archive"
    const handleClickArchiveTab = () => {
        setActiveSection("archive");
        setFilteredTasks(tasks.filter(task => task.isArchived));
        setSearchPerformed(false);
    };

    // Обработчик обновления списка задач
    const refetch = () => {
        setFilteredTasks(tasks);
        setSearchPerformed(false);
    };

    // Обработчик поиска
    const handleSearch = (searchText: string, filters: { title: boolean; description: boolean; tags: boolean }) => {
        if (!searchText.trim()) {
            setFilteredTasks(tasks);
            setSearchPerformed(false);
            return;
        }

        const lowerCaseSearch = searchText.toLowerCase();
        const results = tasks.filter(task =>
            (filters.title && task.title.toLowerCase().includes(lowerCaseSearch)) ||
            (filters.description && task.description.toLowerCase().includes(lowerCaseSearch)) ||
            (filters.tags && task.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)))
        );

        setFilteredTasks(results);
        setSearchPerformed(true);
    };

    return (
        <MainLayout>
            <div className={styles.root}>
                <div className="container">
                    {/* Верхняя панель с кнопками */}
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
                        </Flex>

                        {/* Компонент поиска */}
                        <SearchBar onSearch={handleSearch} />
                    </Flex>

                    <Divider />

                    {/* Вывод задач или сообщение о том, что задач не найдено */}
                    {searchPerformed && filteredTasks.length === 0 ? (
                        <Typography.Text type="secondary">Совпадений не найдено</Typography.Text>
                    ) : (
                        <TasksSection tasks={filteredTasks} />
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
