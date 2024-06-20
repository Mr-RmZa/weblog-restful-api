"use client";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import Loading from "./loading";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

function Login() {
  const [showPage, setShowPage] = useState(false);
  const [validate, setValidate] = useState(false);
  const [phoneNumberOrEmail, setPhoneNumberOrEmail] = useState("");

  useEffect(() => {
    if (Cookies.get("phoneNumberOrEmail")) {
      jwt.verify(
        Cookies.get("phoneNumberOrEmail")!,
        "hV37j4WfWxqz9r2dashboard",
        (err: any) => {
          err ? setShowPage(true) : redirect("/dashboard");
        }
      );

      jwt.verify(
        Cookies.get("phoneNumberOrEmail")!,
        "hV37j4WfWxqz9r2password",
        (err: any) => {
          err ? setShowPage(true) : redirect("/login/password");
        }
      );

      jwt.verify(
        Cookies.get("phoneNumberOrEmail")!,
        "hV37j4WfWxqz9r2otp",
        (err: any) => {
          err ? setShowPage(true) : redirect("/login/otp");
        }
      );

      jwt.verify(
        Cookies.get("phoneNumberOrEmail")!,
        "hV37j4WfWxqz9r2set",
        (err: any) => {
          err ? setShowPage(true) : redirect("/login/set");
        }
      );
    } else {
      setShowPage(true);
    }
  }, []);

  const router = useRouter();

  const handleInputChange = (event: any) => {
    const { value } = event.target;

    if (/[!#$%^&*()_+{}|:"<>?~\-=\[\]\\;',\s]/gm.test(value)) return;

    !value && setValidate(false);

    if (!isNaN(value)) {
      if (value.length <= 11) {
        setPhoneNumberOrEmail(value);
        /^(0)?9\d{9}$/gm.test(value) ? setValidate(true) : setValidate(false);
      }
      return;
    } else {
      setPhoneNumberOrEmail(value);
      /^[a-zA-Z0-9._%+-][a-zA-Z0-9._%+-][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm.test(
        value
      )
        ? setValidate(true)
        : setValidate(false);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://172.16.58.192:443/api/v1/auth/login-register",
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumberOrEmail }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        // TODO
        if (data.data.isUser) {
          toast.success("موفق");
          const value = jwt.sign(
            { phoneNumberOrEmail },
            "hV37j4WfWxqz9r2password",
            {
              expiresIn: "1h",
            }
          );
          const expires = new Date(Date.now() + 60000);
          Cookies.set("phoneNumberOrEmail", value, { expires });
          router.replace("/login/password");
        } else {
          toast.success("موفق");
          const value = jwt.sign(
            { phoneNumberOrEmail, countdown: data.data.otpTtl },
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
        }
      } else {
        toast.error("خطا");
      }
    } catch (error: any) {
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
              <h1 className="h3 mb-3 fw-normal">ورود</h1>
              <p className="text-body-secondary">
                شماره تلفن یا ایمیل خود را وارد نمایید.
              </p>
              <div className="form-floating mb-3">
                <input
                  title="شماره تلفن یا ایمیل خود را وارد نمایید."
                  placeholder="شماره تلفن یا ایمیل خود را وارد نمایید."
                  className="form-control text-center"
                  value={phoneNumberOrEmail}
                  onChange={handleInputChange}
                  name="phoneNumberOrEmail"
                  type="search"
                  dir="ltr"
                  autoFocus
                  required
                />
                <div className="text-body-secondary mt-3">
                  example@gmail.com / 09123456789
                </div>
              </div>
              <button
                className={`btn btn-primary w-100 py-2 ${
                  !validate && "disabled"
                }`}
                type={validate ? "submit" : "button"}
              >
                ورود / ثبت نام
              </button>
              <hr className="my-3" />
              <Link
                className="w-100 py-2 mb-2 btn btn-outline-danger rounded-3"
                href={"http://172.16.58.192:443/api/v1/auth/google"}
              >
                ورود با گوگل{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
}

export default Login;
