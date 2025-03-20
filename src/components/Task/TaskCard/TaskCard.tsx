import { Card, Flex } from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Task, TaskStatus } from "../../../shared/types/task.ts";
import styles from "./TaskCard.module.scss";
import { CSSProperties, JSX } from "react";
import { getStatusClass } from "../../../shared/utils/taskUtils.ts";
import cn from "classnames";

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
}

const bodyStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: "16px",
};

const statusIcons: Record<TaskStatus, JSX.Element> = {
  [TaskStatus.InProgress]: <></>,
  [TaskStatus.Completed]: <CheckCircleOutlined title="Done" />,
  [TaskStatus.Deleted]: <DeleteOutlined title="Deleted" />,
};

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  const handleComplete = (id: string) => {
    console.log(id);
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };

  const handleRestore = (id: string) => {
    console.log(id);
  };

  return (
    <Card
      className={styles.root}
      actions={[
        task.status !== TaskStatus.Completed ? (
          <CheckCircleOutlined
            title="Done"
            onClick={() => handleComplete(task.id)}
          />
        ) : (
          <SyncOutlined
            title="Restore"
            onClick={() => handleRestore(task.id)}
          />
        ),
        <EditOutlined title="Edit" onClick={() => onUpdate(task)} />,
        task.status !== TaskStatus.Deleted ? (
          <DeleteOutlined
            title="Delete"
            onClick={() => handleDelete(task.id)}
          />
        ) : (
          <SyncOutlined
            title="Restore"
            onClick={() => handleRestore(task.id)}
          />
        ),
      ]}
      styles={{ body: bodyStyles }}
    >
      <Card.Meta
        title={task.title}
        description={<p className={styles.description}>{task.description}</p>}
      />
      <div className={styles.dateLine}>
        <CalendarOutlined title="Created" /> {task.createdAt}
      </div>
      {task.lastModifiedAt && (
        <div className={styles.dateLine}>
          <EditOutlined title="Last modefied" /> {task.lastModifiedAt}
        </div>
      )}
      {task.finalizedAt && (
        <div className={styles.dateLine}>
          {statusIcons[task.status]}
          {task.finalizedAt}
        </div>
      )}
      <div style={{ marginTop: "auto" }}>
        <div
          className={cn(styles.status, "status", getStatusClass(task.status))}
        >
          {task.status}
        </div>
        <Flex gap={8} className={styles.tags}>
          {task.tags.map((tag: string, index: number) => (
            <div key={index} className={styles.tag}>
              {tag}
            </div>
          ))}
        </Flex>
      </div>
    </Card>
  );
}
