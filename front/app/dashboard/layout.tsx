"use client";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/user/loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPage, setShowPage] = useState(false);
  useEffect(() => {
    if (Cookies.get("phoneNumberOrEmail")) {
      jwt.verify(
        Cookies.get("phoneNumberOrEmail")!,
        "hV37j4WfWxqz9r2dashboard",
        async (err: any, decoded: any) => {
          if (err) {
            redirect("/login");
          } else {
            setShowPage(true);
          }
        }
      );
    } else {
      redirect("/login");
    }
  }, []);
  return showPage ? children : <Loading />;
}
