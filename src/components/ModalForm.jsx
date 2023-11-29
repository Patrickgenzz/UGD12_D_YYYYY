/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaPlusSquare, FaEdit } from "react-icons/fa";
import { Modal, Form, Button } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { toast } from "sonner";

const ModalForm = ({ data, setData, index }) => {
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState({
    nama: "",
    kategori: "",
    harga: "",
    deskripsi: "",
  });

  useEffect(() => {
    if (data && index !== undefined) {
      setMenu(data);
    }
  }, [data, index]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMenu({ ...menu, [name]: value });
  };

  const resetForm = () => {
    if (data) {
      setMenu(data);
    } else {
      setMenu({
        nama: "",
        kategori: "",
        harga: "",
        deskripsi: "",
      });
    }
  };

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (menu.nama === "" || menu.kategori === "" || menu.harga === "" || menu.deskripsi === "") {
      toast.error("Semua form harus diisi!");
      return;
    }

    //jika data ada maka update data dengan index tertentu, jika tidak maka tambah data
    data ? setData(menu, index) : setData(menu);
    setShow(false);
    resetForm();
  };

  return (
    <>
      <Button variant={data ? "primary" : "success"} onClick={() => setShow(true)}>
        {data ? <FaEdit className="mb-1" /> : <FaPlusSquare className="mb-1" />} {data ? "Edit Layanan" : "Tambah Layanan"}
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>{data ? "Edit Layanan" : "Tambah Layanan"}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama Layanan</Form.Label>
              <Form.Control type="text" name="nama" onChange={handleChange} value={menu.nama} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Jenis Layanan</Form.Label>
              <Form.Select aria-label="Default select example" name="kategori" onChange={handleChange} value={menu.kategori}>
                <option value="">Pilih Layanan</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Massage">Massage</option>
                <option value="Sauna">Sauna</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Harga Layanan</Form.Label>
              <Form.Control type="number" name="harga" onChange={handleChange} value={menu.harga} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Deskripsi Layanan</Form.Label>
              <Form.Control as="textarea" rows={3} name="deskripsi" onChange={handleChange} value={menu.deskripsi} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              <FaSave className="mb-1" />
              Simpan
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
