"use client";
import jwt from "jsonwebtoken";
import Loading from "./loading";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

function Set() {
  const [decoded, setDecoded] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPage, setShowPage] = useState(false);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    if (Cookies.get("phoneNumberOrEmail")) {
      jwt.verify(
        Cookies.get("phoneNumberOrEmail")!,
        "hV37j4WfWxqz9r2set",
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

    setPassword(value);

    if (value && value.length <= 64 && value === confirmPassword) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  };

  const handleInputChangeConfirm = (event: any) => {
    const { value } = event.target;

    if (/[\u0600-\u06FF\s]+/.test(value)) return;

    if (!value) setValidate(false);

    setConfirmPassword(value);

    if (value && value.length <= 64 && password === value) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://172.16.58.192:443/api/v1/user/reset-password`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            Authorization: `Basic ${decoded}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            confirm_password: confirmPassword,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
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
              <h1 className="h3 mb-3 fw-normal">تنظیم رمز عبور</h1>
              <p className="text-body-secondary">
                رمز عبور و تکرار آن را وارد کنید.
              </p>
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
              <div className="form-floating mb-3">
                <input
                  title="تکرار رمز عبور خود را وارد کنید."
                  placeholder="تکرار رمز عبور خود را وارد کنید.."
                  className="form-control text-center"
                  value={confirmPassword}
                  onChange={handleInputChangeConfirm}
                  type="search"
                  dir="ltr"
                  required
                />
                {/* <div className="text-body-secondary mt-3">
                  همه حروف به جر حروف فارسی قابل تنظیم است.
                </div> */}
              </div>
              <button
                className={`btn btn-primary w-100 py-2 ${
                  !validate && "disabled"
                }`}
                type={validate ? "submit" : "button"}
              >
                ورود
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

export default Set;
