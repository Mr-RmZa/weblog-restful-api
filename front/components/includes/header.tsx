"use client";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

function Header() {
  const paths = usePathname();
  const [showLogout, setShowLogout] = useState(false);
  const pathNames = paths.split("/").filter((path) => path);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
    if (Cookies.get("phoneNumberOrEmail")) {
      jwt.verify(
        Cookies.get("phoneNumberOrEmail")!,
        "hV37j4WfWxqz9r2dashboard",
        async (err: any, decoded: any) => {
          if (!err) {
            setShowLogout(true);
          }
        }
      );
    }
    const nav = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;
    const changeColor = () => {
      if (paths == "/") {
        if (window.scrollY >= 100) {
          nav!.classList.add("bg-dark");
        } else {
          nav!.classList.remove("bg-dark");
        }
      } else {
        nav!.classList.add("bg-dark");
      }
    };
    changeColor();
    window.addEventListener("scroll", () => {
      changeColor();
      if (lastScrollY < window.scrollY) {
        nav!.classList.add("hidden");
      } else {
        nav!.classList.remove("hidden");
      }
      lastScrollY = window.scrollY;
    });
  }, [pathNames, showLogout]);

  const logout = () => {
    Cookies.remove("phoneNumberOrEmail");
    setShowLogout(false);
    toast.success("موفق");
  };

  return (
    <header data-bs-theme="dark">
      <nav className="navbar navbar-expand-xxl navbar-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href={"/"}>
            نام سایت
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => {
              if (paths == "/") {
                if (window.scrollY <= 100) {
                  document.querySelector("nav")!.classList.add("bg-dark");
                }
              }
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="nav-link">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a className="text-decoration-none" href={"/"}>
                          خانه
                        </a>
                      </li>
                      {pathNames.map((link, index) => {
                        let href = `/${pathNames
                          .slice(0, index + 1)
                          .join("/")}`;
                        let itemClasses =
                          paths === href
                            ? "breadcrumb-item active"
                            : "breadcrumb-item";
                        return (
                          <li className={itemClasses} key={index}>
                            <Link className="text-decoration-none" href={href}>
                              {link}
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                  </nav>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/login"}>
                  ورود یا ثبت نام
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/plan"}>
                  خرید اشتراک
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/contact"}>
                  پشتیبانی
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/blog"}>
                  مقاله ها
                </Link>
              </li>
              {showLogout && (
                <li className="nav-item">
                  <Link className="nav-link" href={""} onClick={logout}>
                    بیرون رفتن
                  </Link>
                </li>
              )}
            </ul>
            <form method="post" className="ms-auto">
              <div className="d-flex flex-column flex-sm-row w-100">
                <div className="form-floating">
                  <input
                    type="search"
                    className="form-control form-control-sm bg-transparent"
                    name="search"
                    placeholder="جستجو"
                    required
                  />
                  <label className="text-muted">جستجو</label>
                </div>
                <button className="btn btn-outline-primary" type="button">
                  جستجو
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
