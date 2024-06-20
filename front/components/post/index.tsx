"use client";
import Link from "next/link";
import Image from "next/image";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Index() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    if (Cookies.get("phoneNumberOrEmail")) {
      jwt.verify(
        Cookies.get("phoneNumberOrEmail")!,
        "hV37j4WfWxqz9r2dashboard",
        async (err: any, decoded: any) => {
          if (!err) {
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
  }, []);

  return (
    <section>
      <div className="p-3 p-md-5 m-md-3 text-center">
        <div className="p-lg-5 mx-auto my-5 mb-sm-0">
          <h1 className="display-3 fw-bold">داشبورد</h1>
          <h2 className="fw-normal text-muted">
            مدیریت تمامی پیامرسان ها با همه کانال و گروه های شما
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card mb-5">
              <div className="card-header">
                <div className="row">
                  <div className="col d-flex align-items-center">
                    <Link
                      href={"/dashboard/channel"}
                      className="btn btn-outline-success btn-lg"
                    >
                      ایجاد کانال
                    </Link>
                  </div>
                  <div className="col  align-self-center">
                    <p className="text-center lead fw-bold m-0">کانال ها</p>
                  </div>
                  <div className="col">
                    <form method="post" className="float-end">
                      <div className="d-flex flex-column flex-sm-row w-100">
                        <div className="form-floating">
                          <input
                            type="search"
                            className="form-control form-control-sm text-dark"
                            name="search"
                            placeholder="جستجو"
                            required
                          />
                          <label className="text-muted">جستجو</label>
                        </div>
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                        >
                          جستجو
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="card-body text-center p-0 table-responsive">
                <table className="table table-bordered table-sm m-0">
                  <thead>
                    <tr>
                      <th scope="col">عنوان</th>
                      <th scope="col">سوشال مدیا</th>
                      <th scope="col">توکن</th>
                      <th scope="col">شناسه کانال</th>
                      <th scope="col">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channels &&
                      channels.map((data: any, index: number) => {
                        return (
                          <tr key={index}>
                            <th className="align-middle" scope="row">
                              {data.name}
                            </th>
                            <td className="align-middle">
                              {data.social_media}
                            </td>
                            <td
                              className="align-middle text-truncate"
                              style={{ maxWidth: "150px" }}
                            >
                              {data.token}
                            </td>
                            <td className="align-middle">{data.chat_id}</td>
                            <td className="align-middle">
                              <Link
                                href={`/dashboard/edit/1`}
                                className="btn btn-outline-warning btn-sm m-1"
                              >
                                ویرایش
                              </Link>
                              <Link
                                href={"/dashboard/delete/1"}
                                className="btn btn-outline-danger btn-sm m-1"
                              >
                                حذف
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card mb-5">
              <div className="card-header">
                <div className="row">
                  <div className="col d-flex align-items-center">
                    <Link
                      href={"/dashboard/create"}
                      className="btn btn-outline-success btn-lg"
                    >
                      ایجاد پست
                    </Link>
                  </div>
                  <div className="col">
                    <form method="post" className="float-end">
                      <div className="d-flex flex-column flex-sm-row w-100">
                        <div className="form-floating">
                          <input
                            type="search"
                            className="form-control form-control-sm text-dark"
                            name="search"
                            placeholder="جستجو"
                            required
                          />
                          <label className="text-muted">جستجو</label>
                        </div>
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                        >
                          جستجو
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="card-body text-center p-0 table-responsive">
                <table className="table table-bordered table-sm m-0">
                  <thead>
                    <tr>
                      <th scope="col" className="d-none d-md-block">
                        تصویر
                      </th>
                      <th scope="col">عنوان</th>
                      <th scope="col">تاریخ</th>
                      <th scope="col">توضیحات</th>
                      <th scope="col">وضعیت</th>
                      <th scope="col">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="d-none d-md-block align-middle">
                        <Image
                          className="img-fluid rounded mx-auto"
                          width={100}
                          height={100}
                          alt="loading"
                          src={"/img/bale.webp"}
                          priority={true}
                          unoptimized={true}
                        />
                      </td>
                      <th className="align-middle" scope="row">
                        بله
                      </th>
                      <td className="align-middle">Mark</td>
                      <td className="align-middle">Otto</td>
                      <td className="align-middle">@mdo</td>
                      <td className="align-middle">
                        <Link
                          href={`/dashboard/edit/1`}
                          className="btn btn-outline-warning btn-sm m-1"
                        >
                          ویرایش
                        </Link>
                        <Link
                          href={"/dashboard/delete/1"}
                          className="btn btn-outline-danger btn-sm m-1"
                        >
                          حذف
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="d-none d-md-block align-middle">
                        <Image
                          className="img-fluid rounded mx-auto"
                          width={100}
                          height={100}
                          alt="loading"
                          src={"/img/bale.webp"}
                          priority={true}
                          unoptimized={true}
                        />
                      </td>
                      <th className="align-middle" scope="row">
                        بله
                      </th>
                      <td className="align-middle">Mark</td>
                      <td className="align-middle">Otto</td>
                      <td className="align-middle">@mdo</td>
                      <td className="align-middle">
                        <Link
                          href={`/dashboard/edit/1`}
                          className="btn btn-outline-warning btn-sm m-1"
                        >
                          Edit
                        </Link>
                        <Link
                          href={"/dashboard/delete/1"}
                          className="btn btn-outline-danger btn-sm m-1"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="d-none d-md-block align-middle">
                        <Image
                          className="img-fluid rounded mx-auto"
                          width={100}
                          height={100}
                          alt="loading"
                          src={"/img/bale.webp"}
                          priority={true}
                          unoptimized={true}
                        />
                      </td>
                      <th className="align-middle" scope="row">
                        بله
                      </th>
                      <td className="align-middle">Mark</td>
                      <td className="align-middle">Otto</td>
                      <td className="align-middle">@mdo</td>
                      <td className="align-middle">
                        <Link
                          href={`/dashboard/edit/1`}
                          className="btn btn-outline-warning btn-sm m-1"
                        >
                          Edit
                        </Link>
                        <Link
                          href={"/dashboard/delete/1"}
                          className="btn btn-outline-danger btn-sm m-1"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
