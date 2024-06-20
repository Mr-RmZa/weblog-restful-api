function About() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">درباره ما</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="alert alert-primary" role="alert">
                      <h3 className="text-center">درباره ما</h3>
                      <p className="text-justify">
                        سایت نام سایت در زمینه سه دسته بندی فعالیت دارد عبارت
                        اند از اخبار فیلم سریال بازی سعی داریم بهترین مقاله ها
                        را برای شما عزیزان آماده کنیم...
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h3 className="text-center">ارتباط با ما</h3>
                    <div className="row mt-5">
                      <div className="col mb-3">
                        <a href="#" className="btn btn-outline-dark">
                          تلگرام
                        </a>
                      </div>
                      <div className="col mb-3">
                        <a href="#" className="btn btn-outline-dark">
                          اینستاگرام
                        </a>
                      </div>
                      <div className="col">
                        <a href="#" className="btn btn-outline-dark">
                          تویتر
                        </a>
                      </div>
                      <div className="col">
                        <a href="#" className="btn btn-outline-dark">
                          واتساپ
                        </a>
                      </div>
                    </div>
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

export default About;
