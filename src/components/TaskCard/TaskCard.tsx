import { Button, Card, Flex } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Task } from "../../types/Task.ts";
import styles from "./TaskCard.module.scss";
//import cn from "classnames"; // закомитил пока что

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card
      className={styles.root}
      actions={[
        <FileDoneOutlined key="done" />,
        <EditOutlined key="edit" />,
        <DeleteOutlined key="setting" />,
      ]}
    >
      <h2 className={styles.title}>{task.title}</h2>
      <p className={styles.description}>{task.description}</p>
      <div className={styles.createdAt}>
        Created at: {task.createdAt.toLocaleString()}
      </div>
      {task.tags.length > 0 && (
        <Flex gap={8} className={styles.tags}>
          {task.tags.map((tag: string, index: number) => (
            <div key={index} className={styles.tag} color="pink">
              {tag}
            </div>
          ))}
        </Flex>
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
