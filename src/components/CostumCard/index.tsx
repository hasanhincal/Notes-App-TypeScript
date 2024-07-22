import { Badge, Card, CardBody, Stack } from "react-bootstrap";
import { Note } from "../../types";
import styles from "./card.module.css";
import { useNavigate } from "react-router-dom";
console.log(styles);

const CostumCard = ({ note }: { note: Note }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/note/${note.id}`)}
      className={styles.note_card}
    >
      <CardBody>
        <Stack
          className="align-items-center justify-content-between h-100"
          gap={2}
        >
          <span className="fw-bold text-nowrap">{note.title}</span>
          <Stack
            direction="horizontal"
            className="justify-content-center"
            gap={2}
          >
            {note?.tags?.map((tag) => (
              <Badge key={tag.value}>{tag.label}</Badge>
            ))}
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CostumCard;
