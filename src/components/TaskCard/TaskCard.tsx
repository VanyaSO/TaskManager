import { Button, Card } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Task } from "../../types/Task.ts";
import styles from "./TaskCard.module.scss";
import { CardStyleSettings } from "../CardSettings/CardSettings.tsx";

type TaskCardProps = {
  task: Task;
  cardSettings: CardStyleSettings;
};

export function TaskCard({ task, cardSettings }: TaskCardProps) {
  return (
    <Card
      className={styles.root}
      style={{
        backgroundColor: cardSettings.backgroundColor,
        padding: cardSettings.padding,
        borderRadius: cardSettings.borderRadius,
      }}
      actions={[
        <FileDoneOutlined key="done" />,
        <EditOutlined key="edit" />,
        <DeleteOutlined key="setting" />,
      ]}
    >
      <h2
        className={styles.title}
        style={{ fontSize: cardSettings.titleFontSize }}
      >
        {task.title}
      </h2>
      <p
        className={styles.description}
        style={{ fontSize: cardSettings.descriptionFontSize }}
      >
        {task.description}
      </p>
      <div className={styles.createdAt}>
        Created at: {task.createdAt.toLocaleString()}
      </div>
      {task.tags.length > 0 && (
        <div className={styles.tags}>
          {task.tags.map((tag, index) => (
            <div
              key={index}
              className={styles.tag}
              style={{ color: cardSettings.tagColor }}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
      <Button
        className={styles.showDetails}
        size="small"
        type="default"
        icon={<EyeOutlined />}
      />
    </Card>
  );
}
