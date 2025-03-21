import { Col, Empty, Row } from "antd";
import { TaskCard } from "../TaskCard/TaskCard.tsx";
import { Task } from "../../../shared/types/task.ts";
import { useState } from "react";
import { CreateUpdateTaskModal } from "../CreateUpdateTaskModal/CreateUpdateTaskModal.tsx";
import useMessage from "antd/es/message/useMessage";

interface TasksSectionProps {
  className?: string;
  tasks: Task[];
}

export function TasksList({ className, tasks }: TasksSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateTask, setUpdateTask] = useState<Task>();
  const [messageApi, contextHolder] = useMessage();

  if (tasks.length === 0) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<p>Пусто</p>} />
    );
  }

  const handleUpdateTask = (task: Task) => {
    setUpdateTask(task);
    setIsModalOpen(true);
  };

  return (
    <>
      {contextHolder}

      <Row gutter={[16, 16]} className={className}>
        {tasks.map((task) => (
          <Col key={task.id} span={8}>
            <TaskCard
              task={task}
              messageApi={messageApi}
              onUpdate={handleUpdateTask}
            />
          </Col>
        ))}
      </Row>

      {updateTask !== undefined && (
        <CreateUpdateTaskModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          task={updateTask}
          type="update"
        />
      )}
    </>
  );
}
