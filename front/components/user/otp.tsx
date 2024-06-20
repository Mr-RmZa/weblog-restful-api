"use client";
import jwt from "jsonwebtoken";
import Loading from "./loading";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Otp() {
  const [otp, setOtp] = useState("");
  const [decoded, setDecoded] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [showPage, setShowPage] = useState(false);
  const [validate, setValidate] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  useEffect(() => {
    if (Cookies.get("phoneNumberOrEmail")) {
      jwt.verify(
        Cookies.get("phoneNumberOrEmail")!,
        "hV37j4WfWxqz9r2otp",
        async (err: any, decoded: any) => {
          if (err) {
            redirect("/login");
          } else {
            setDecoded(decoded.phoneNumberOrEmail);
            setShowPage(true);
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
                    phoneNumberOrEmail: decoded.phoneNumberOrEmail,
                  }),
                }
              );
              if (response.ok) {
                const data = await response.json();
                setCountdown(data.data.otpTtl);
              } else {
                toast.error("خطا");
              }
            } catch (error) {
              toast.error("خطا");
            }
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

    if (/[!#$%^&*()_+{}|:"<>?~\-=\[\]\\;',\s]/gm.test(value)) return;

    if (!value) setValidate(false);

    if (!isNaN(value)) {
      if (value.length <= 4) {
        setOtp(value);
        /^\d{4}$/gm.test(value) ? setValidate(true) : setValidate(false);
      }
      return;
    }
  };

  const getOtp = async () => {
    if (timerDone) {
      try {
        setTimerDone(false);
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
            setCountdown(data.data.otpTtl);
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
          } else {
            toast.error("خطا");
          }
        } else {
          toast.error("خطا");
        }
      } catch (error) {
        toast.error("خطا");
      }
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://172.16.58.192:443/api/v1/auth/login/otp/verify`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumberOrEmail: decoded,
            otp,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.data.access_token) {
          toast.success("موفق");
          const value = jwt.sign(
            { access_token: data.data.access_token },
            "hV37j4WfWxqz9r2set",
            {
              expiresIn: "30d",
            }
          );
          const expires = 30;
          Cookies.set("phoneNumberOrEmail", value, {
            expires,
          });
          router.replace("/login/set");
        }
      } else {
        toast.error("خطا");
      }
    } catch (error) {
      toast.error("خطا");
    }
  };

  return showPage && countdown ? (
    <section>
      <div className="d-flex justify-content-center align-items-center vh-90">
        <div className="form-signin">
          <div className="container">
            <form
              className="text-center"
              onSubmit={
                validate
                  ? handleSubmit
                  : (event) => {
                      event.preventDefault();
                    }
              }
            >
              <h1 className="h3 mb-3 fw-normal">رمز یکبار مصرف</h1>
              <p className="text-body-secondary">
                کد ارسال شده به شماره یا ایمیل زیر را وارد کنید.
              </p>
              <p className="text-body-secondary text-break">{decoded}</p>
              <button
                className="btn btn-light w-100 py-2 mb-3"
                type="button"
                onClick={() => {
                  Cookies.remove("phoneNumberOrEmail");
                  router.replace("/login");
                }}
              >
                اصلاح شماره یا ایمیل
              </button>
              <div className="form-floating mb-3">
                <input
                  title="کد ارسال شده به شماره یا ایمیل زیر را وارد کنید."
                  placeholder="کد ارسال شده به شماره یا ایمیل زیر را وارد کنید."
                  className="form-control text-center"
                  value={otp}
                  onChange={handleInputChange}
                  type="search"
                  dir="ltr"
                  autoFocus
                  required
                />
              </div>
              <button
                className={`btn btn-primary w-100 py-2 mb-3 ${
                  !validate && "disabled"
                }`}
                type={validate ? "submit" : "button"}
              >
                تایید
              </button>
              <div className="row mb-3">
                <div className="col d-flex justify-content-center align-items-center">
                  <CountdownCircleTimer
                    key={countdown}
                    size={100}
                    isPlaying
                    duration={countdown}
                    onComplete={() => {
                      setTimerDone(true);
                    }}
                    colors={"#0d6efd"}
                  >
                    {({ remainingTime }) => remainingTime}
                  </CountdownCircleTimer>
                </div>
                <div className="col d-flex justify-content-center align-items-center">
                  <button
                    onClick={getOtp}
                    className={`btn btn-outline-primary w-100 py-2
                    ${!timerDone && "disabled"}`}
                    type="button"
                  >
                    ارسال مجدد
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
}

export default Otp;
