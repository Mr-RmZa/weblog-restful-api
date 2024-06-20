"use client";
import Image from "next/image";
import { useEffect } from "react";
import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css";

function Edit(params: Record<string, any>) {
  useEffect(() => {
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
              <div className="card-header">ویرایش پست</div>
              <div className="card-body">
                <Image
                  className="img-fluid rounded mx-auto d-block"
                  width={250}
                  height={250}
                  alt="loading"
                  src={"/img/bale.webp"}
                  priority={true}
                  unoptimized={true}
                />
                <form method="post" encType="multipart/form-data" id="edit">
                  <div className="mb-4">
                    <label className="form-label">رسانه ها</label>
                    <input
                      className="form-control form-control-lg"
                      type="file"
                      name="media"
                      required
                      multiple
                    />
                  </div>
                  <div className="form-floating mb-4">
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
                  <div className="form-floating mb-4">
                    <textarea
                      className="form-control"
                      placeholder="توضیحات"
                      name="description"
                      required
                    ></textarea>
                    <label className="text-muted">توضیحات</label>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">مسنجرها : </label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input float-end"
                        type="checkbox"
                        name="messengers"
                        value="telegram"
                        id="telegram"
                        required
                      />
                      <label
                        htmlFor="telegram"
                        className="form-check-label me-4"
                      >
                        تلگرام
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input float-end"
                        type="checkbox"
                        name="messengers"
                        value="eitaa"
                        id="eitaa"
                        required
                      />
                      <label htmlFor="eitaa" className="form-check-label me-4">
                        ایتا
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input float-end"
                        type="checkbox"
                        name="messengers"
                        value="bale"
                        id="bale"
                        required
                      />
                      <label htmlFor="bale" className="form-check-label me-4">
                        بله
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">وضعیت ارسال : </label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input float-end"
                        type="radio"
                        name="status"
                        value="public"
                        id="public"
                        required
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
                        value="private"
                        id="timer"
                        required
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
                  <div className="form-floating mb-4 d-none" id="time">
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
                      ویرایش پست
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

export default Edit;
