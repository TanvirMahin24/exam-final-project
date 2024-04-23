import { Badge, Button, Card, Divider, Group, Text } from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { ResultType } from "../../../types/Exam";

const ResultCard = ({
  title,
  totalMark,
  totalQuestions,
  duration,
  id,
  correct,
  examId,
  gainedMark,
  submissionDuration,
  wrong,
}: ResultType) => {
  const navigate = useNavigate();
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group pb={"sm"}>
        <Badge variant={"filled"} color="pink">
          Duration: {duration} min
        </Badge>
      </Group>
      <Text fw={600}>{title}</Text>
      <Divider pb={"sm"} />
      <Text size="sm" fw={400}>
        Correct: {correct}/{totalQuestions}
      </Text>
      <Text size="sm" fw={400}>
        Mark: {gainedMark}/{totalMark}
      </Text>
      <Text size="sm" fw={500}>
        Submission Duration: {submissionDuration.toFixed(2)} min
      </Text>

      <Button
        color="pink"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => navigate(`/result/${id}`)}
        className={"text-capitalize"}
      >
        View
      </Button>
    </Card>
  );
};

export default ResultCard;
