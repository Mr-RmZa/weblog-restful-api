"use client";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Index() {
  const [validate, setValidate] = useState(false);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [social_media, setSocial_media] = useState("");
  const [decoded, setDecoded] = useState("");
  const router = useRouter();

  const irMessenger = ["eitaa", "igap", "gap", "bale"];

  useEffect(() => {
    if (Cookies.get("phoneNumberOrEmail")) {
      jwt.verify(
        Cookies.get("phoneNumberOrEmail")!,
        "hV37j4WfWxqz9r2dashboard",
        async (err: any, decoded: any) => {
          if (!err) {
            setDecoded(decoded.access_token);
          }
        }
      );
    }
  }, []);

  const handleInputChange = (event: any) => {
    const { value } = event.target;

    if (value) {
      if (value.length <= 64) {
        setName(value);
        setValidate(true);
      } else {
        setValidate(false);
      }
    } else {
      setName(value);
      setValidate(false);
    }
  };

  const handleInputChangeToken = (event: any) => {
    const { value } = event.target;

    if (!value) setValidate(false);
    if (value) {
      if (value.length <= 64) {
        setToken(value);
        setValidate(true);
      } else {
        setValidate(false);
      }
    } else {
      setToken(value);
      setValidate(false);
    }
  };

  const handleSelectChange = (event: any) => {
    setSocial_media(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://172.16.58.192:443/api/v1/channel`, {
        method: "POST",
        cache: "no-store",
        headers: {
          Authorization: `Basic ${decoded}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          token,
          social_media,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success("موفق");
          router.replace("/login/set");
        }
      } else {
        toast.error("خطا");
      }
    } catch (error) {
      toast.error("خطا");
    }
  };
  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center vh-90 text-center">
          <div className="container">
            <div className="row align-items-center rounded-5 shadow-lg py-3 mt-5">
              <div className="col-lg-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  fill="currentColor"
                  className="bi bi-collection-fill text-primary"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1" />
                </svg>
              </div>
              <div className="col-lg-6">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="form-signin">
                    <form
                      className="text-center w-275-px"
                      onSubmit={
                        validate
                          ? handleSubmit
                          : (event) => {
                              event.preventDefault();
                            }
                      }
                    >
                      <h1 className="display-4 fw-bold">کانال</h1>
                      <p className="lead">نام نمایشی کانال خود را وارد کنید</p>
                      <div className="form-floating mb-3">
                        <input
                          title="نام نمایشی کانال خود را وارد کنید."
                          placeholder="نام نمایشی کانال خود را وارد کنید."
                          className="form-control text-center"
                          value={name}
                          onChange={handleInputChange}
                          type="search"
                          dir="ltr"
                          autoFocus
                          required
                        />
                      </div>
                      <select
                        className="form-select form-select-lg mb-3"
                        value={social_media}
                        onChange={handleSelectChange}
                      >
                        <option>مسنجر خود را انتخاب کنید</option>
                        <option value="instagram">اینستاگرام</option>
                        <option value="eitaa">ایتا</option>
                        <option value="linkedin">لینکدین</option>
                        <option value="telegram">تلگرام</option>
                        <option value="igap">آیگپ</option>
                        <option value="bale">بله</option>
                        <option value="twitter">توییتر</option>
                        <option value="youtube">یوتیوب</option>
                        <option value="gap">گپ</option>
                      </select>
                      {irMessenger.includes(social_media) && (
                        <>
                          <p className="lead">توکن کانال مربوطه را وارد کنید</p>
                          <div className="form-floating mb-3">
                            <input
                              title="توکن کانال مربوطه را وارد کنید."
                              placeholder="توکن کانال مربوطه را وارد کنید."
                              className="form-control text-center"
                              value={token}
                              onChange={handleInputChangeToken}
                              type="search"
                              dir="ltr"
                              required
                            />
                          </div>
                        </>
                      )}
                      <button
                        className={`btn btn-primary btn-lg px-4 fw-bold w-100 py-2 ${
                          !validate && "disabled"
                        }`}
                        type={validate ? "submit" : "button"}
                      >
                        ثبت
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
