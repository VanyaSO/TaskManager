import cn from "classnames";
import styles from "./TasksSection.module.scss";
import { Col, Empty, Row } from "antd";
import { TaskCard } from "../TaskCard/TaskCard.tsx";
import { Task } from "../../types/Task.ts";
import { CardStyleSettings } from "../CardSettings/CardSettings.tsx";

type TasksSectionProps = {
  tasks: Task[];
  className?: string;
  cardSettings: CardStyleSettings;
};

export function TasksSection({
  tasks,
  className,
  cardSettings,
}: TasksSectionProps) {
  if (tasks.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <Row gutter={[16, 16]} className={cn(styles.root, className)}>
      {tasks.map((task) => (
        <Col key={task.id} span={8}>
          {/* Передаем cardSettings в TaskCard */}
          <TaskCard task={task} cardSettings={cardSettings} />
        </Col>
      ))}
    </Row>
  );
}
