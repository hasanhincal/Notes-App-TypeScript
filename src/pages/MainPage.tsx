import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  Row,
  Stack,
} from "react-bootstrap";
import { Note, Tag } from "../types";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import CostumCard from "../components/CostumCard";
import { useState } from "react";

type Props = {
  notes: Note[];
  availableTags: Tag[];
};

const MainPage = ({ notes, availableTags }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  console.log(title);
  console.log(selectedTags);
  return (
    <div className="container py-5 mx-auto">
      {/* üst kısım */}
      <Stack direction="horizontal" className="justify-content-between mb-4">
        <div className="d-flex gap-3 align-items-center">
          <img src="/note_logo.png" alt="logo_png" width={45} />
          <h1>Notlar</h1>
        </div>
        <Link to={"/new"}>
          <Button>Oluştur</Button>
        </Link>
      </Stack>
      {/* form alanı */}
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <FormLabel>Başlığa Göre Ara</FormLabel>
              <FormControl onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <FormLabel>Etikete Göre Ara</FormLabel>
              <ReactSelect
                onChange={(all_tags) => setSelectedTags(all_tags as Tag[])}
                className="text-black"
                options={availableTags}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {/* not listesi  */}
      <Row xs={1} sm={2} md={3} lg={4} className="mt-4 g-4">
        {notes.map((note) => (
          <Col key={note.id}>
            <CostumCard note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
