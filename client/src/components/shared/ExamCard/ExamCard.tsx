import { Badge, Button, Card, Group, Menu, Text, rem } from "@mantine/core";

import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { ExamCardType } from "../../../types/Exam";
import { IconEdit, IconSettingsFilled, IconTrash } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { deleteExamAction } from "../../../actions/exam/deleteExam";
import Swal from "sweetalert2";
import { getCreatedExamsAction } from "../../../actions/exam/getCreatedExams";
import { setCreated } from "../../../redux/slices/examSlice";

interface Props {
  edit?: boolean;
  disabled?: boolean;
}

const ExamCard = ({
  title,
  totalMark,
  totalQuestions,
  description,
  duration,
  end,
  id,
  start,
  code,
  status,
  disabled = false,
  edit = false,
}: ExamCardType & Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteHandeler = async () => {
    let check = await deleteExamAction(id);
    if (check === true) {
      const res = await getCreatedExamsAction();
      if (res !== false) {
        dispatch(setCreated(res));
      }
      Swal.fire({
        icon: "error",
        title: "Exam Deleted",
      });
    }
  };
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group justify="space-between">
        <Badge variant={"filled"} color="pink">
          Duration: {duration} min
        </Badge>
        {edit === true ? (
          <Menu
            shadow="md"
            trigger="click-hover"
            width={200}
            position="bottom-end"
          >
            <Menu.Target>
              <Button variant="subtle" p={0} size="xs">
                <IconSettingsFilled />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {status === "resulted" ? (
                <Menu.Item
                  leftSection={
                    <IconEdit style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={() => {
                    navigate(`/exam-results/${id}`);
                  }}
                >
                  See Results
                </Menu.Item>
              ) : (
                <Menu.Item
                  leftSection={
                    <IconEdit style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={() => {
                    if (code && typeof window !== "undefined" && navigator) {
                      navigator.clipboard.writeText(code);
                      Swal.fire({
                        icon: "success",
                        title: "Code copied to clipboard",
                      });
                    }
                  }}
                >
                  Copy Code
                </Menu.Item>
              )}
              <Menu.Item
                color="red"
                onClick={deleteHandeler}
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <></>
        )}
      </Group>
      <Group display={"block"} mt="sm" mb="xs">
        <Text fw={500}>{title}</Text>
        <div className="">
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </div>
        <Group justify="center" align="center">
          <Badge variant={"filled"} color="violet">
            Questions: {totalQuestions}
          </Badge>
          <Badge variant={"filled"} color="green">
            Mark: {totalMark}
          </Badge>
        </Group>
        {new Date(start).getTime() <= new Date().getTime() &&
        new Date(end).getTime() > new Date().getTime() ? (
          <Button
            onClick={() => navigate(`/exam/${id}`)}
            color="blue"
            fullWidth
            mt="md"
            disabled={disabled}
            radius="md"
          >
            Start Exam
          </Button>
        ) : new Date(end).getTime() < new Date().getTime() ? (
          <Button color="red" disabled fullWidth mt="md" radius="md">
            Exam Ended
          </Button>
        ) : (
          <Button
            color="pink"
            fullWidth
            mt="md"
            onClick={() => {
              if (edit && code && typeof window !== "undefined" && navigator) {
                navigator.clipboard.writeText(code);
                Swal.fire({
                  icon: "success",
                  title: "Code copied to clipboard",
                });
              } else {
                navigate(`/exam/${id}`);
              }
            }}
            styles={{
              label: {
                color: "var(--white)",
              },
            }}
            radius="md"
            className={"text-capitalize"}
          >
            {edit ? "Copy Exam Code" : <Moment fromNow>{start}</Moment>}
          </Button>
        )}
      </Group>
    </Card>
  );
};

export default ExamCard;
