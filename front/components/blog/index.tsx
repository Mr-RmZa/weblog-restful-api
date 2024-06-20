import Image from "next/image";

function Index() {
  return (
    <section>
      <div className="p-3 p-md-5 m-md-3 text-center">
        <div className="p-lg-5 mx-auto my-5 mb-sm-0">
          <h1 className="display-3 fw-bold">مقالات</h1>
          <h2 className="fw-normal text-muted">
            مدیریت تمامی پیامرسان ها با همه کانال و گروه های شما
          </h2>
        </div>
      </div>

      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          <div className="col">
            <div className="card shadow-lg h-100 rounded-5 border-0">
              <Image
                className="img-fluid rounded mx-auto d-block card-img-top"
                width={500}
                height={500}
                alt="loading"
                src={"/img/bale.webp"}
                priority={true}
                unoptimized={true}
              />
              <div className="card-body">
                <p className="card-text">
                  هذه بطاقة أوسع مع نص داعم أدناه كمقدمة طبيعية لمحتوى إضافي.
                  هذا المحتوى أطول قليلاً.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      عرض
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      تعديل
                    </button>
                  </div>
                  <small className="text-body-secondary">9 دقائق</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-lg h-100 rounded-5 border-0">
              <Image
                className="img-fluid rounded mx-auto d-block card-img-top"
                width={500}
                height={500}
                alt="loading"
                src={"/img/instagram.webp"}
                priority={true}
                unoptimized={true}
              />
              <div className="card-body">
                <p className="card-text">
                  هذه بطاقة أوسع مع نص داعم أدناه كمقدمة طبيعية لمحتوى إضافي.
                  هذا المحتوى أطول قليلاً.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      عرض
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      تعديل
                    </button>
                  </div>
                  <small className="text-body-secondary">9 دقائق</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-lg h-100 rounded-5 border-0">
              <Image
                className="img-fluid rounded mx-auto d-block card-img-top"
                width={500}
                height={500}
                alt="loading"
                src={"/img/eitaa.webp"}
                priority={true}
                unoptimized={true}
              />
              <div className="card-body">
                <p className="card-text">
                  هذه بطاقة أوسع مع نص داعم أدناه كمقدمة طبيعية لمحتوى إضافي.
                  هذا المحتوى أطول قليلاً.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      عرض
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      تعديل
                    </button>
                  </div>
                  <small className="text-body-secondary">9 دقائق</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100 rounded-5 bg-body-tertiary border-0">
              <svg
                className="card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: صورة مصغرة"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  صورة مصغرة
                </text>
              </svg>
              <div className="card-body">
                <p className="card-text">
                  هذه بطاقة أوسع مع نص داعم أدناه كمقدمة طبيعية لمحتوى إضافي.
                  هذا المحتوى أطول قليلاً.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      عرض
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      تعديل
                    </button>
                  </div>
                  <small className="text-body-secondary">9 دقائق</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 rounded-5 bg-body-tertiary border-0">
              <svg
                className="card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: صورة مصغرة"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  صورة مصغرة
                </text>
              </svg>
              <div className="card-body">
                <p className="card-text">
                  هذه بطاقة أوسع مع نص داعم أدناه كمقدمة طبيعية لمحتوى إضافي.
                  هذا المحتوى أطول قليلاً.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      عرض
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      تعديل
                    </button>
                  </div>
                  <small className="text-body-secondary">9 دقائق</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 rounded-5 bg-body-tertiary border-0">
              <svg
                className="card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: صورة مصغرة"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  صورة مصغرة
                </text>
              </svg>
              <div className="card-body">
                <p className="card-text">
                  هذه بطاقة أوسع مع نص داعم أدناه كمقدمة طبيعية لمحتوى إضافي.
                  هذا المحتوى أطول قليلاً.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      عرض
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      تعديل
                    </button>
                  </div>
                  <small className="text-body-secondary">9 دقائق</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100 rounded-5 bg-body-tertiary border-0">
              <svg
                className="card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: صورة مصغرة"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  صورة مصغرة
                </text>
              </svg>
              <div className="card-body">
                <p className="card-text">
                  هذه بطاقة أوسع مع نص داعم أدناه كمقدمة طبيعية لمحتوى إضافي.
                  هذا المحتوى أطول قليلاً.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      عرض
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      تعديل
                    </button>
                  </div>
                  <small className="text-body-secondary">9 دقائق</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 rounded-5 bg-body-tertiary border-0">
              <svg
                className="card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: صورة مصغرة"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  صورة مصغرة
                </text>
              </svg>
              <div className="card-body">
                <p className="card-text">
                  هذه بطاقة أوسع مع نص داعم أدناه كمقدمة طبيعية لمحتوى إضافي.
                  هذا المحتوى أطول قليلاً.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      عرض
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      تعديل
                    </button>
                  </div>
                  <small className="text-body-secondary">9 دقائق</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 rounded-5 bg-body-tertiary border-0">
              <svg
                className="card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: صورة مصغرة"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  صورة مصغرة
                </text>
              </svg>
              <div className="card-body">
                <p className="card-text">
                  هذه بطاقة أوسع مع نص داعم أدناه كمقدمة طبيعية لمحتوى إضافي.
                  هذا المحتوى أطول قليلاً.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      عرض
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      تعديل
                    </button>
                  </div>
                  <small className="text-body-secondary">9 دقائق</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center my-5">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default Index;
