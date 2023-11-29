import { useState } from "react";
import { Card, CardBody, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import ModalForm from "../components/ModalForm";

import imgSauna from "../assets/images/sauna.jpg";
import imgMassage from "../assets/images/massage.jpg";
import imgCleaning from "../assets/images/cleaning.jpg";

const MenuLayout = () => {
  const [data, setData] = useState([]);

  const setDataProps = (result, index) => {
    if (index === undefined || index === null) {
      const newData = [...data];
      newData.push(result);
      setData(newData);
      toast.success(`Berhasil Tambah Data Layanan ${result.nama}!`);
    } else {
      const updateData = [...data];
      updateData[index] = result;
      setData(updateData);
      toast.success(`Berhasil Update Data Layanan ${result.nama}!`);
    }
  };

  const switchImage = (kategori) => {
    switch (kategori) {
      case "Sauna":
        return imgSauna;

      case "Massage":
        return imgMassage;

      case "Cleaning":
        return imgCleaning;
    }
  };

  const handleDelete = (index) => {
    const newData = [...data];
    const namaLayanan = newData[index].nama;
    newData.splice(index, 1);
    setData(newData);
    toast.success(`Berhasil Menghapus Data Layanan ${namaLayanan}!`);
  };

  return (
    <>
      <h1 className="mb-3 border-bottom fw-bold">Daftar Layanan</h1>
      <p>
        Grand Atma memiliki <strong>{data.length} </strong>
        daftar layanan yang dapat digunakan customer.
      </p>
      <ModalForm setData={setDataProps} />
      {data?.map((menu, index) => (
        <Card key={index} className=" mt-3">
          <CardBody>
            <div className="row align-items-center">
              <div className="col-lg-4 col-xl-3">
                <img src={switchImage(menu.kategori)} className="img-fluid rounded" alt="No Image Found" />
              </div>
              <div className="col-lg-8 col-xl-9">
                <h4>{menu.nama}</h4>
                <p className="mb-0">{menu.deskripsi}</p>
                <hr />
                <p>
                  Layanan: <span className="lead fw-bold">{menu.kategori}</span> &middot; Harga: <span className="lead fw-bold">Rp {menu.harga}</span>
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button variant="danger" onClick={() => handleDelete(index)}>
                    <FaTrashAlt className="mb-1" /> Hapus Layanan
                  </Button>
                  <ModalForm data={menu} setData={setDataProps} index={index} />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default MenuLayout;
