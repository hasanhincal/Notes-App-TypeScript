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
import { useDebounce } from "@uidotdev/usehooks";

type Props = {
  notes: Note[];
  availableTags: Tag[];
};

const MainPage = ({ notes, availableTags }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const debouncedSearchTerm = useDebounce(title, 500);
  /*
   * 1- Not bşlığı 1. inputta aratılan metni içermelidir.
   *  - Not'un başlığının küçük harfe çevrilmiş hali aratılan metnin
   *  küçük harfe çevrilmiş halini içeriyorsa koşul sağlanır.
   *
   * &&
   *
   * 2- 2.input ile seçilen etiketler not'un içerisindeki etiketler ile birebir eşleşmeli
   * seçilen etiketler dizisindeki herbir etiket için note'a ait etiketler arasında
   * eşleşme kontrolü yapıcaz.
   *
   */
  const filtredNotes = notes.filter(
    (note) =>
      note.title &&
      note.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
      selectedTags.every((s_tag) =>
        note.tags.some((note_tag) => note_tag.value === s_tag.value)
      )
  );

  return (
    <div className="container py-5 mx-auto">
      {/* üst kısım */}
      <Stack direction="horizontal" className="justify-content-between mb-4">
        <div className="d-flex gap-3 align-items-center">
          <img
            src="/note_logo.png"
            alt="white notbook on red background"
            width={45}
            height={50}
          />
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
            <Form.Group controlId="title">
              <FormLabel>Başlığa Göre Ara</FormLabel>
              <FormControl onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <FormLabel htmlFor="select">Etikete Göre Ara</FormLabel>
              <ReactSelect
                inputId="select"
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
        {filtredNotes?.map((note) => (
          <Col key={note.id}>
            <CostumCard note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;

//? every & some metodları kullanımı:

// const arr = [5, 8, 9, 7, 6];

//* dizideki herbir elemanın kontrolünü yapar ve true veya false döner.

// const answer1 = arr.every((num) => num > 5); // false dizide dizideki bütün elemanlar 5 ten büyük değil

//* dizideki elemankardan en az bir tanesi istenen koşulu sağlarsa true döner.

// const answer2 = arr.some((num) => num > 8); // true dizideki en az bir eleman 8'den büyük.
// console.log("every: ", answer1);
// console.log("some: ", answer2);
