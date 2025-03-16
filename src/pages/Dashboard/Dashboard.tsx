import {useState} from "react";
import {Button, Divider, Flex} from "antd";
import {MainLayout} from "../../widgets/MainLayout/MainLayout.tsx";
import {SearchBar} from "../../components/SearchBar/SearchBar.tsx";
import {TasksSection} from "../../components/TasksSection/TasksSection.tsx";
import {ReloadOutlined} from "@ant-design/icons";
import {Task} from "../../types/Task.ts";
import {selectTasks} from "../../store/selectors.ts";
import {useSelector} from "react-redux";
import styles from "./Dashboard.module.scss";

export function Dashboard() {
    const [activeSection, setActiveSection] = useState<string>("tasks");
    const tasks: Task[] = useSelector(selectTasks);

    const handleClickTasksTab = () => {
        setActiveSection("tasks");
    };

    const handleClickArchiveTab = () => {
        setActiveSection("archive");
    };

    const refetch = () => {
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
                            <Button type="text" onClick={refetch} icon={<ReloadOutlined/>}/>
                        </Flex>
                        <SearchBar/>
                    </Flex>
                    <Divider/>
                    <TasksSection tasks={tasks}/>
                </div>
            </div>
        </MainLayout>
    );
}
