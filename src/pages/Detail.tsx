import { Link, useOutletContext } from "react-router-dom";
import { Note } from "../types";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import Markdown from "react-markdown";

type Props = {
  deleteNote: (id: string) => void;
};

const Detail = ({ deleteNote }: Props) => {
  const note: Note = useOutletContext();
  console.log(note);
  return (
    <div className="container py-5 mx-auto">
      <Row>
        <Col>
          <h1>{note.title}</h1>
          <Stack direction="horizontal" className="flex-wrap" gap={2}>
            {note.tags?.map((tag) => (
              <Badge key={tag.value}>{tag.label}</Badge>
            ))}
          </Stack>
        </Col>
        <Col>
          <Stack direction="horizontal" gap={2}>
            <Link to={"/"}>
              <Button variant="secondary">Geri</Button>
            </Link>
            <Link to={"edit"}>
              <Button>Düzenle</Button>
            </Link>

            <Button variant="danger">Sil</Button>
          </Stack>
        </Col>
      </Row>
      <Markdown className="mt-5">{note.markdown}</Markdown>
    </div>
  );
};

export default Detail;
