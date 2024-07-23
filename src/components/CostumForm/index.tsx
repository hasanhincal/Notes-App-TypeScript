import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { CreateProps } from "../../pages/Create";
import { Tag } from "../../types";
import { v4 } from "uuid";

const CostumForm = ({
  handleSubmit,
  createTag,
  availableTags,
  markdown = "",
  tags = [],
  title = "",
}: CreateProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  // form gönderilince:
  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    // yeni oluşturulan notu kaydet:
    handleSubmit({
      title: inputRef.current?.value as string,
      markdown: textareaRef.current?.value as string,
      tags: selectedTags,
    });
    // anasayfaya yönlndir:
    navigate("/");
  };

  return (
    <Form onSubmit={handleSend} className="mt-4">
      {/* Başlık - etiket inputu */}
      <Row>
        <Col>
          <Form.Group controlId="title">
            <Form.Label>Başlık</Form.Label>
            <Form.Control defaultValue={title} ref={inputRef} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="tags">
            <Form.Label>Etiketler</Form.Label>
            <ReactSelect
              className="text-black"
              isMulti
              options={availableTags}
              onChange={(allTags) => setSelectedTags(allTags as Tag[])}
              onCreateOption={(text: string) => {
                // etiket nesnesi oluştur ve ID ekle:
                const newTag: Tag = {
                  label: text,
                  value: v4(),
                };
                // yeni etiketi locale kaydet
                createTag(newTag);

                // seçili etiketleri state'e ekle:
                setSelectedTags([...selectedTags, newTag]);
              }}
              value={selectedTags}
            />
          </Form.Group>
        </Col>
      </Row>
      {/* içerik */}
      <Form.Group className="mt-4">
        <Form.Label>İçerik (Markdown Destekler)</Form.Label>
        <Form.Control
          defaultValue={markdown}
          ref={textareaRef}
          as={"textarea"}
          style={{ minHeight: "300px", maxHeight: "500px" }}
        />
      </Form.Group>
      {/* butonlar */}
      <Stack
        direction="horizontal"
        className="justify-content-end mt-4"
        gap={4}
      >
        <Link to={".."}>
          <Button type="button" variant="secondary">
            Geri
          </Button>
        </Link>
        <Button type="submit">Kaydet</Button>
      </Stack>
    </Form>
  );
};

export default CostumForm;
