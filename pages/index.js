import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import Avatar from "@mui/material/Avatar";

import { BsPhone } from "react-icons/bs";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [khoa, setKhoa] = useState([]);
  const [Slkhoa, setSlKhoa] = useState("");

  const [dshv, setDshv] = useState([]);
  const [SlHv, setSlHv] = useState("");

  const [detail, setDetail] = useState([]);

  const [loading, SetLoading] = useState(false);

  const urlFetch =
    "https://script.google.com/macros/s/AKfycbzRz_h-QtUlBOZHBJzcf5BS2h2dWel5xhhAlphyMivCcgac_D-MDMthAlUi7aWbwfgYsA/exec";

  useEffect(() => {
    SetLoading(true);
    const fetchKhoa = async () => {
      const res = await fetch(urlFetch);
      const dataKhoa = await res.json();
      setKhoa(dataKhoa);
    };
    fetchKhoa();
    SetLoading(false);
  }, []);

  useEffect(() => {
    SetLoading(true);
    const fetchDshv = async () => {
      const res = await fetch(urlFetch + "?mk=" + Slkhoa);
      const dataDshv = await res.json();
      setDshv(dataDshv);
    };

    if (Slkhoa != "") fetchDshv();
    SetLoading(false);
  }, [Slkhoa]);

  useEffect(() => {
    SetLoading(true);
    const fetchDetail = async () => {
      const res = await fetch(urlFetch + "?mhv=" + SlHv);
      const dataDetail = await res.json();
      setDetail(dataDetail);
    };

    if (SlHv != "") fetchDetail();
    SetLoading(false);
  }, [SlHv]);

  console.log(detail);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Thầy Tùng - Dạy lái xe</div>
        <div className={styles.caption_dienthoai}>
          <BsPhone /> : 0932.045.045
        </div>
      </div>
      <div className={styles.searchbar}>
        <div className={styles.row}>
          <div className={styles.search_khoa}>
            <select
              className={styles.selectNoBorder}
              name="cars"
              id="cars"
              onChange={(e) => {
                e.preventDefault();
                setSlKhoa(e.target.value);
              }}
            >
              <option value="">Chon khoa</option>
              {khoa.map((item, i) => {
                return (
                  <option key={i} value={item.MKhoa}>
                    {item.TenKhoa}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.search_hv}>
            <select
              name="cars"
              id="cars"
              onChange={(e) => {
                e.preventDefault();
                setSlHv(e.target.value);
              }}
            >
              <option value="">Chon HV</option>
              {dshv.map((item, i) => {
                return (
                  <option key={i} value={item.MHV}>
                    {item.HVT}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <main className={styles.main}>
        {detail.map((item, i) => {
          return (
            <div key={i}>
              <div className={styles.div_center}>
                <Avatar
                  src="/avatar.png"
                  sx={{ width: 100, height: 100, bgcolor: "#BDBDBD" }}
                />
              </div>
              <div className={styles.hvt}>{item.HVT}</div>
              <div className={styles.mhv}>{item.MHV}</div>
              <div className={styles.mhv}>
                <Moment locale="vn" format="DD / MM / YYYY">
                  {item.Ngaysinh}
                </Moment>
              </div>
              <div
                className={styles.kq}
                style={
                  item.KQ === "Đạt"
                    ? { backgroundColor: "#39FF14" }
                    : { backgroundColor: "red" }
                }
              >
                {item.KQ}
              </div>
              <p></p>

              <div className={styles.row}>
                <div className={styles.column}>
                  <div className={styles.titleDetail}>&ensp;</div>
                  <div>Tổng phiên </div>
                  <div>Phiên sai </div>
                  <div>Số tự động </div>
                  <div>Giờ đêm</div>
                  <div>Giờ B2</div>
                  <div>Tổng giờ</div>
                  <div>Tổng Km đã đạt</div>
                </div>
                <div className={styles.column}>
                  <div className={styles.titleDetail}>Hoan thanh </div>
                  <div> : {Number(item.TongPhien)}</div>
                  <div> : {Number(item.PhienSai)}</div>
                  <div>: {Number(item.STD)}</div>
                  <div> : {Number(item.Dem)}</div>
                  <div> : {Number(item.GioB2)}</div>
                  <div> : {Number(item.TongGio)}</div>
                  <div> : {item.TongKm}</div>
                </div>
                <div className={styles.column}>
                  <div className={styles.titleDetail}>Con thieu </div>
                  <div> : &ensp;</div>
                  <div> : &ensp;</div>
                  <div>: {(3.2 - Number(item.STD)).toFixed(2)}</div>
                  <div> : {(4 - Number(item.Dem)).toFixed(2)}</div>
                  <div> : {(16.8 - Number(item.GioB2)).toFixed(2)}</div>
                  <div> : {(20 - Number(item.TongGio)).toFixed(2)}</div>
                  <div> : {(810 - item.TongKm).toFixed(2)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
