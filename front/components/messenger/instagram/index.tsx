import Link from "next/link";
import Image from "next/image";

function Index() {
  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center vh-90 text-center">
          <div className="container">
            <div className="row align-items-center rounded-5 shadow-lg py-3 mt-5">
              <div className="col-lg-6">
                <Image
                  className="img-fluid rounded mx-auto d-block mb-3"
                  width={300}
                  height={300}
                  alt="loading"
                  src={"/img/instagram.webp"}
                  priority={true}
                  unoptimized={true}
                />
              </div>
              <div className="col-lg-6">
                <h1 className="display-4 fw-bold">اینستاگرام</h1>
                <p className="lead">
                  ورود به اکانت اینستاگرام شما حتما فیلترشکن خود را روشن کنید.
                </p>
                <Link
                  type="button"
                  className="btn btn-danger btn-lg px-4 fw-bold"
                  href={"http://172.16.58.192:443/api/v1/instagram/login"}
                >
                  ورود
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
