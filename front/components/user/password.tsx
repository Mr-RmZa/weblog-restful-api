"use client";
import jwt from "jsonwebtoken";
import Loading from "./loading";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

function Password() {
  const [decoded, setDecoded] = useState("");
  const [password, setPassword] = useState("");
  const [showPage, setShowPage] = useState(false);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    if (Cookies.get("phoneNumberOrEmail")) {
      jwt.verify(
        Cookies.get("phoneNumberOrEmail")!,
        "hV37j4WfWxqz9r2password",
        (err: any, decoded: any) => {
          if (err) {
            redirect("/login");
          } else {
            setDecoded(decoded.phoneNumberOrEmail);
            setShowPage(true);
          }
        }
      );
    } else {
      redirect("/login");
    }
  }, []);

  const router = useRouter();

  const handleInputChange = (event: any) => {
    const { value } = event.target;

    if (/[\u0600-\u06FF\s]+/.test(value)) return;

    if (!value) setValidate(false);

    if (value.length <= 64) {
      setPassword(value);
      setValidate(true);
    }
  };

  const getOtp = async () => {
    try {
      const response = await fetch(
        "http://172.16.58.192:443/api/v1/auth/login/otp/send",
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumberOrEmail: decoded,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.data.otp) {
          const value = jwt.sign(
            { phoneNumberOrEmail: decoded, countdown: data.data.otpTtl },
            "hV37j4WfWxqz9r2otp",
            {
              expiresIn: data.data.otpTtl,
            }
          );
          const expires = data.data.otpTtl / (60 * 60 * 24);
          Cookies.set("phoneNumberOrEmail", value, {
            expires,
          });
          router.replace("/login/otp");
        } else {
          toast.error("خطا");
        }
      } else {
        toast.error("خطا");
      }
    } catch (error) {
      toast.error("خطا");
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://172.16.58.192:443/api/v1/auth/login/pass`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumberOrEmail: decoded,
            password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.data.access_token) {
          toast.success("موفق");
          const value = jwt.sign(
            { access_token: data.data.access_token },
            "hV37j4WfWxqz9r2dashboard",
            {
              expiresIn: "30d",
            }
          );
          const expires = 30;
          Cookies.set("phoneNumberOrEmail", value, {
            expires,
          });
          router.replace("/dashboard");
        }
      } else {
        toast.error("خطا");
      }
    } catch (error) {
      toast.error("خطا");
    }
  };

  return showPage ? (
    <section>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center vh-90">
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
              <h1 className="h3 mb-3 fw-normal">کلمه عبور</h1>
              <p className="text-body-secondary">رمز عبور خود را وارد کنید.</p>
              <div className="form-floating mb-3">
                <input
                  title="رمز عبور خود را وارد کنید."
                  placeholder="رمز عبور خود را وارد کنید."
                  className="form-control text-center"
                  value={password}
                  onChange={handleInputChange}
                  type="search"
                  dir="ltr"
                  autoFocus
                  required
                />
              </div>
              <button
                className={`btn btn-primary w-100 py-2 ${
                  !validate && "disabled"
                }`}
                type={validate ? "submit" : "button"}
              >
                ورود
              </button>
              <hr className="my-3" />
              <button
                className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3 mb-3"
                type="button"
                onClick={getOtp}
              >
                ورود با کد یکبار مصرف
              </button>
              <div className="text-body-secondary mb-3">
                رمز عبور خود را فراموش کرده‌اید؟
              </div>
              <button
                className="btn btn-light w-100 py-2"
                type="button"
                onClick={getOtp}
              >
                بازیابی رمز عبور
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
}

export default Password;
