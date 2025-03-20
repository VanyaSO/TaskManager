import {Card, Flex, message} from "antd";
import {CalendarOutlined, CheckCircleOutlined, DeleteOutlined, EditOutlined, SyncOutlined,} from "@ant-design/icons";
import {Task, TaskStatus, UpdateTaskArgs} from "../../../shared/types/task.ts";
import styles from "./TaskCard.module.scss";
import {CSSProperties, JSX} from "react";
import {getStatusClass} from "../../../shared/utils/taskUtils.ts";
import cn from "classnames";
import {useUpdateTask} from "../../../shared/hooks/useTasks.ts";
import {useDispatch} from "react-redux";
import {deleteTaskAction, updateTaskAction} from "../../../shared/store/taskSlice.ts";

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
  const [messageApi, contextHolder] = message.useMessage();
  const {mutate: updateTask} = useUpdateTask();
  const dispatch = useDispatch();

  const changeStatus = (id: string, status: TaskStatus, message: string) => {
    const updatedTask: UpdateTaskArgs = {
      id,
      task: {
        status: status,
      }
    }

    if (!task.isArchived) updatedTask.task.isArchived = true;

    updateTask(updatedTask, {
      onSuccess:(response: Task) => {
        messageApi.success(message);
        if (task.isArchived) {
          dispatch(updateTaskAction(response))
        } else {
          dispatch(deleteTaskAction(id));
        }
      },
      onError:(error: Error) => {
        messageApi.error(error?.message);
      }
    })
  }

  const handleComplete = (id: string) => {
    changeStatus(id, TaskStatus.Completed, "Задача выполнена");
  };

  const handleDelete = (id: string) => {
    changeStatus(id, TaskStatus.Deleted, "Задача удалена");
  };

  const handleRestore = (id: string) => {
    const updatedTask: UpdateTaskArgs = {
      id,
      task: {
        status: TaskStatus.InProgress,
        isArchived: false,
      }
    }

    updateTask(updatedTask, {
      onSuccess:() => {
        messageApi.success("Задача восстановлена");
        dispatch(deleteTaskAction(id));
      },
      onError:(error: Error) => {
        messageApi.error(error?.message);
      }
    })
  };

  return (
    <>
      {contextHolder}
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
              {statusIcons[task.status]}{" "}
              {task.finalizedAt}
            </div>
        )}
        <div style={{ marginTop: "auto" }}>
          <div className={cn(styles.status, "status", getStatusClass(task.status))}>
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
    </>
  );
}
