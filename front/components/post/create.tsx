"use client";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css";

function Create() {
  const [channels, setChannels] = useState([]);
  const [decoded, setDecoded] = useState("");
  const [checked, setChecked] = useState("public");
  const [channelListId, setChannelListId] = useState([]) as any;

  const onOptionChange = (e: any) => {
    setChecked(e.target.value);
  };
  const onInputChange = (e: any) => {
    if (e.target.checked) {
      setChannelListId((prevState: any) => [...prevState, e.target.value]);
    } else {
      setChannelListId((prevState: any) => {
        const filteredData = prevState.filter(
          (state: any) => state != e.target.value
        );
        return filteredData;
      });
    }
  };
  console.log(channelListId);

  useEffect(() => {
    if (Cookies.get("phoneNumberOrEmail")) {
      jwt.verify(
        Cookies.get("phoneNumberOrEmail")!,
        "hV37j4WfWxqz9r2dashboard",
        async (err: any, decoded: any) => {
          if (!err) {
            setDecoded(decoded.access_token);
            try {
              const response = await fetch(
                `http://172.16.58.192:443/api/v1/channel`,
                {
                  method: "GET",
                  cache: "no-store",
                  headers: {
                    Authorization: `Basic ${decoded.access_token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              if (response.ok) {
                const data = await response.json();
                if (data.data) {
                  setChannels(data.data);
                }
              } else {
                toast.error("خطا");
              }
            } catch (error) {
              toast.error("خطا");
            }
          }
        }
      );
    }
    require("@majidh1/jalalidatepicker");
    //@ts-ignore
    jalaliDatepicker.startWatch({
      time: true,
      showCloseBtn: true,
    });
  }, []);
  return (
    <section className="my-5 py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">ایجاد پست</div>
              <div className="card-body">
                <form method="post" encType="multipart/form-data" id="create">
                  <div className="mb-5">
                    <label className="form-label">رسانه ها</label>
                    <input
                      className="form-control form-control-lg"
                      type="file"
                      name="media"
                      accept=".mp4,.mp3,.jpg,.zip,.rar,.txt.,.doc,.docx,.waw,.oga"
                      required
                      multiple
                    />
                  </div>
                  <div className="form-floating mb-5">
                    <input
                      type="search"
                      className="form-control text-dark"
                      placeholder="عنوان"
                      name="title"
                      required
                      autoFocus
                    />
                    <label className="text-muted">عنوان</label>
                  </div>
                  <div className="form-floating mb-5">
                    <textarea
                      className="form-control"
                      placeholder="توضیحات"
                      name="description"
                      required
                    ></textarea>
                    <label className="text-muted">توضیحات</label>
                  </div>
                  <div className="mb-5">
                    <label className="form-label">مسنجرها : </label>
                    {channels &&
                      channels.map((data: any, index: number) => {
                        return (
                          <div
                            className="form-check form-check-inline"
                            key={index}
                          >
                            <input
                              className="form-check-input float-end"
                              type="checkbox"
                              name="messengers"
                              value={data.id}
                              id={data.name}
                              onChange={onInputChange}
                              required
                            />
                            <label
                              htmlFor={data.name}
                              className="form-check-label me-4"
                            >
                              {data.name}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                  <div className="mb-5">
                    <label className="form-label">وضعیت ارسال : </label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input float-end"
                        type="radio"
                        name="status"
                        value="public"
                        id="public"
                        required
                        checked={checked === "public"}
                        onChange={onOptionChange}
                        onClick={() => {
                          document
                            .getElementById("time")!
                            .classList.add("d-none");
                        }}
                      />
                      <label htmlFor="public" className="form-check-label me-4">
                        همین حالا
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input float-end"
                        type="radio"
                        name="status"
                        value="private"
                        id="private"
                        required
                        checked={checked === "private"}
                        onChange={onOptionChange}
                        onClick={() => {
                          document
                            .getElementById("time")!
                            .classList.add("d-none");
                        }}
                      />
                      <label
                        htmlFor="private"
                        className="form-check-label me-4"
                      >
                        ذخیره
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input float-end"
                        type="radio"
                        name="status"
                        value="timer"
                        id="timer"
                        required
                        checked={checked === "timer"}
                        onChange={onOptionChange}
                        onClick={() => {
                          document
                            .getElementById("time")!
                            .classList.remove("d-none");
                        }}
                      />
                      <label htmlFor="timer" className="form-check-label me-4">
                        زمان دار
                      </label>
                    </div>
                  </div>
                  <div className="form-floating mb-5 d-none" id="time">
                    <input
                      type="search"
                      className="form-control text-dark"
                      placeholder="time"
                      name="time"
                      required
                      data-jdp
                    />
                    <label className="text-muted">زمان</label>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn btn-outline-primary btn-lg"
                    >
                      ایجاد پست
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Create;
